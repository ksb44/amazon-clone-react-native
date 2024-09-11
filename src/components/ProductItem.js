import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { addToCart } from '../slices/CartSlice'

const ProductItem = ({item}) => {
  const route =useRoute()
  const [addedToCart, setAddedToCart] = useState(false);

  const dispatch=useDispatch()
  const addItemToCart = item => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  return (
    <Pressable className="my-4   py-2 px-2 rounded-xl shadow-2xl justify-center items-center transition-transform duration-200 ease-in-out active:scale-90 h-[340px] 
">
        <Image style={{height:150,width:150,resizeMode:'contain'}} source={{uri:item.image}} />
        <Text className="text-black mt-2 text-center" style={{width:150 ,height:80}}>{item?.title}</Text>
        <View className="mt-4 flex flex-row items-center space-x-4">
            <Text className="font-bold text-lg text-black ">Rs {item?.price}</Text>
            <Text className=" text-lg text-yellow-500">{item?.rating?.rate}</Text>
        </View>
        <Pressable
        className="rounded-2xl mx-6 mt-4
        bg-yellow-500 p-2 mb-4
        justify-center items-center"
         onPress={()=>addItemToCart(item)}>
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
    </Pressable>
  )
}

export default ProductItem