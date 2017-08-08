import React from 'react';
import {AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,} from 'react-native';

import MapView from 'react-native-maps';
const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]
const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 2;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class App extends React.Component {

onRegionChange(region) {
  this.setState({ region });
  if(region.latitudeDelta>0.1){
    this.state.markers=[
         {
          id:0,
          latlng:{ latitude: 2.945895,longitude: 101.870711},
          title:"University Of Nottingham",
          description:"The university Of nottingham in malaysia",
          icon:Images[0],
          pic: require('./assets/icons/png/013-sun-umbrella.png')
         },
        {
          id:1,
          latlng:{ latitude: 2.945895,longitude: 101.874711},
          title:"University Of Malaya",
          description:"The university Of malaya good",
          icon:Images[1],
          pic: require('./assets/icons/png/013-sun-umbrella.png')
         }
    ]
  }
  else {
    this.state.markers=[
         {
          id:0,
          latlng:{ latitude: 2.945895,longitude: 101.870711},
          title:"University Of Nottingham",
          description:"The university Of nottingham in malaysia",
          icon:Images[0],
          pic: require('./assets/icons/png/013-sun-umbrella.png')
         },
        {
          id:1,
          latlng:{ latitude: 2.945895,longitude: 101.874711},
          title:"University Of Malaya",
          description:"The university Of malaya good",
          icon:Images[1],
          pic: require('./assets/icons/png/013-sun-umbrella.png')
         },
         {
          id:2,
          latlng:{ latitude: 2.945895,longitude: 101.878711},
          title:"University Of Taylors",
          description:"The university Of bad",
          icon:Images[2],
          pic: require('./assets/icons/png/002-shopping-cart.png')
         },
       ]
  }


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
       mapStyle:[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#6195a0"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"lightness":"0"},{"saturation":"0"},{"color":"#f5f5f2"},{"gamma":"1"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"lightness":"-3"},{"gamma":"1.00"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#bae5ce"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#fac9a9"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"transit.station.airport","elementType":"labels.icon","stylers":[{"hue":"#0a00ff"},{"saturation":"-77"},{"gamma":"0.57"},{"lightness":"0"}]},{"featureType":"transit.station.rail","elementType":"labels.text.fill","stylers":[{"color":"#43321e"}]},{"featureType":"transit.station.rail","elementType":"labels.icon","stylers":[{"hue":"#ff6c00"},{"lightness":"4"},{"gamma":"0.75"},{"saturation":"-68"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c7eced"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"lightness":"-49"},{"saturation":"-53"},{"gamma":"0.79"}]}],
       markers:[
         {
          id:0,
          latlng:{ latitude: 2.945895,longitude: 101.870711},
          title:"University Of Nottingham",
          description:"The university Of nottingham in malaysia",
          icon:Images[0],
          pic: require('./assets/icons/png/013-sun-umbrella.png')
         },
        {
          id:1,
          latlng:{ latitude: 2.945895,longitude: 101.874711},
          title:"University Of Malaya",
          description:"The university Of malaya good",
          icon:Images[1],
          pic: require('./assets/icons/png/013-sun-umbrella.png')
         },
         {
          id:2,
          latlng:{ latitude: 2.945895,longitude: 101.878711},
          title:"University Of Taylors",
          description:"The university Of bad",
          icon:Images[2],
          pic: require('./assets/icons/png/002-shopping-cart.png')
         },
       ]

    };
  this.onRegionChange = this.onRegionChange.bind(this);

  };


    // state =  {
    //   region:{
    //   latitude: 37.78825,
    //   longitude: -122.4324,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // },
    // mapStyle:[{"featureType":"all","elementType":"all","stylers":[{"lightness":"42"},{"visibility":"on"},{"hue":"#ff0000"},{"saturation":"-100"},{"gamma":"0.78"},{"weight":"0.37"},{"invert_lightness":true}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#3ec7c9"},{"visibility":"on"}]}]
    // };

render() {
  return (
     
    <View style={styles.container}>
     <MapView
       showsUserLocation={true}
       showsCompass={false}
       style={styles.map}
       region={this.state.region}
       onRegionChange={this.onRegionChange}
       customMapStyle={this.state.mapStyle}
       rotateEnabled={false}>
       
         {this.state.markers.map(marker => (

    <MapView.Marker
    key={marker.id}
      coordinate={marker.latlng}
      title={marker.title}
      image={marker.pic}
      description={marker.description}
    >
    <MapView.Callout>
         <View style={styles.card}>
              <Image
                source={marker.icon}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </View>
    </MapView.Callout>
    </MapView.Marker>
  ))}



       </MapView>

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
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
});
