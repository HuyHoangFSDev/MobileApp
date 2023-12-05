import { StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { DataTable } from 'react-native-paper'; 

export default function Major(){
    const [major, setMajor] = useState([]);
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        fetch('https://localhost:8001/api/Major')
        .then((response) => response.json())
        .then((data) => setMajor(data.result))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, major.length);

    return (<DataTable> 
                <DataTable.Header> 
                    <DataTable.Title style = {styles.headerCell} >Tên Ngành</DataTable.Title>
                    <DataTable.Title style = {styles.headerCell} >Ngày thành lập</DataTable.Title> 
                    <DataTable.Title style = {styles.headerCell} >Mô tả</DataTable.Title> 
                    <DataTable.Title style = {styles.headerCell} >Khoa quản lý</DataTable.Title> 
                </DataTable.Header> 
   
                {major.slice(from, to).map((item) => (
                        <DataTable.Row key={item.majorID}>
                            <DataTable.Cell style = {styles.cell}>{item.majorName}</DataTable.Cell>
                            <DataTable.Cell style = {styles.cell}>{toDate(item.majorFounding)}</DataTable.Cell>
                            <DataTable.Cell>{item.majorDescription}</DataTable.Cell>
                            <DataTable.Cell style = {styles.cell}>{item.facultyName}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                <DataTable.Pagination
                      page={page}
                      numberOfPages={Math.ceil(major.length / itemsPerPage)}
                      onPageChange={(page) => setPage(page)}
                      label={`${from + 1}-${to} of ${major.length}`}
                      itemsPerPage={itemsPerPage}
                      setItemsPerPage={setItemsPerPage}
                      itemsPerPageOptions={[5, 10, 15]} // Các tùy chọn số mục trên mỗi trang
                      showFastPaginationControls
                      showCompact
                  />  
            </DataTable>);
}

const toDate = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; 
  const day = date.getDate();
  
  return `${day}/${month}/${year}`;
}

const styles = StyleSheet.create({
    table: {
      borderWidth: 1,
      borderColor: '#ddd',
    },
    headerCell: {
      backgroundColor: '#f0f0f0',
      fontWeight: 'bold',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cell: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagination: {
      marginTop: 10,
    },
  });