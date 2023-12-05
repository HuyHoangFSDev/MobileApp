import "react-native-gesture-handler"
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Animated, {  FadeInUp } from 'react-native-reanimated';



export default function Home(){
    return (
    <View>
        <Animated.Text style={styles.mainText}>
                 PHẦN MỀM CHƯƠNG TRÌNH ĐÀO TẠO{'\n'}
        <Text style={styles.secondaryText}>TRƯỜNG ĐẠI HỌC ĐẠI NAM</Text>
        </Animated.Text>
        <  Animated.Image
            entering={FadeInUp.delay(200).duration(1000).springify()}
            source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Logo_DAI_NAM.png/992px-Logo_DAI_NAM.png'
            }}
            style={styles.image}
            resizeMode='contain'
        />
    </View>
    )
}

const styles = StyleSheet.create({
    mainText: {
        paddingTop: 50,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "bold",
        color: 'orange', 
      },
      secondaryText: {
        color: 'navy', 
      },
    image: {
        alignSelf: 'center',
                height: 250,
                width: 250,
                marginTop: 100,
    }
})