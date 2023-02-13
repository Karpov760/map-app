import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';

import Button from './Button';
import ImageViewer from './ImageViewer';

export default function MarkerScreen({ route, navigation }) {
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const { markerId, photos } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setIsImageUploaded(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const saveImage = async () => {
    // console.log(photos);
    // console.log("Save image")
    // console.log(markerId);
    navigation.navigate({
      name: 'Home',
      params: { newImage: selectedImage, markerId: markerId},
      merge: true,
    });
  };


  const photosDisplayed = photos.map( (photo, index) => {
    return (
      <ImageViewer
          placeholderImageSource={photo}
          
        />
      )
  })



  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
      <ImageViewer
          placeholderImageSource={selectedImage}
        />
      <Button theme="primary" label="Choose a photo" onPress={pickImageAsync}/>
      { isImageUploaded ? (<Button label="Save image" onPress={saveImage}/>): <View /> }
      {photosDisplayed}
      </View>
      <View style={styles.footerContainer}>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25292e',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});