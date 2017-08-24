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
  VirtualizedList,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';


import MapView from 'react-native-maps';
import Flag from './Flag.js'
import SplashScreen from './SplashScreen.js'




const Images = [
  {
    uri: "http://www.customwebsitevideo.com/images/prosbo_hires.jpg"
  }, {
    uri: "https://upload.wikimedia.org/wikipedia/commons/3/31/Small_rhombicosidodecahedron.png"
  }, {
    uri: "http://www.kiplinger.com/quiz/business/T049-S001-test-your-start-up-know-how/images/all-small-businesses-have-to-be-incorporated1.jpg"
  }, {
    uri: "http://www.customwebsitevideo.com/images/prosbo_hires.jpg"
  }
]
const countryList=[
  "dominica",
 "dominican-republic",
  "east-timor",
  'ecuador',
  'egypt',
  'england',
  'equatorial-guinea',
  'eritrsea',
  'estonia',
  'ethiopia',
  'european-union',
  'falkland-islands',
  'faroe-islands',
  'fiji',
  'finland',
  'france',
  'french-polynesia',
  'gabon',
  'galapagos-islands',
  'gambia',
  'georgia',
  'germany',
  'ghana',
  'gibraltar',
  'greece',
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
}

export default class App extends React.Component {

  constructor(props) {

    super(props);
    let d = new Date;
    var isDay = d.getHours() > 6 && d.getHours() < 18;
    isDay=true;
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
      splash:true,
      mapStyle: isDay
        ? dayStyle
        : nightStyle,
      markers: [marker1, marker2, marker3]
    };
    this.onRegionChange = this
      .onRegionChange
      .bind(this);

  };

  onRegionChange(region) {
    if (region.latitudeDelta > 0.2) {
      this.setState({markers:[marker1, marker2]}) 
    } else {
      this.setState({markers:[marker1, marker2,marker3]}) 
    }
    this.setState({region});
  }
  async componentDidMount() {
    setTimeout(()=>{
      this.setState({splash:false})
    }, 5000);
  }
  render() {
        if(this.state.splash){
      return(
        <SplashScreen/>
      )
    }
    else
    return (

      <View style={styles.container}>


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
            .map((marker,id) => (

              <MapView.Marker //TODO: create custom view for marker to make the width and height consistent on all resolutions
                key={marker.id} coordinate={marker.latlng} title={marker.title}  description={marker.description}>
                <Image ref="icon" source={id?tetrisBlocks.z:tetrisBlocks.b}style={{width:40,height:40}}/>
                <MapView.Callout>
                  <CustomCallout marker={marker}/>
                </MapView.Callout>
              </MapView.Marker>
            ))}
        </MapView>
        <TouchableOpacity style={styles.searchIconWrapper}>
          <Image style={styles.searchIcon} source={this.state.searchIcon}/>
        </TouchableOpacity>

          <LoopingListView countryList={countryList}/>
          <View style={styles.square} />


        <View  //Roulette Border
          style={styles.rouletteBorder}/>

        <Roulette
          customStyle={styles.rouletteStyle}
          customCenterStyle={styles.rouletteCenter}
          rouletteRotate={30}
          enableUserRotate
          radius={200}
          distance={73}
          onRotate={(props) => console.log(props)}>
          {Object
            .keys(tetrisBlocks)
            .map(key => (
              <TouchableOpacity key={key} onPress={() => {}}>
                <Image
                  style={styles.rouletteItem}
                  source={tetrisBlocks[key]}
                  />
              </TouchableOpacity>
            ))}

        </Roulette>

        <Image
          source={require('./assets/icons/png/selector.png')}
          style={{
          width: 43,
          height: 43,
          position: 'absolute',
          bottom: 0
        }}/>
      </View>
    );
  }
  
}
class DataSource {
  getElementAtIndex (index) {
    return { key: index }
  }
}

