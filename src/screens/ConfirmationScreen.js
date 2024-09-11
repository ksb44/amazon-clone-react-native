import { StyleSheet, Text, View, ScrollView, Pressable,Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";

import  Entypo  from "react-native-vector-icons/Entypo";
import  FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import   MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { useDispatch, useSelector } from "react-redux";
import { cleanCart } from "../slices/CartSlice";
import { useNavigation } from "@react-navigation/native";
 import RazorpayCheckout from "react-native-razorpay";
import { UserType } from "../context/UserContext";

const ConfirmationScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
   const navigation = useNavigation();
   const [currentStep, setCurrentStep] = useState(0);
   const [addresses, setAddresses] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  useEffect(() => {
    fetchAddresses();
  }, []);
  const fetchAddresses = async () => {
    try {
      const response = await fetch(
        `https://amazon-clone-app-backend.onrender.com/api/address/addresses/${userId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
      );
      
      const data = await response.json()
     
      setAddresses(data.addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAdress] = useState("");
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const handlePlaceOrder = async () => {
    try {
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: selectedOption,
      };

      const response = await fetch(
        "https://amazon-clone-app-backend.onrender.com/api/order/orders",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        }
       
      );
      
      if (response.ok) {
         navigation.navigate("Order");
         dispatch(cleanCart());
        console.log("order created successfully", response.message);
      } else {
        console.log("error creating order", response.message);
      }
    } catch (error) {
      console.log("errror", error);
    }
  };
  const pay = async () => {
    try {
    //   const options = {
    //     description: "Adding To Wallet",
    //     currency: "INR",
    //     name: "Amazon",
    //     key: "rzp_test_E3GWYimxN7YMk8",
    //     amount: total * 100,
    //     prefill: {
    //       email: "void@razorpay.com",
    //       contact: "9191919191",
    //       name: "RazorPay Software",
    //     },
    //     theme: { color: "#F37254" },
    //   };

    //   const data = await RazorpayCheckout.open(options);

    //  console.log(data)

      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: "card",
      };

      const response = await fetch(
        "https://amazon-clone-app-backend.onrender.com/api/order/orders",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        }
       
      );
      if (response.ok) {
        navigation.navigate("Order");
        dispatch(cleanCart());
        console.log("order created successfully", response.message);
      } else {
        console.log("error creating order", response.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
   
        <ScrollView className="">
          <View className="flex-1 px-5 pt-10">
            <View className="flex-row items-center mb-5 justify-between">
              {steps?.map((step, index) => (
                <View className="justify-center items-center" key={index}>
                  {index > 0 && (
                    <View
                      className={`flex-1 h-0.5 bg-gray-500 ${index <= currentStep && "bg-green-500"}`}
                    />
                  )}
                  <View
             className={`h-8 w-10 rounded-full bg-gray-300 justify-center items-center ${
                      index < currentStep && "bg-green-500"
                    }`}
                  >
                    {index < currentStep ? (
                      <Text className="text-lg font-bold text-white">&#10003;</Text>
                    ) : (
                      <Text className="text-lg font-bold text-white">{index + 1}</Text>
                    )}
                  </View>
                  <Text className="text-center mt-2 text-black">{step.title}</Text>
                </View>
              ))}
            </View>
          </View>
      
          {currentStep == 0 && (
            <View className="mx-5">
              <Text className="text-lg font-bold text-black mb-2">Select Delivery Address</Text>
              {addresses?.map((item, index) => (
                <Pressable
                  className="border border-gray-300 p-2 flex-row items-center gap-1.5 mb-4 rounded-md"
                  key={index}
                >
                  {selectedAddress && selectedAddress._id === item?._id ? (
                    <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                  ) : (
                    <Entypo
                      onPress={() => setSelectedAdress(item)}
                      name="circle"
                      size={20}
                      color="gray"
                    />
                  )}
      
                  <View className="ml-1.5">
                    <View className="flex-row items-center gap-0.5">
                      <Text className="text-lg font-bold">{item?.name}</Text>
                      <Entypo name="location-pin" size={24} color="red" />
                    </View>
                    <Text className="text-base text-gray-900">
                      {item?.houseNo}, {item?.landmark}
                    </Text>
                    <Text className="text-base text-gray-900">{item?.street}</Text>
                    <Text className="text-base text-gray-900">{item?.city}</Text>
                    <Text className="text-base text-gray-900">India, Bangalore</Text>
                    <Text className="text-base text-gray-900">Phone No : {item?.mobileNo}</Text>
                    <Text className="text-base text-gray-900">Pin code : {item?.postalCode}</Text>
                    
                    <View className="flex-row items-center gap-2.5 mt-2">
                      <Pressable className="bg-gray-100 px-2 py-1.5 rounded-md border border-gray-300">
                        <Text>Edit</Text>
                      </Pressable>
                      <Pressable className="bg-gray-100 px-2 py-1.5 rounded-md border border-gray-300">
                        <Text>Remove</Text>
                      </Pressable>
                      <Pressable className="bg-gray-100 px-2 py-1.5 rounded-md border border-gray-300">
                        <Text>Set as Default</Text>
                      </Pressable>
                    </View>
      
                    <View>
                      {selectedAddress && selectedAddress._id === item?._id && (
                        <Pressable
                          onPress={() => setCurrentStep(1)}
                          className="bg-teal-700 p-2 rounded-2xl justify-center items-center mt-2.5"
                        >
                          <Text className="text-center text-white">Deliver to this Address</Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
      
          {currentStep == 1 && (
            <View className="mx-5">
              <Text className="text-xl font-bold">Choose your delivery options</Text>
      
              <View className="flex-row items-center bg-white p-2 gap-2 border border-gray-300 mt-2.5">
                {option ? (
                  <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                ) : (
                  <Entypo
                    onPress={() => setOption(!option)}
                    name="circle"
                    size={20}
                    color="gray"
                  />
                )}
                <Text className="flex-1">
                  <Text className="text-green-500 font-medium">Tomorrow by 10pm</Text> - FREE delivery
                  with your Prime membership
                </Text>
              </View>
      
              <Pressable
                onPress={() => setCurrentStep(2)}
                className="bg-yellow-500 p-2 rounded-2xl justify-center items-center mt-3.5"
              >
                <Text>Continue</Text>
              </Pressable>
            </View>
          )}
      
          {currentStep == 2 && (
            <View className="mx-5">
              <Text className="text-xl font-bold">Select your payment Method</Text>
      
              <View className="bg-white p-2 border border-gray-300 flex-row items-center gap-2 mt-3">
                {selectedOption === "cash" ? (
                  <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                ) : (
                  <Entypo
                    onPress={() => setSelectedOption("cash")}
                    name="circle"
                    size={20}
                    color="gray"
                  />
                )}
                <Text>Cash on Delivery</Text>
              </View>
      
              <View className="bg-white p-2 border border-gray-300 flex-row items-center gap-2 mt-3">
                {selectedOption === "card" ? (
                  <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                ) : (
                  <Entypo
                    onPress={() => {
                      setSelectedOption("card");
                      Alert.alert("UPI/Debit card", "Pay Online", [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel is pressed"),
                        },
                        {
                          text: "OK",
                          onPress: () => pay(),
                        },
                      ]);
                    }}
                    name="circle"
                    size={20}
                    color="gray"
                  />
                )}
                <Text>UPI / Credit or debit card</Text>
              </View>
      
              <Pressable
                onPress={() => setCurrentStep(3)}
                className="bg-yellow-500 p-2 rounded-2xl justify-center items-center mt-3.5"
              >
                <Text className="text-black">Continue</Text>
              </Pressable>
            </View>
          )}
      
          {currentStep === 3 && selectedOption === "cash" && (
            <View className="mx-5">
              <Text className="text-xl font-bold">Order Now</Text>
      
              <View className="flex-row items-center justify-between gap-2 bg-white p-2 border border-gray-300 mt-2.5">
                <View>
                  <Text className="text-lg font-bold">Save 5% and never run out</Text>
                  <Text className="text-base text-gray-500 mt-1">Turn on auto deliveries</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
              </View>
      
              <View className="bg-white p-2 border border-gray-300 mt-2.5">
                <Text>Shipping to {selectedAddress?.name}</Text>
      
                <View className="flex-row items-center justify-between mt-2">
                  <Text className="text-base font-medium text-gray-500">Items</Text>
                  <Text className="text-gray-500 text-base">₹{total}</Text>
                </View>
      
                <View className="flex-row items-center justify-between mt-2">
                  <Text className="text-base font-medium text-gray-500">Delivery</Text>
                  <Text className="text-gray-500 text-base">₹0</Text>
                </View>
      
                <View className="flex-row items-center justify-between mt-2">
                  <Text className="text-lg font-bold">Order Total</Text>
                  <Text className="text-red-600 text-lg font-bold">₹{total}</Text>
                </View>
              </View>
      
              <View className="bg-white p-2 border border-gray-300 mt-2.5">
                <Text className="text-base text-gray-500">Pay With</Text>
                <Text className="text-base font-semibold mt-1">Pay on delivery (Cash)</Text>
              </View>
      
              <Pressable
                onPress={handlePlaceOrder}
                className="bg-yellow-500 p-2 rounded-2xl justify-center items-center mt-5"
              >
                <Text className="text-black">Place your order</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
    
      
  );
};

export default ConfirmationScreen;

