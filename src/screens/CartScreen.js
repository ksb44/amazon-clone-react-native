import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrementQuantity,
  incementQuantity,
  removeFromCart,
} from '../slices/CartSlice';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';

const CartScreen = () => {
  const cart = useSelector(state => state.cart.cart);

  const total = cart
    ?.map(item => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const dispatch = useDispatch();
  const increaseQuantity = item => {
    dispatch(incementQuantity(item));
  };
  const decreaseQuantity = item => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = item => {
    dispatch(removeFromCart(item));
  };
  const navigation = useNavigation();
  return (
    <>
      <Header />
      <ScrollView className="bg-white p-2">
        <View className="flex flex-row">
          <Text className="text-black">Subtotal : </Text>
          <Text className="font-bold text-black">
            {total.length == 0 ? 'Empty' : total}
          </Text>
        </View>
        <Text className="mt-4 text-sm text-black">EMI details Available</Text>


        {
            cart.length!=0 ? ( <Pressable
                className="border-b-2 border-gray-400 "
                onPress={() => navigation.navigate('Confirm')}>
                  
                <Text className="mt-4 rounded-2xl bg-yellow-400 text-black text-sm p-2 my-4 text-center">
                  Proceed to Buy ({cart.length}) items
                </Text>
              </Pressable>)
              : (
                <Pressable
                className="border-b-2 border-gray-400 "
                >
                  
                <Text className="mt-4 rounded-2xl bg-gray-300 text-black text-sm p-2 my-4 text-center">
                  Proceed to Buy ({cart.length}) items
                </Text>
              </Pressable>
              )
        }
       

        <View className=" py-4  ">
          {cart?.map((item, index) => (
            <View key={index} className=" mt-4 border-b-2 pb-3 border-gray-400">
              <Pressable className="flex flex-row justify-between">
                <View>
                  <Image 
                    style={{width: 140, height: 140, resizeMode: 'contain'}}
                    source={{uri: item?.image}}
                  />
                </View>

                <View className="">
                  <Text className="text-black" style={{width:150}} numberOfLines={3}>{item?.title}</Text>
                  <Text className="text-black font-bold">{item?.price}</Text>
                  <Image
                    style={{width: 30, height: 30, resizeMode: 'contain'}}
                    source={{
                      uri: 'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png',
                    }}
                  />
                  <Text className="text-green-700">In Stock</Text>
                </View>
              </Pressable>

              <Pressable className="mt-2 flex flex-row">
                <View className="flex flex-row mt-4 items-center ml-5 space-x-4  ">
                  {item?.quantity > 1 ? (
                    <Pressable
                    className="bg-gray-200 p-1 rounded-md "
                    onPress={() => decreaseQuantity(item)}>
                      <AntDesign name="minus" size={24} color="black" />
                    </Pressable>
                  ) : (
                    <Pressable 
                    className= "bg-gray-200 p-1 rounded-md"
                    onPress={() => deleteItem(item)}>
                      <AntDesign name="delete" size={24} color="black" />
                    </Pressable>
                  )}

                  <Pressable>
                    <Text className="text-black">{item?.quantity}</Text>
                  </Pressable>

                  <Pressable
                  className="bg-gray-200 rounded-md p-1"
                  onPress={() => increaseQuantity(item)}>
                    <Feather name="plus" size={24} color="black" />
                  </Pressable>
                </View>
                <Pressable className="" onPress={() => deleteItem(item)}>
                  <Text className="items-center text-center mt-4 mx-4 text-black border-2 border-gray-300 p-1 rounded-md">Delete</Text>
                </Pressable>
              </Pressable>

              <Pressable className="flex flex-row mx-2 mt-4 space-x-4">
                <Pressable>
                  <Text className="text-black border-2 border-gray-300 p-1 rounded-md">Save For Later</Text>
                </Pressable>

                <Pressable>
                  <Text className="text-black border-2 border-gray-300 p-1 rounded-md">See More Like this</Text>
                </Pressable>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default CartScreen;