const data = new DataSource()
class LoopingListView extends React.Component{
  constructor(props){
    super(props)
    this.props=props;

  }
   getItem (data, index) {
    return data.getElementAtIndex(index)
  }
  componentWillUpdate(){
    console.log("list")
  }
  shouldComponentUpdate(){
    return false;
  }
   getItemCount (data) {
    return 1000
  }
  
render(){

  return (
    <VirtualizedList
        data={data}
        style={styles.list}
         initialNumToRender={40}
        // maxToRenderPerBatch={}
         windowSize={60}
        getItemCount={this.getItemCount}
        getItem={this.getItem}
        initialScrollIndex={400}
        keyExtractor={(item, index) => {
          return index
        }}
        ListEmptyComponent= { ()=>(
            <View  // Border
          style={styles.countryList}>
               <Flag
                 code={'a'}
                 size={45}
                 style={styles.flag}
               />
               </View>
        )}
        getItemLayout={(data,index)=>(
           {length: 48, offset: 48*index, index: index}
        )

        }
        renderItem={({ item, index }) => {
          return (
            
            <View  // Border
            renderToHardwareTextureAndroid={true}
            shouldRasterizeIOS={true}
          style={styles.countryList}>
               <Flag
                 code={this.props.countryList[index%this.props.countryList.length]}
                 size={45}
                 style={styles.flag}
               />
               </View>
          )
        }}
      />
  )
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
  componentWillUpdate(){
    console.log("callout")
  }
  shouldComponentUpdate(){
    return false;
  }
  imageLoaded() {
    this.forceUpdate()
  }
  render() {
    return (
      <View style={styles.card}>
        <Image
          source={this.props.marker.icon}
          style={styles.cardImage}
          onLoad={()=>{console.log("hi")}}
          
          />
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
  rouletteCenter:{
    width: 100,
    height: 100,
    backgroundColor: "#333232"
  },
  list:{left:-152,width:58,backgroundColor:'rgba(229, 229, 229,0.69)'},
  flag:{left:-0.516,top:-0.516},
  map: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    position: 'absolute'
  },
  rouletteStyle:{
    position: 'absolute',
    bottom: -120,
    backgroundColor:'rgba(236, 240, 241,0.69)'
  },
  rouletteItem:
  {
    width: 40,
    height: 40
  },
  rouletteBorder:{
    position: 'absolute',
    bottom: -127.5,
    width: 215,
    height: 215,
    borderRadius: 215 / 2,
    borderWidth: 10,
    borderColor: '#333232'
  },
  countryList://border
    {
      width: 48,
      backgroundColor:'#333232',
      height: 48,
      borderRadius: 48/2,
      borderWidth: 2,
      borderColor: '#333232',
      marginTop:1,
      marginBottom:1,
      marginLeft:4
    },
    square: {//countries border
      position:'absolute',
      width: 4,
      left:53,
      height: height,
      backgroundColor: '#333232',
      // zIndex:2
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
    top: 12,
    // zIndex: 10
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

// const dayStyle1 = [
//   {
//     "featureType": "administrative",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#6195a0"
//       }
//     ]
//   }, {
//     "featureType": "administrative.province",
//     "elementType": "geometry.stroke",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   }, {
//     "featureType": "landscape",
//     "elementType": "geometry",
//     "stylers": [
//       {
//         "lightness": "0"
//       }, {
//         "saturation": "0"
//       }, {
//         "color": "#f5f5f2"
//       }, {
//         "gamma": "1"
//       }
//     ]
//   }, {
//     "featureType": "landscape.man_made",
//     "elementType": "all",
//     "stylers": [
//       {
//         "lightness": "-3"
//       }, {
//         "gamma": "1.00"
//       }
//     ]
//   }, {
//     "featureType": "landscape.natural.terrain",
//     "elementType": "all",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   }, {
//     "featureType": "poi",
//     "elementType": "all",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   }, {
//     "featureType": "poi.park",
//     "elementType": "geometry.fill",
//     "stylers": [
//       {
//         "color": "#bae5ce"
//       }, {
//         "visibility": "on"
//       }
//     ]
//   }, {
//     "featureType": "road",
//     "elementType": "all",
//     "stylers": [
//       {
//         "saturation": -100
//       }, {
//         "lightness": 45
//       }, {
//         "visibility": "simplified"
//       }
//     ]
//   }, {
//     "featureType": "road.highway",
//     "elementType": "all",
//     "stylers": [
//       {
//         "visibility": "simplified"
//       }
//     ]
//   }, {
//     "featureType": "road.highway",
//     "elementType": "geometry.fill",
//     "stylers": [
//       {
//         "color": "#fac9a9"
//       }, {
//         "visibility": "simplified"
//       }
//     ]
//   }, {
//     "featureType": "road.highway",
//     "elementType": "labels.text",
//     "stylers": [
//       {
//         "color": "#4e4e4e"
//       }
//     ]
//   }, {
//     "featureType": "road.arterial",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#787878"
//       }
//     ]
//   }, {
//     "featureType": "road.arterial",
//     "elementType": "labels.icon",
//     "stylers": [
//       {
//         "visibility": "off"
//       }
//     ]
//   }, {
//     "featureType": "transit",
//     "elementType": "all",
//     "stylers": [
//       {
//         "visibility": "simplified"
//       }
//     ]
//   }, {
//     "featureType": "transit.station.airport",
//     "elementType": "labels.icon",
//     "stylers": [
//       {
//         "hue": "#0a00ff"
//       }, {
//         "saturation": "-77"
//       }, {
//         "gamma": "0.57"
//       }, {
//         "lightness": "0"
//       }
//     ]
//   }, {
//     "featureType": "transit.station.rail",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "color": "#43321e"
//       }
//     ]
//   }, {
//     "featureType": "transit.station.rail",
//     "elementType": "labels.icon",
//     "stylers": [
//       {
//         "hue": "#ff6c00"
//       }, {
//         "lightness": "4"
//       }, {
//         "gamma": "0.75"
//       }, {
//         "saturation": "-68"
//       }
//     ]
//   }, {
//     "featureType": "water",
//     "elementType": "all",
//     "stylers": [
//       {
//         "color": "#eaf6f8"
//       }, {
//         "visibility": "on"
//       }
//     ]
//   }, {
//     "featureType": "water",
//     "elementType": "geometry.fill",
//     "stylers": [
//       {
//         "color": "#c7eced"
//       }
//     ]
//   }, {
//     "featureType": "water",
//     "elementType": "labels.text.fill",
//     "stylers": [
//       {
//         "lightness": "-49"
//       }, {
//         "saturation": "-53"
//       }, {
//         "gamma": "0.79"
//       }
//     ]
//   }
// ]
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
