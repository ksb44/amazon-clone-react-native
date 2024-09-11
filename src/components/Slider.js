import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const CustomSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, [images]);

  return (
    <View style={styles.sliderContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false} 
        contentOffset={{ x: currentIndex * width, y: 0 }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.image}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: '100%',
    height: 200, 
  },
  image: {
    width,
    height: '100%',
    resizeMode: 'cover', 
  },
});

export default CustomSlider;
