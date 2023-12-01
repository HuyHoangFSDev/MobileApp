import { StyleSheet, Button } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import { AppContext } from "../Context/AppProvider";

export default function List({ navigation }) {
  const [cohortMajors, setCohortMajors] = useState([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { setDataBc} = useContext(AppContext)
  useEffect(() => {
    fetch("https://localhost:8001/api/CohortMajors")
      .then((response) => response.json())
      .then((data) => setCohortMajors(data.result))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, cohortMajors.length);

  return (
    
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={styles.headerCell}>Tên Ngành</DataTable.Title>
        <DataTable.Title style={styles.headerCell}>Khóa</DataTable.Title>
        <DataTable.Title style={styles.headerCell}>Xem CTĐT</DataTable.Title>
      </DataTable.Header>

      {cohortMajors.slice(from, to).map((item, index) => (
        <DataTable.Row key={index}>
          <DataTable.Cell style={styles.cell}>{item.majorName}</DataTable.Cell>
          <DataTable.Cell style={styles.cell}>{item.cohortName}</DataTable.Cell>
          <DataTable.Title style={styles.cell}>
            <Button
              title="Xem"
              onPress={() => {
                // setData({majorId: item.majorId, cohortId: item.cohortId})
                setDataBc({majorId: item.majorId, cohortId: item.cohortId})
                // console.log(data)
                navigation.navigate("BlockCourse")
              }
            }
            />
          </DataTable.Title>
        </DataTable.Row>
      ))}
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(cohortMajors.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${cohortMajors.length}`}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        itemsPerPageOptions={[5, 10, 15]}
        showFastPaginationControls
        showCompact
        style={styles.pagination}
      />
    </DataTable>
  );
}

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
  },
  headerCell: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  cell: {
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    marginTop: 10,
  },
});
