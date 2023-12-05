import "react-native-gesture-handler";
import { View, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "./src/screens/Home";
import Main from "./src/screens/Faculty";
import Major from "./src/screens/Major";
import Cohort from "./src/screens/Cohort";
import List from "./src/screens/List";
import BlockCourse from "./src/screens/TrainingProgram";
import AppProvider from "./src/context/AppProvider";
import MajorInFaculty from "./src/screens/MajorInFaculty";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        {/* Drawer */}
        <Drawer.Navigator
          drawerContent={(props) => {
            return (
              <SafeAreaView>
                <View style={styles.container}>
                  <Image
                    source={{
                      uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Logo_DAI_NAM.png/992px-Logo_DAI_NAM.png",
                    }}
                    style={styles.image}
                  />
                </View>
                <DrawerItemList {...props} />
              </SafeAreaView>
            );
          }}
          screenOptions={styles.screen}
        >
          <Drawer.Screen
            name="Home"
            options={{
              drawerLabel: "Trang chủ",
              title: "Trang chủ",
            }}
            component={Home}
          />
          <Drawer.Screen
            name="Main"
            options={{
              drawerLabel: "Danh sách Khoa",
              title: "Danh sách Khoa",
            }}
            component={Main}
          />
          <Drawer.Screen
            name="Major"
            options={{
              drawerLabel: "Danh sách ngành",
              title: "Danh sách ngành",
            }}
            component={Major}
          />
          <Drawer.Screen
            name="Cohort"
            options={{
              drawerLabel: "Danh sách khóa",
              title: "Danh sách khóa",
            }}
            component={Cohort}
          />
          <Drawer.Screen
            name="CohortMJ"
            options={{
              drawerLabel: "Danh sách CTĐT",
              title: "Danh sách CTĐT",
            }}
            component={List}
          />
          <Drawer.Screen
            name="BlockCourse"
            options={{
              drawerLabel: "",
              drawerItemStyle: {height : 0},
              title: "Chương trình đào tạo",
            }}

            component={BlockCourse}
          />
          <Drawer.Screen
            name="MajorInFaculty"
            options={{
              drawerLabel: "",
              title: "Các Ngành của khoa",
            }}
            component={MajorInFaculty}
          />
         
        </Drawer.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  
  image: {
    height: 120,
    width: 132,
    objectFit: "cover",
  },
  screen: {
    drawerStyle: {
      backgroundColor: "#fff",
      width: 250,
      height: "100%",
      position: "fixed",
      top: 0,
      left: 0,
    },
    headerStyle: {
      backgroundColor: "darkorange",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
    drawerActiveTintColor: "blue",
    drawerLabelStyle: {
      color: "#111",
    },
  },
});
