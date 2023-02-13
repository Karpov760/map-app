import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { Marker } from 'react-native-maps';
import {useState} from 'react';

export default function MapScreen({ navigation, route }) {
  const markers = [{
      id: "A",
      latitude: 58.01,
      longitude: 56.2,
      photos: []
    },
    {
      id: "B",
      latitude: 58.24,
      longitude: 56.6,
      photos: []
      },
  ]
  const [data, setMarkersData] = useState(markers)

  const onMapPressed = (e) => {
    const coords = e.nativeEvent.coordinate;
    const marker = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      photos: []
    };
    setMarkersData(data=>[...data, marker])
  }

  const onMarkerPressed = (e, markerId) => {
    //const coords = e.nativeEvent.coordinate;
    // console.log("on Press");
    // console.log(markerId);
    const photos = data.find(marker => marker.id === markerId)
    navigation.navigate('Marker', {markerId: markerId, photos: photos["photos"]})
  }

  React.useEffect(() => {
    if (route.params?.newImage) {
      const updatedMarkers = data.map((marker) => {
         console.log(route.params?.markerId);
         if (marker.id === route.params?.markerId) {
          return {
            ...marker,
            photos: [...marker.photos, route.params?.newImage],
          };
        } else {
          return marker;  
        }
       });
       setMarkersData(updatedMarkers);
       console.log(updatedMarkers);
    }
  }, [route.params?.newImage]);



  const markerDisplayed = data.map( (marker) => {
    return (
      <Marker
        key={marker.id}
        coordinate={marker}
        // title={marker.title}
        // description={marker.description}
        onPress={(e) => {
          onMarkerPressed(e, marker.id);
        }}
     />)
  })

  return (
    <View style={styles.container}>
      <MapView 
          initialRegion={{
            latitude: 58.01,
            longitude: 56.2,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          }} 
          style={styles.map}
          onPress={onMapPressed}>
        {markerDisplayed}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});