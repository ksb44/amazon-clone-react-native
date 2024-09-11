import { View, Text, Pressable, TextInput } from 'react-native'
import React from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather';
const Header = () => {
  return (
<View className="bg-cyan-400 flex flex-row items-center">
        <Pressable className="flex-1 flex-row items-center px-2 bg-white m-3 rounded-lg">
          <EvilIcons name="search" size={30} color="black" />
          <TextInput placeholder="search Amazon.in" />
        </Pressable>
        <View className="mx-2">
            <Feather name="mic" size={24} color="black" />
        </View>
      </View>
  )
}

export default Header