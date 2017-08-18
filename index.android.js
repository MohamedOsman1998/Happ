/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';

import Roulette from 'react-native-roulette';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
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
  onRegionChange(region) {
    if (region.latitudeDelta > 0.2) {
      this.state.markers = [marker1, marker2]
    } else {
      this.state.markers = [marker1, marker2, marker3]
    }

    this.setState({region});

  }

  constructor(props) {

    super(props);
    let d = new Date;
    var isDay = d.getHours() > 6 && d.getHours() < 18;
    isDay = true
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

    this.onRegionChange = this
      .onRegionChange
      .bind(this);

  };
  async componentDidMount() {}

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

          {this
            .state
            .markers
            .map(marker => (

              <MapView.Marker //TODO: create custom view for marker to make the width and height consistent on all resolutions
                key={marker.id}
                coordinate={marker.latlng}
                title={marker.title}
                image={marker.pic}
                description={marker.description}>
                <MapView.Callout>
                  <CustomCallout marker={marker}/>
                </MapView.Callout>
              </MapView.Marker>
            ))}
        </MapView>
        <Image source={this.state.searchIcon} style={styles.searchIcon}/>

        <Roulette
          customStyle={styles.roulette}
          rouletteRotate={50}
          enableUserRotate
          onRotate={(props) => console.log(props)}>
          <Image
            ref="icon"
            style={{
            width: 50,
            height: 50
          }}
            source={this.state.searchIcon}
            title="TAPBOO"/>
          <View>
            <Image
              ref="icon"
              style={{
              width: 50,
              height: 50
            }}
              source={this.state.searchIcon}
              title="TAPBOO"/>
          </View>
          <Image
            ref="icon"
            style={{
            width: 50,
            height: 50
          }}
            source={this.state.searchIcon}
            title="TAPBOO"/>
          <View>
            <Image
              ref="icon"
              style={{
              width: 50,
              height: 50
            }}
              source={this.state.searchIcon}
              title="TAPBOO"/>
          </View>
        </Roulette>
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
  searchIcon: {
    position: 'absolute',
    right: 12,
    width: 50,
    height: 50,
    top: 20,
    zIndex: 10
  },
  roulette: {
    // position: 'absolute',
    // width: 50,
    // height: 50,
    // bottom: 50,
    // zIndex: 10
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
const dayStyle = [
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
