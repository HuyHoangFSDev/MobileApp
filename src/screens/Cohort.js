import React, {useEffect, useState} from 'react'
import { DataTable } from 'react-native-paper'; 
import { StyleSheet } from 'react-native'

export default function Cohort(){
    const [cohort, setCohort] = useState([]);
    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        fetch('https://localhost:8001/api/Cohort')
        .then((response) => response.json())
        .then((data) => setCohort(data.result))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, cohort.length);

    return (<DataTable style = {styles.table}> 
                <DataTable.Header> 
                    <DataTable.Title style = {styles.headerCell}>Mã khóa</DataTable.Title>
                    <DataTable.Title style = {styles.headerCell}>Tên khóa</DataTable.Title> 
                </DataTable.Header> 
                {cohort.slice(from, to).map((item) => (
                        <DataTable.Row key={item.cohortId}>
                            <DataTable.Cell style={styles.cell}>{item.cohortName}</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{item.cohortDescription}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                <DataTable.Pagination
                      page={page}
                      numberOfPages={Math.ceil(cohort.length / itemsPerPage)}
                      onPageChange={(page) => setPage(page)}
                      label={`${from + 1}-${to} of ${cohort.length}`}
                      itemsPerPage={itemsPerPage}
                      setItemsPerPage={setItemsPerPage}
                      itemsPerPageOptions={[5, 10, 15]} 
                      showFastPaginationControls
                      showCompact
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