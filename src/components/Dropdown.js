import React, { useState } from 'react';
import { View, Text, Pressable, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CustomDropdown = ({ items, value, setValue, placeholder }) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);

  const handleItemPress = (selectedValue) => {
    setValue(selectedValue);
    setOpen(false);
  };

  return (
    <View className="w-full relative">
    
      <Pressable 
        className="border border-gray-300 rounded-lg p-3 flex-row justify-between items-center bg-white" 
        onPress={toggleDropdown}
      >
        <Text className="text-black">{value ? value : placeholder}</Text>
        <MaterialIcons 
          name={open ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
          size={24} 
          color="black" 
        />
      </Pressable>

  
      {open && (
        <View className=" bg-white border border-gray-300 rounded-lg z-50">
          <FlatList
            data={items}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Pressable 
                className="p-3 hover:bg-gray-100"
                onPress={() => handleItemPress(item.value)}
              >
                <Text className="text-black">{item.label}</Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default CustomDropdown;
