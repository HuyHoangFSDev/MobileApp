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
                    <DataTable.Title>Tên Ngành</DataTable.Title>
                    <DataTable.Title>Ngày thành lập</DataTable.Title> 
                    <DataTable.Title>Mô tả</DataTable.Title> 
                    <DataTable.Title>Khoa quản lý</DataTable.Title> 
                </DataTable.Header> 
   
                {major.slice(from, to).map((item) => (
                        <DataTable.Row key={item.majorID}>
                            <DataTable.Cell style={{display: 'block'}}>{item.majorName}</DataTable.Cell>
                            <DataTable.Cell>{item.majorFounding}</DataTable.Cell>
                            <DataTable.Cell>{item.majorDescription}</DataTable.Cell>
                            <DataTable.Cell>{item.facultyName}</DataTable.Cell>
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