import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Dashboard } from "../screens/Dashboard";
import { Notifications } from "../screens/Notifications";
import { Osc } from "../screens/Osc";
import { Perfil } from "../screens/Perfil";
import { PerfilOsc } from "../screens/PerfilOsc";
import { Governancas } from "../screens/Governancas";
import { Map } from "../screens/Map";
import { GovernancaForme } from "../screens/GovernancaForme";
import { GovernancaFormeEdit } from "../screens/GovernancaFormeEdit";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tab.Screen name="Home" component={Dashboard} />
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="Perfil" component={Perfil} />
        <Tab.Screen name="Osc" component={Osc} />
        <Tab.Screen name="PerfilOsc" component={PerfilOsc} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Governancas" component={Governancas} />
        <Tab.Screen name="GovernancaForme" component={GovernancaForme} />
        <Tab.Screen name="GovernancaFormeEdit" component={GovernancaFormeEdit} />
      </Tab.Navigator>
  );
};
