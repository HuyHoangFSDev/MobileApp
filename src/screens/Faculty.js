import { StyleSheet } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { DataTable } from 'react-native-paper'; 
import { AppContext } from '../context/AppProvider';



export default function Main({navigation}) {
    const [faculty, setFaculty] = useState([]);
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const {setFacultyData} = useContext(AppContext)
    useEffect(() => {
        fetch('https://localhost:8001/api/Faculties')
        .then((response) => response.json())
        .then((data) => setFaculty(data.result))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
    
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, faculty.length);
    
    return (<DataTable> 
                <DataTable.Header> 
                    <DataTable.Title style = {styles.headerCell}>Mã Khoa</DataTable.Title>
                    <DataTable.Title style = {styles.headerCell}>Tên khoa</DataTable.Title>
                    <DataTable.Title style = {styles.headerCell}>Mô tả</DataTable.Title> 
                    <DataTable.Title style = {styles.headerCell}>Số lượng ngành</DataTable.Title> 
                </DataTable.Header> 
   
                {faculty.slice(from, to).map((item, index) => (
                        <DataTable.Row key={index}>
                            <DataTable.Cell style = {styles.cell}>{item.facultyId}</DataTable.Cell>
                            <DataTable.Cell>{item.facultyName}</DataTable.Cell>
                            <DataTable.Cell>{item.facultyDescription}</DataTable.Cell>
                            <DataTable.Cell style = {styles.cell}
                              onPress={() =>{
                                navigation.navigate(
                                  "MajorInFaculty"
                                )
                              }}
                            >{item.majorCount}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                <DataTable.Pagination
                      page={page}
                      numberOfPages={Math.ceil(faculty.length / itemsPerPage)}
                      onPageChange={(page) => setPage(page)}
                      label={`${from + 1}-${to} of ${faculty.length}`}
                      itemsPerPage={itemsPerPage}
                      setItemsPerPage={setItemsPerPage}
                      itemsPerPageOptions={[5, 10, 15]} 
                      showFastPaginationControls
                      showCompact
                      style = {styles.pagination}
                  />    
            </DataTable>
            );
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