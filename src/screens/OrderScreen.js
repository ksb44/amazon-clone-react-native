import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const OrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 3000);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-white">

      <Animatable.Text
        animation="bounceIn"
        iterationCount={1}
        style={{ fontSize: 24, fontWeight: 'bold', color: '#008397' }}
      >
        Your Order Has Been Received!
      </Animatable.Text>

    
      <Animatable.Text
        animation="fadeIn"
        delay={500}
        style={{ fontSize: 16, color: '#333', marginTop: 10 }}
      >
        Thank you for shopping with us.
      </Animatable.Text>
    </View>
  );
};

export default OrderScreen;
