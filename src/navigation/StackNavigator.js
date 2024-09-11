import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import Zocial from 'react-native-vector-icons/Zocial';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import AddAddressScreen from '../screens/AddAddressScreen';
import AddressScreen from '../screens/AddressScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';
import OrderScreen from '../screens/OrderScreen';

function StackNavigator() {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator()

    function BottomTabs(){
      return (
        <Tab.Navigator>
      <Tab.Screen
  name="Home"
  component={HomeScreen}
  options={{
    tabBarLabel: 'Home',
    tabBarLabelStyle: { color: 'black' },
    headerShown: false,
    tabBarIcon: ({ focused }) => (
      focused ? (
        <Entypo name="home" size={24} color="black" />

      ) : (
        <Entypo name="home" size={24} color="gray" />

      )
    ),
  }}
/>
<Tab.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    tabBarLabel: 'Profile',
    tabBarLabelStyle: { color: 'black' },
    headerShown: false,
    tabBarIcon: ({ focused }) => (
      focused ? (
        <Zocial name="guest" size={24} color="black" />
      ) : (
        <Zocial name="guest" size={24} color="gray" />
      )
    ),
  }}
/>
<Tab.Screen
  name="Cart"
  component={CartScreen}
  options={{
    tabBarLabel: 'Cart',
    tabBarLabelStyle: { color: 'black' },
    headerShown: false,
    tabBarIcon: ({ focused }) => (
      focused ? (
        <AntDesign name="shoppingcart" size={24} color="black" />
      ) : (
        <AntDesign name="shoppingcart" size={24} color="gray" />
      )
    ),
  }}
/>

        </Tab.Navigator>
      )
    }
    return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
          <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown:false}}/>
          <Stack.Screen name='Main' component={BottomTabs} options={{headerShown:false}}/>
          <Stack.Screen name='ProductInfo' component={ProductInfoScreen} options={{headerShown:false}}/>
          <Stack.Screen name='AddAddress' component={AddAddressScreen} options={{headerShown:false}}/>
          <Stack.Screen name='Add' component={AddressScreen} options={{headerShown:false}}/>
          <Stack.Screen name='Confirm' component={ConfirmationScreen} options={{headerShown:false}}/>
          <Stack.Screen name='Order' component={OrderScreen} options={{headerShown:false}}/>

        </Stack.Navigator>
      </NavigationContainer>
    )
}
export default StackNavigator;