import { SafeAreaView, StyleSheet, Text, Image, View, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [credential, setCredential] = useState({
    email: '',
    password: ''
  });

  const handleChange = (field, value) => {
    setCredential({ ...credential, [field]: value });
  };

  useEffect(()=>{

    const checkLoginStatus = async()=>{
      try {
        const token = AsyncStorage.getItem('token')
        if(token){
          navigation.navigate('Main')
          }
          
      } catch (error) {
        console.log(error)
        Alert.alert(error)
      }
    }
    checkLoginStatus()
  },[])
  const handleLogin = async () => {
    try {
      const res = await fetch('https://amazon-clone-app-backend.onrender.com/api/user/login', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credential),
      });
  
      if (!res.ok) {
        
        const errorData = await res.json();
        Alert.alert('Login Failed', errorData.message || 'Something went wrong');
        return;
      }
  
      const data = await res.json();
  
      if (data.success) {
        Alert.alert('Login', `You successfully logged In`);
        AsyncStorage.setItem('token',data.message)
        navigation.navigate('Main');
      } else {
        Alert.alert('Login Failed', data.message || 'Something went wrong');
        
      }
    } catch (error) {
      Alert.alert('Error', `Unable to register. Error: ${error.message}`);
    }
    finally {
      setCredential({
     
        email: '',
        password: '',
      });
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={{
            uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flofrev.net%2Fwp-content%2Fphotos%2F2016%2F05%2FAmazon-logo.png&f=1&nofb=1&ipt=5047f9a97f1ff79cebc6c50780994d81a570f5b0a828fbe3608dd0581bff3d18&ipo=images',
          }}
        />
      </View>

      <KeyboardAvoidingView className="mt-20">
        <View>
          <Text className="text-lg font-bold text-black my-4 text-center">Login to your Account</Text>
        </View>

        <View className="w-screen px-4">
          <TextInput
            className="border-2 border-gray-500 rounded-xl px-4 bg-gray-300 my-4"
            placeholder="Enter your email"
            value={credential.email}
            onChangeText={(text) => handleChange('email', text)} 
          />
          <TextInput
            className="border-2 border-gray-500 rounded-xl px-4 bg-gray-300"
            placeholder="Enter your password"
            value={credential.password}
            secureTextEntry={true}
            onChangeText={(text) => handleChange('password', text)}  
          />
        </View>

        <View className="flex flex-row mx-4 mt-4 justify-between">
          <Text className="text-black">Keep me logged in</Text>
          <Text className="text-blue-600">Forgot Password</Text>
        </View>

        <Pressable className="w-1/2 m-auto mt-20  " onPress={handleLogin} >
          <Text className="bg-yellow-400  text-white p-3 px-10 rounded-xl text-center font-bold">Login</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text className="text-black text-center mt-4">Don't have an account? Sign Up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
