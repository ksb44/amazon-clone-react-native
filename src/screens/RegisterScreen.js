import { Image, KeyboardAvoidingView, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Alert } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleRegister = async () => {
    try {
      const res = await fetch('https://amazon-clone-app-backend.onrender.com/api/user/register', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!res.ok) {
        
        const errorData = await res.json();
        Alert.alert('Registration Failed', errorData.message || 'Something went wrong');
        return;
      }
  
      const data = await res.json();
  
      if (data.success) {
        Alert.alert('Success', 'Registration successful!');
        setCredentials({
          name: '',
          email: '',
          password: '',
        });
      } else {
        Alert.alert('Registration Failed', data.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', `Unable to register. Error: ${error.message}`);
    }
  };
  
  
  const handleChange = (field, value) => {
    setCredentials({ ...credentials, [field]: value });
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
          <Text className="text-lg font-bold text-black my-4 text-center">Register to your Account</Text>
        </View>

        <View className="w-screen px-4 my-6">
          <TextInput
            className="border-2 border-gray-500 rounded-xl px-4 bg-gray-300 "
            placeholder="Enter your name"
            value={credentials.name}
            onChangeText={(text) => handleChange('name', text)}  
          />
          <TextInput
            className="border-2 border-gray-500 rounded-xl px-4 bg-gray-300 my-4"
            placeholder="Enter your mail"
            value={credentials.email}
            onChangeText={(text) => handleChange('email', text)}  
          />
          <TextInput
            secureTextEntry={true}
            className="border-2 border-gray-500 rounded-xl px-4 bg-gray-300"
            placeholder="Enter your password"
            value={credentials.password}
            onChangeText={(text) => handleChange('password', text)}  
          />
        </View>

        <View className="flex flex-row mx-4 mt-4 justify-between">
          <Text className="text-black mx-2">Keep me logged in</Text>
         
        </View>

        <Pressable className="w-1/2 m-auto mt-20  " onPress={handleRegister} >
          <Text className="bg-yellow-400  text-white p-3 px-10 rounded-xl text-center font-bold">Register</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text className="text-black text-center mt-4">Already have an account? Sign In</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
