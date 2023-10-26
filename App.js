import "react-native-gesture-handler";
import { Pressable, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import ContextProvider from "./store";

import ManageExpense from "./screens/ManageExpense";
import RecentExpense from "./screens/RecentExpense";
import AllExpense from "./screens/AllExpense";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/ui/IconButton";
import Authentication from "./screens/Authentication";
import { AuthStore } from "./store/authContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const IconDrawer = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.openDrawer();
      }}
      style={{ marginLeft: 24 }}
    >
      <Text>
        <Ionicons name="list" color={"white"} size={24} />;
      </Text>
    </Pressable>
  );
};

function ExpenseOverview() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerLeft: (props) => <IconDrawer {...props} />,
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate("ManageExpense");
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="RecentExpense"
        component={RecentExpense}
        options={{
          title: "Recent Expense",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="hourglass" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="AllExpense"
        component={AllExpense}
        options={{
          title: "All Expense",
          tabBarLabel: "All Expense",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="calendar" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

function CustomerDrawerContent(props) {
  const navigation = useNavigation();
  const { logout } = AuthStore();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={"Logout"}
        onPress={() => {
          logout();
          navigation.navigate("Authentication");
        }}
        labelStyle={{ color: GlobalStyles.colors.error500 }}
        icon={({ focused, color, size }) => (
          <Ionicons
            color={GlobalStyles.colors.error500}
            size={24}
            name={!focused && "exit"}
          />
        )}
      />
    </DrawerContentScrollView>
  );
}

function DrawNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "#fff",
        sceneContainerStyle: { backgroundColor: "#3f2f25" },
        drawerContentStyle: { backgroundColor: "#351401" },
        drawerInactiveTintColor: "#fff",
        drawerActiveTintColor: "#351401",
        drawerActiveBackgroundColor: "#e4baa1",
        drawerItemStyle: {
          fontSize: 80,
          color: "red",
        },
      }}
      drawerContent={(props) => <CustomerDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="ExpenseOverview"
        component={ExpenseOverview}
        options={{
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function AuthenticationApp() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Authentication"
        component={Authentication}
        options={
          {
            // headerShown: false,
          }
        }
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthenticated } = AuthStore();

  return <>{!isAuthenticated ? <AuthenticationApp /> : <DrawNavigation />}</>;
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <ContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
              },
              headerTintColor: "#fff",
            }}
          >
            <Stack.Screen
              name="Navigation"
              component={Navigation}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="DrawNavigation"
              component={DrawNavigation}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                // title: "Manage Expense",
                presentation: "modal", //2 task add and edit
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ContextProvider>
    </>
  );
}
