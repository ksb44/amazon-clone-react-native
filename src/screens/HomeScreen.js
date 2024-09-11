import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {categories, deals, offers, images} from '../constant/constants';
import CustomSlider from '../components/Slider';
import CustomDropdown from '../components/Dropdown';
import ProductItem from '../components/ProductItem';
import {useNavigation} from '@react-navigation/native';
import {BottomModal, SlideAnimation, ModalContent} from 'react-native-modals';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/Header';
import { UserType } from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('jewelery');
  const [items, setItems] = useState([
    {label: "Men's clothing", value: "men's clothing"},
    {label: 'jewelery', value: 'jewelery'},
    {label: 'electronics', value: 'electronics'},
    {label: "women's clothing", value: "women's clothing"},
  ]);
  const [addresses,setAddresses] =useState([])
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const {userId,setUserId} = useContext(UserType)

  const [selectedAddress,setSelectedAdress] = useState([]);
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);
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
const fetchUser= async()=>{
  const token = await AsyncStorage.getItem('token')
  const decoded = jwtDecode(token)
  const userId=decoded.id
  setUserId(userId)
}
fetchUser()
},[])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const ListHeaderComponent = () => (
    <>
      <Header/>

      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        className="flex-1 flex-row bg-cyan-200 p-3">
        <EvilIcons name="location" size={24} color="black" />
        <Pressable>
          {selectedAddress ? ( <Text className="text-black font-medium text-md">
            Deliver to {selectedAddress?.name} - {selectedAddress?.street}
          </Text>):(<Text className="text-black font-medium text-md">
            Add a address
          </Text>)}
         
        </Pressable>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
      </Pressable>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({item}) => (
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Pressable className="m-5 items-center justify-center">
              <Image
                style={{width: 50, height: 50, resizeMode: 'contain'}}
                source={{uri: item.image}}
              />
              <Text className="text-black font-medium text-md">
                {item?.name}
              </Text>
            </Pressable>
          </View>
        )}
        keyExtractor={category => category.id.toString()}
      />

      <CustomSlider images={images} />
      <Text className="font-bold text-lg text-black mt-2 mx-4">
        Trending Deals of the week
      </Text>

      <View className="flex flex-row items-center flex-wrap border-b-2 border-gray-500">
        {deals.map((item, index) => (
          <Pressable
            onPress={() =>
              navigation.navigate('ProductInfo', {
                id: item.id,
                title: item.title,
                price: item?.price,
                carouselImages: item.carouselImages,
                color: item?.color,
                size: item?.size,
                oldPrice: item?.oldPrice,
                item: item,
              })
            }
            className="my-5"
            key={index}>
            <Image
              style={{width: 200, height: 200, resizeMode: 'contain'}}
              source={{uri: item.image}}
            />
          </Pressable>
        ))}
      </View>

      <Text className="mt-2 mx-4 font-bold text-black text-lg">
        Today's Deals
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={offers}
        renderItem={({item}) => (
          <Pressable
            onPress={() =>
              navigation.navigate('ProductInfo', {
                id: item.id,
                title: item.title,
                price: item?.price,
                carouselImages: item.carouselImages,
                color: item?.color,
                size: item?.size,
                oldPrice: item?.oldPrice,
                item: item,
              })
            }
            className="mt-2 items-center">
            <Image
              style={{
                width: 150,
                height: 150,
                resizeMode: 'contain',
                marginHorizontal: 4,
              }}
              source={{uri: item?.image}}
            />
            <View className="bg-red-500 w-[90%] h-10 items-center justify-center rounded-2xl mt-5 mb-4">
              <Text className="text-white">Upto {item?.offer}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={item => item.id.toString()}
      />

      <View className="relative mx-4 mt-4 w-[90%] bg-white">
        <CustomDropdown
          items={items}
          value={category}
          setValue={setCategory}
          placeholder="Choose category"
        />
      </View>
    </>
  );

  return (
    <>
      <SafeAreaView
        className={`p-${Platform.OS == 'android' ? '40' : '0'} bg-white`}>
        <View className="">
          <FlatList
            ListHeaderComponent={ListHeaderComponent}
            data={products.filter(item => item.category === category)}
            renderItem={({item}) => (
              <>
                <View>
                  <ProductItem key={item.id} item={item} />
                </View>
              </>
            )}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-evenly'}}
          />
        </View>
      </SafeAreaView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}>
        <ModalContent style={{width: '100%', height: 400}}>
          <View style={{marginBottom: 8}}>
            <Text style={{fontSize: 16, fontWeight: '500'}}>
              Choose your Location
            </Text>

            <Text style={{marginTop: 5, fontSize: 16, color: 'gray'}}>
              Select a delivery location to see product availabilty and delivery
              options
            </Text>
          </View>

          <ScrollView className="space-x-2" horizontal showsHorizontalScrollIndicator={false}>
            {addresses && addresses?.map((item, index) => (
              <Pressable key={index}
              onPress={() => setSelectedAdress(item)}
              className={`border-2 border-gray-400 text-center items-center justify-center ${selectedAddress ===item?'bg-blue-200':'bg-white'}`}
                style={{
                  width: 140,
                  height: 140,
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.houseNo},{item?.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item?.street}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  India, Bangalore
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('AddAddress');
              }}
              style={{
                width: 140,
                height: 140,
              }}
              className="mx-8 border-2 border-blue-600 items-center justify-center"
              >

              <Text
                style={{
                  textAlign: 'center',
                  color: '#0066b2',
                  fontWeight: '500',
                }}>
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{flexDirection: 'column', gap: 7, marginBottom: 30}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Entypo name="location-pin" size={22} color="#0066b2" />
              <Text style={{color: '#0066b2', fontWeight: '400'}}>
                Enter an Indian pincode
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Ionicons name="locate-sharp" size={22} color="#0066b2" />
              <Text style={{color: '#0066b2', fontWeight: '400'}}>
                Use My Currect location
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <AntDesign name="earth" size={22} color="#0066b2" />

              <Text style={{color: '#0066b2', fontWeight: '400'}}>
                Deliver outside India
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;
