import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { AppContext } from "../context/AppProvider";

export default function BlockCourse({ navigation }) {
  const { dataBc } = useContext(AppContext);
  const [blockOfKnowledgeCourses, setBlockOfKnowledgeCourses] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://localhost:8001/api/BlockOfKnowledgeCourses/ChiTietChuongtrinhDaoTao/${dataBc.majorId}/${dataBc.cohortId}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const data = await response.json();
        setBlockOfKnowledgeCourses(data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dataBc.majorId, dataBc.cohortId]);
  return (
    <View style={styles.container}>
      {blockOfKnowledgeCourses.cohortMajor ? (
        <View>
          <Text style={styles.heading}>
            Chương trình đào tạo ngành{" "}
            {blockOfKnowledgeCourses.cohortMajor.majorName} Khóa{" "}
            {blockOfKnowledgeCourses.cohortMajor.cohortName}{" "}
          </Text>
          <View style={styles.content}>
            {blockOfKnowledgeCourses.courses.map(function (item, index) {
              return (
                <View key={index}>
                  <Text style={styles.blockOfKnowledge}>
                    {item.blockOfKnowledgeName.blockOfKnowledgeName}
                  </Text>
                  <View>
                    <View style={styles.text}>
                      <Text style={styles.course}>Mã khóa học</Text>
                      <Text style={styles.course}>Tên khóa học</Text>
                    </View>
                    {item.courses.map(function (itemtwo) {
                      return (
                        <View key={itemtwo.courseId} style={styles.text}>
                          <Text style={styles.course}>
                            {itemtwo.courseCode}
                          </Text>
                          <Text style={styles.course}>
                            {itemtwo.courseName}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
          <Button
              title="Quay lại"
              onPress={() => {
                navigation.navigate("CohortMJ")
              }
            }
            style = {{marginTop: 20,}}
            />
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eff0f3",
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#0d0d0d",
    marginTop: 10,
  },
  blockOfKnowledge: {
    fontSize: 15,
    fontWeight: "bold",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ff8e3c",
    width: "100%",
    marginTop: 15,
    padding: 5,
    display: "flex",
    alignItems: "center",
  },
  course: {
    fontSize: 12,
    textAlign: "left",
    marginTop: 10,
    marginLeft: 20,
    flex: 0.5,
  },
  content: {
    width: "100%",
    padding: 5,
  },
  text: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
  },
});
