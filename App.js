import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MapView from 'react-native-maps';

export default class App extends React.Component {

onRegionChange(region) {
  this.setState({ region });

}
  
 constructor(props) {
   
    super(props);
    this.state =  {
      region:{
      latitude: 2.945895,
      longitude: 101.870711,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
        mapStyle:[{"featureType":"all","elementType":"all","stylers":[{"lightness":"42"},{"visibility":"on"},{"hue":"#ff0000"},{"saturation":"-100"},{"gamma":"0.78"},{"weight":"0.37"},{"invert_lightness":true}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#3ec7c9"},{"visibility":"on"}]}]

    };
  this.onRegionChange = this.onRegionChange.bind(this);

  };


    state =  {
      region:{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    mapStyle:[{"featureType":"all","elementType":"all","stylers":[{"lightness":"42"},{"visibility":"on"},{"hue":"#ff0000"},{"saturation":"-100"},{"gamma":"0.78"},{"weight":"0.37"},{"invert_lightness":true}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#3ec7c9"},{"visibility":"on"}]}]
    };

render() {
  return (
     
    <View style={styles.container}>
     <MapView
       style={styles.map}
       region={this.state.region}
       onRegionChange={this.onRegionChange}
       customMapStyle={this.state.mapStyle}

     />
  </View>
    
  );
}

  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Open up App.js to start working on your app!</Text>
  //     </View>
  //   );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map:{
    left:0,
    right:0,
    bottom:0,
    top:0,
    position:'absolute'
  }
});
