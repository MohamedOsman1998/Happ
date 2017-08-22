/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';

import Roulette from './Roulette';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';
const Images = [
  {
    uri: "https://i.imgur.com/sNam9iJ.jpg"
  }, {
    uri: "https://i.imgur.com/N7rlQYt.jpg"
  }, {
    uri: "https://i.imgur.com/UDrH0wm.jpg"
  }, {
    uri: "https://i.imgur.com/Ka8kNST.jpg"
  }
]
const {width, height} = Dimensions.get("window");

const CARD_HEIGHT = height / 2;
const CARD_WIDTH = CARD_HEIGHT - 50;
const tetrisBlocks = {
  t: require('./assets/icons/tetris/t.png'),
  b: require('./assets/icons/tetris/b.png'),
  l: require('./assets/icons/tetris/l.png'),
  l1: require('./assets/icons/tetris/l1.png'),
  s: require('./assets/icons/tetris/s.png'),
  z: require('./assets/icons/tetris/z1.png')
}

var marker1 = {
  id: 0,
  latlng: {
    latitude: 2.945895,
    longitude: 101.870711
  },
  title: "University Of Nottingham",
  description: "The university Of nottingham in malaysia",
  icon: Images[0],
  pic: require('./assets/icons/png/013-sun-umbrella.png')
}

var marker2 = {
  id: 1,
  latlng: {
    latitude: 2.917252,
    longitude: 101.862546
  },
  title: "Tesco Seminyih",
  description: "The university Of nottingham in malaysia",
  icon: Images[1],
  pic: require('./assets/icons/png/002-shopping-cart.png')
}
var marker3 = {
  id: 2,
  latlng: {
    latitude: 2.945869,
    longitude: 101.852815
  },
  title: "Club",
  description: "The university Of nottingham in malaysia",
  icon: Images[2],
  pic: require('./assets/icons/png/014-turntable.png')
}

export default class App extends React.Component {

