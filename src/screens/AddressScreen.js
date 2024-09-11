import { View, Text,TextInput,Pressable, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import   {jwtDecode}  from 'jwt-decode';
import { UserType } from '../context/UserContext';
import { useNavigation } from '@react-navigation/native';

const AddressScreen = () => {
    const [name, setName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [houseNo, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [landmark, setLandmark] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const {userId,setUserId} = useContext(UserType)
    const navigation =useNavigation()
    
    useEffect(()=>{
        const fetchUser =async()=>{
            const token = await AsyncStorage.getItem('token');
            const decoded = jwtDecode(token)
            const userId = decoded.id
            setUserId(userId)
        }
        fetchUser()
    },[])
  
    const handleAddAddress = async() => {
        const address = {
            name,
            mobileNo,
            houseNo,
            street,
            city,
            landmark,
            postalCode
        }
        try {
            const response = await fetch("https://amazon-clone-app-backend.onrender.com/api/address/addresses", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                userId,
                address
              })
            });
        
            if (!response.ok) {
              throw new Error("Failed to add address");
            }
        
            const data = await response.json();
          
            Alert.alert("Success", data.message);
        

            setName("");
            setMobileNo("");
            setHouseNo("");
            setStreet("");
            setLandmark("");
            setPostalCode("");
        
            setTimeout(() => {
              navigation.goBack();
            }, 500);
          } catch (error) {
            Alert.alert("Error", error);
            console.log("error", error);
          }

    }
    const isFormComplete = () => {
        return (
          name.trim() !== '' &&
          mobileNo.trim() !== '' &&
          city.trim()!=='' &&
          houseNo.trim() !== '' &&
          street.trim() !== '' &&
          landmark.trim() !== '' &&
          postalCode.trim() !== ''
        );
      };
  return (
    <ScrollView>
        <Header/>
      <View>
        <Text className="font-bold text-black mx-2 px-2 mt-4">Add a new Address</Text>
      </View>
      <View className="m-4">
      <TextInput
         
          placeholder="India"
          className="border-2 border-gray-300 p-2 rounded-2xl"
      
        />

        <View className="" style={{ marginVertical: 10 }}>
          <Text className="m-2 text-black font-bold" >
            Full name (First and last name)
          </Text>

          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
        
          className="border-2 border-gray-300 p-2 rounded-2xl"
            placeholder="enter your name"
          />
        </View>

        <View>
          <Text className="m-2 text-black font-bold" >
            Mobile numebr
          </Text>

          <TextInput
            value={mobileNo}
            onChangeText={(text) => setMobileNo(text)}
            
          className="border-2 border-gray-300 p-2 rounded-2xl"
            placeholder="Mobile No"
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text className="m-2 text-black font-bold" style={{ fontSize: 15, fontWeight: "bold" }}>
            City
          </Text>

          <TextInput
            value={city}
            onChangeText={(text) => setCity(text)}
            
         className="border-2 border-gray-300 p-2 rounded-2xl"
            placeholder="city"
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text className="m-2 text-black font-bold" style={{ fontSize: 15, fontWeight: "bold" }}>
            Flat,House No,Building,Company
          </Text>

          <TextInput
            value={houseNo}
            onChangeText={(text) => setHouseNo(text)}
            
         className="border-2 border-gray-300 p-2 rounded-2xl"
            placeholder=""
          />
        </View>

        <View>
          <Text className="m-2 text-black font-bold" style={{ fontSize: 15, fontWeight: "bold" }}>
            Area,Street,sector,village
          </Text>
          <TextInput
            value={street}
            onChangeText={(text) => setStreet(text)}
            
         className="border-2 border-gray-300 p-2 rounded-2xl"
            placeholder=""
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text className="m-2 text-black font-bold" style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            
           className="border-2 border-gray-300 p-2 rounded-2xl"
            placeholder="Eg near appollo hospital"
          />
        </View>

        <View>
          <Text className="m-2 text-black font-bold" style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>

          <TextInput
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            
          className="border-2 text-black font-bold border-gray-300 p-2 rounded-2xl"
            placeholder="Enter Pincode"
          />
        </View>

        <Pressable
          onPress={handleAddAddress}
          className={`items-center mt-4 ${
            isFormComplete() ? 'bg-yellow-500' : 'bg-gray-300'
          } mx-14 rounded-2xl py-2`}
          disabled={!isFormComplete()} 
        >
          <Text className="font-bold text-black">Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default AddressScreen