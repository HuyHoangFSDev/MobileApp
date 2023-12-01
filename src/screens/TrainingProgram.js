import React, {useContext, useEffect, useState} from 'react'
import { DataTable } from 'react-native-paper'; 
import { StyleSheet, Text, View } from 'react-native'
import { AppContext } from '../Context/AppProvider';

export default function BlockCourse(){
    const {dataBc} = useContext(AppContext);
    console.log(dataBc.majorId);
    console.log(dataBc.cohortId);
    const [blockOfKnowledgeCourses, setBlockOfKnowledgeCourses] = useState({});
    const [majorCh, setMajorCh] = useState({})

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch(`https://localhost:8001/api/BlockOfKnowledgeCourses/ChiTietChuongtrinhDaoTao/${dataBc.majorId}/${dataBc.cohortId}`);
              
              if (!response.ok) {
                  throw new Error('Network response was not ok.');
              }
  
              const data = await response.json();
              setBlockOfKnowledgeCourses(data.result);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
  
      fetchData();
  }, [dataBc.majorId, dataBc.cohortId]);
  

    console.log(blockOfKnowledgeCourses.courses);
    return (
      
        <View>
            {blockOfKnowledgeCourses.cohortMajor ? 
              <View>
                  <Text style={{fontSize: 30}}>Chuong Trinh Dao Tao Nganh {blockOfKnowledgeCourses.cohortMajor.majorName} Khoa {blockOfKnowledgeCourses.cohortMajor.cohortName} </Text>
                  {blockOfKnowledgeCourses.courses.map(function(item, index){
                    return(
                      <View key={index}>
                      <Text style={{fontSize: 20}}>
                        {item.blockOfKnowledgeName.blockOfKnowledgeName}
                      </Text>
                      <View>
                          {item.courses.map(function(itemtwo) {
                            return(
                              <Text style={{fontSize: 15}} key={itemtwo.courseId}>
                                {itemtwo.courseName}
                            </Text>
                            )
                          })}
                        </View>
                      </View>
                    )
                  })}
              </View>

              
            : 
             <Text>Loading...</Text>}
           
          
        </View>
      );
}           

