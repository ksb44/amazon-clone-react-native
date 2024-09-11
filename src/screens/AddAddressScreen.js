import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { UserType } from '../context/UserContext'
import Entypo from 'react-native-vector-icons/Entypo'
const AddAddressScreen = () => {
    const {userId,setUserId} = useContext(UserType)
    const [addresses,setAddresses] =useState([])
    const navigation =useNavigation()
    const fetchAddresses=async()=>{

        try {
            const response = await fetch(`https://amazon-clone-app-backend.onrender.com/api/address/addresses/${userId}`, {
                method: "GET"
              });
              const data = await response.json();
             
              setAddresses(data.addresses)
        } catch (error) {
            console.log('error',error)
        }
    }
    useEffect(()=>{

        fetchAddresses()
    },[])
  useFocusEffect(
   

    useCallback(()=>{
        fetchAddresses()
    },[])
  )
  return (
  <ScrollView
  className=""
  showsVerticalScrollIndicator={false}> 
    <Header/>

    <View className="m-2">
        <Text className="font-bold text-black text-lg border-b-2 border-gray-300 pb-2  ">Your Addresses</Text>
        <Pressable className="flex flex-row border-b-2 items-center justify-between border-gray-300" onPress={()=>navigation.navigate('Add')}>
            <Text className="text-black mt-2  pb-2">Add New Address</Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="black"/>
        </Pressable>

        <Pressable>
            {addresses.map((item,index)=>(
                <Pressable key={index}>
                    <View className="border-2 border-gray-400 m-4 p-4" >
                        <View className="flex flex-row">
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {item?.name}
                </Text>
                <Entypo name="location-pin" size={24} color="red" />
                </View>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.houseNo}, {item?.landmark}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {item?.street}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                India, Bangalore
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                phone No : {item?.mobileNo}
              </Text>
              <Text style={{ fontSize: 15, color: "#181818" }}>
                pin code : {item?.postalCode}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 7,
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Edit</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Remove</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Set as Default</Text>
                </Pressable>
              </View>
              </View>
              
                </Pressable>
            ))}
        </Pressable>
    </View>

  </ScrollView>
  )
}

export default AddAddressScreen