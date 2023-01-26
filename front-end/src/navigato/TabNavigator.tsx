import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dashboard } from "../screens/Dashboard";
import { Perfil } from "../screens/Perfil";
import { Notifications } from "../screens/Notifications";
import { Osc } from "../screens/Osc";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      <Tab.Screen  name="Home" component={Dashboard} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Perfil" component={Perfil} />
      <Tab.Screen name="Osc" component={Osc} />
    </Tab.Navigator>
  );
};
