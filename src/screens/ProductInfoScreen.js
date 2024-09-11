import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Pressable,
  Image,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useRoute} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../slices/CartSlice';
import Header from '../components/Header';
const ProductInfoScreen = () => {
  const route = useRoute();
  const [addedToCart, setAddedToCart] = useState(false);
  const {width} = Dimensions.get('window');
  const height = (width * 100) / 100;
  const dispatch = useDispatch();
  const addItemToCart = item => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  const cart = useSelector(state => state.cart.cart);


  return (
    <SafeAreaView >
        <ScrollView>
            <Header/>
      <View className="">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={route.params.carouselImages}
          renderItem={({item}) => (
            <>
              <View className="">
                <ImageBackground
                  style={{width, height, marginTop: 15, resizeMode: 'contain'}}
                  source={{uri: item}}>
                  <Text className="bg-red-500 w-12 text-white p-1 m-2 rounded-3xl justify-center text-center items-center">
                    20% off
                  </Text>
                  <View className="absolute  w-10 rounded-3xl m-2 right-0 p-2 bg-gray-200">
                    <MaterialCommunityIcons
                      name="share-variant"
                      size={24}
                      color="black"
                    />
                  </View>

                  <View className="absolute bottom-0 m-2 rounded-3xl p-2 bg-gray-200">
                    <AntDesign name="hearto" size={24} color="black" />
                  </View>
                </ImageBackground>
              </View>
            </>
          )}
          keyExtractor={item => item}
        />
      </View>
      <View className="border-b-2 border-gray-400 ">
        <Text style={{width}} className="m-3 text-sm text-black font-medium">
          {route?.params?.title}
        </Text>
        <Text className="m-2  text-black font-medium ">
          Rs {route?.params?.price}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
        }}>
        <Text>Color: </Text>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
          {route?.params?.color}
        </Text>
      </View>
      <View
        className="border-b-2 border-gray-400"
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
        }}>
        <Text>Size: </Text>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>
          {route?.params?.size}
        </Text>
      </View>
      <View className="" style={{padding: 10}}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            marginVertical: 5,
          }}>
          Total : ₹{route.params.price}
        </Text>
        <Text className="mt-2 mx-1" style={{color: '#00CED1'}}>
          FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
        </Text>
      </View>
      <View className="flex flex-row mx-2">
        <Ionicons name="location" size={24} color="black" />

        <Text style={{fontSize: 15, fontWeight: '500'}}>
          Deliver To Sujan - Bangalore 560019
        </Text>
      </View>
      <Text
        className="mx-4"
        style={{
          color: 'green',
          marginHorizontal: 10,
          fontWeight: '500',
        }}>
        IN Stock
      </Text>
      <View className="">
        <Pressable
          onPress={() => addItemToCart(route?.params?.item)}
          className="rounded-2xl mx-6 mt-4
                  bg-yellow-500
                  justify-center items-center p-2">
          {addedToCart ? (
            <View>
              <Text className="text-black font-medium p-1">Added to Cart</Text>
            </View>
          ) : (
            <View>
              <Text className="text-black font-medium">Add to Cart</Text>
            </View>
          )}
        </Pressable>
        <Pressable
          className="rounded-2xl mx-6 mt-4
                  bg-yellow-500 p-2 mb-4
                  justify-center items-center">
          <Text className="text-black font-medium">Buy Now</Text>
        </Pressable>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductInfoScreen;
