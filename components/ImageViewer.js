import { StyleSheet, Image, Text } from 'react-native';

export default function ImageViewer({ placeholderImageSource, text }) {
  if (placeholderImageSource !== null) {
    return (
      <Image source={{ uri: placeholderImageSource }} style={styles.image} />
    );
  }
  else if ( text !== null) {
    return (
      <Text style={styles.text}>{text}</Text>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  }
});