  constructor(props) {

    super(props);
    let d = new Date;
    var isDay = d.getHours() > 6 && d.getHours() < 18;
    this.state = {
      searchIcon: isDay
        ? require('./assets/icons/png/001-magnifying-glass.png')
        : require('./assets/icons/png/001-magnifying-glass-white.png'),
      region: {
        latitude: 2.945895,
        longitude: 101.870711,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      mapStyle: isDay
        ? dayStyle
        : nightStyle,
      markers: [marker1, marker2, marker3]
    };
    this.rouletteItemDim = 40;
    this.onRegionChange = this
      .onRegionChange
      .bind(this);

  };

  onRegionChange(region) {
    if (region.latitudeDelta > 0.2) {
      this.state.markers = [marker1, marker2]
    } else {
      this.state.markers = [marker1, marker2, marker3]
    }
    this.setState({region});
  }
  async componentDidMount() {}

  render() {
    return (

      <View style={styles.container}>

        <TouchableOpacity style={styles.searchIconWrapper}>
          <Image style={styles.searchIcon} source={this.state.searchIcon}/>
        </TouchableOpacity>

        <MapView
          showsCompass={false}
          style={styles.map}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          customMapStyle={this.state.mapStyle}
          rotateEnabled={false}>

          {this
            .state
            .markers
            .map(marker => (

              <MapView.Marker //TODO: create custom view for marker to make the width and height consistent on all resolutions
  key={marker.id} coordinate={marker.latlng} title={marker.title} image={marker.pic} description={marker.description}>
                <MapView.Callout>
                  <CustomCallout marker={marker}/>
                </MapView.Callout>
              </MapView.Marker>
            ))}
        </MapView>
        <View
          style={{
          position: 'absolute',
          bottom: -127.5,
          width: 215,
          height: 215,
          borderRadius: 215 / 2,
          borderWidth: 10,
          borderColor: '#333232'
        }}/>

        <Roulette
          customStyle={{
          position: 'absolute',
          bottom: -120,
          backgroundColor: 'rgba(236, 240, 241,0.69)'
        }}
          customCenterStyle={{
          width: 100,
          height: 100,
          backgroundColor: "#333232"
        }}
          rouletteRotate={50}
          enableUserRotate
          radius={200}
          distance={73}
          onRotate={(props) => console.log(props)}>
          {Object
            .keys(tetrisBlocks)
            .map(key => (
              <TouchableOpacity key={key} onPress={() => {}}>
                <Image
                  ref="icon"
                  style={{
                  width: this.rouletteItemDim,
                  height: this.rouletteItemDim
                }}
                  source={tetrisBlocks[key]}
                  title="TAPBOO"/>
              </TouchableOpacity>
            ))}

        </Roulette>
        <Image
            source={require('./assets/icons/png/selector.png')}
            style={{
            width: 43,
            height:43,
            position:'absolute',
            bottom:0
          }}/>
      </View>
    );
  }

}
class CustomCallout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      //  load: function.bind(this)
    }
  }
  imageLoaded() {}
  render() {
    return (
      <View style={styles.card}>
        <Image
          source={this.props.marker.icon}
          style={styles.cardImage}
          resizeMode="cover"/>
        <View style={styles.textContent}>
          <Text numberOfLines={1} style={styles.cardtitle}>{this.props.marker.title}</Text>
          <Text numberOfLines={1} style={styles.cardDescription}>
            {this.props.marker.description}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    position: 'absolute'
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: {
      x: 2,
      y: -2
    },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden"
  },
  searchIconWrapper: {
    position: 'absolute',
    right: 12,
    width: 50,
    height: 50,
    top: 20,
    zIndex: 10
  },
  searchIcon: {
    width: 50,
    height: 50
  },
  roulette: {
    // position: 'absolute', width: 50, height: 50, bottom: 50, zIndex: 10
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold"
  },
  cardDescription: {
    fontSize: 12,
    color: "#444"
  }
});
const dayStyle1 = [
  {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6195a0"
      }
    ]
  }, {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      {
        "lightness": "0"
      }, {
        "saturation": "0"
      }, {
        "color": "#f5f5f2"
      }, {
        "gamma": "1"
      }
    ]
  }, {
    "featureType": "landscape.man_made",
    "elementType": "all",
    "stylers": [
      {
        "lightness": "-3"
      }, {
        "gamma": "1.00"
      }
    ]
  }, {
    "featureType": "landscape.natural.terrain",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }, {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#bae5ce"
      }, {
        "visibility": "on"
      }
    ]
  }, {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      {
        "saturation": -100
      }, {
        "lightness": 45
      }, {
        "visibility": "simplified"
      }
    ]
  }, {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#fac9a9"
      }, {
        "visibility": "simplified"
      }
    ]
  }, {
    "featureType": "road.highway",
    "elementType": "labels.text",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  }, {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#787878"
      }
    ]
  }, {
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  }, {
    "featureType": "transit.station.airport",
    "elementType": "labels.icon",
    "stylers": [
      {
        "hue": "#0a00ff"
      }, {
        "saturation": "-77"
      }, {
        "gamma": "0.57"
      }, {
        "lightness": "0"
      }
    ]
  }, {
    "featureType": "transit.station.rail",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#43321e"
      }
    ]
  }, {
    "featureType": "transit.station.rail",
    "elementType": "labels.icon",
    "stylers": [
      {
        "hue": "#ff6c00"
      }, {
        "lightness": "4"
      }, {
        "gamma": "0.75"
      }, {
        "saturation": "-68"
      }
    ]
  }, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [
      {
        "color": "#eaf6f8"
      }, {
        "visibility": "on"
      }
    ]
  }, {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#c7eced"
      }
    ]
  }, {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "lightness": "-49"
      }, {
        "saturation": "-53"
      }, {
        "gamma": "0.79"
      }
    ]
  }
]
const dayStyle = [
  {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#7c93a3"
      }, {
        "lightness": "-10"
      }
    ]
  }, {
    "featureType": "administrative.country",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  }, {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#a0a4a5"
      }
    ]
  }, {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#62838e"
      }
    ]
  }, {
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#dde3e3"
      }
    ]
  }, {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#3f4a51"
      }, {
        "weight": "0.30"
      }
    ]
  }, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  }, {
    "featureType": "poi.attraction",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  }, {
    "featureType": "poi.business",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }, {
    "featureType": "poi.government",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }, {
    "featureType": "poi.park",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  }, {
    "featureType": "poi.place_of_worship",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }, {
    "featureType": "poi.school",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }, {
    "featureType": "poi.sports_complex",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }, {
    "featureType": "road",
    "elementType": "all",
    "stylers": [
      {
        "saturation": "-100"
      }, {
        "visibility": "on"
      }
    ]
  }, {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#bbcacf"
      }
    ]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "lightness": "0"
      }, {
        "color": "#bbcacf"
      }, {
        "weight": "0.50"
      }
    ]
  }, {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  }, {
    "featureType": "road.highway",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  }, {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  }, {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#a9b4b8"
      }
    ]
  }, {
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [
      {
        "invert_lightness": true
      }, {
        "saturation": "-7"
      }, {
        "lightness": "3"
      }, {
        "gamma": "1.80"
      }, {
        "weight": "0.01"
      }
    ]
  }, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }, {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a3c7df"
      }
    ]
  }
]
const nightStyle = [
  {
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "saturation": 36
      }, {
        "color": "#000000"
      }, {
        "lightness": 40
      }
    ]
  }, {
    "featureType": "all",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "visibility": "on"
      }, {
        "color": "#000000"
      }, {
        "lightness": 16
      }
    ]
  }, {
    "featureType": "all",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#000000"
      }, {
        "lightness": 20
      }
    ]
  }, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#000000"
      }, {
        "lightness": 17
      }, {
        "weight": 1.2
      }
    ]
  }, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }, {
        "lightness": 20
      }
    ]
  }, {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  }, {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }, {
    "featureType": "landscape.man_made",
    "elementType": "labels.text",
    "stylers": [
      {
        "color": "#ff0000"
      }, {
        "saturation": "50"
      }, {
        "gamma": "8.34"
      }
    ]
  }, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }, {
        "lightness": 21
      }
    ]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#000000"
      }, {
        "lightness": 17
      }
    ]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#000000"
      }, {
        "lightness": 29
      }, {
        "weight": 0.2
      }
    ]
  }, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }, {
        "lightness": 18
      }
    ]
  }, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }, {
        "lightness": 16
      }
    ]
  }, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }, {
        "lightness": 19
      }
    ]
  }, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#0f252e"
      }, {
        "lightness": 17
      }
    ]
  }
]
AppRegistry.registerComponent('hireProject', () => App);
