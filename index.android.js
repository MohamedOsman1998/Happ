import React, {Component} from 'react';
import Roulette from './Roulette';
import {HireAppApi} from './constants/api';
import renderIf from './renderIf';
import {dayStyle} from './mapStyles';
import InfoConditionalView from './InfoConditionalView.js'

const hireAppApi = new HireAppApi();
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
  InteractionManager,
  VirtualizedList,
  Image,
  WebView,
  Modal,
  BackHandler,
  TouchableOpacity,
  Dimensions
} from 'react-native';


import MapView from 'react-native-maps';
import Flag from './Flag.js'
import SplashScreen from './SplashScreen.js'
import VrVideoComponent from './assets/react-android-360-video/VrVideo360';
import Video from 'react-native-video'
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';

const TimerMixin = require('react-timer-mixin');



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
let {width, height } = Dimensions.get("window");
let temp=0;

if(width>height){
temp=width;
width=height;
height=temp;
}
const rightArrow=require("./assets/icons/png/right_arrow.png");
const leftArrow=require("./assets/icons/png/left-arrow.png")
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


const marker1 = {
  id: 0,
  latlng: {
    latitude: 2.945895,
    longitude: 101.870711
  },
  title: "University Of Nottingham",
  description: "The university Of nottingham in malaysia",
  icon: Images[0],
}

const marker2 = {
  id: 1,
  latlng: {
    latitude: 2.917252,
    longitude: 101.862546
  },
  title: "Tesco Seminyih",
  description: "The university Of nottingham in malaysia",
  icon: Images[1],
}
const marker3 = {
  id: 2,
  latlng: {
    latitude: 2.945869,
    longitude: 101.852815
  },
  title: "Club",
  description: "The university Of nottingham in malaysia",
  icon: Images[2],
}

let _mapView: MapView;

export default class App extends React.Component {

  static defaultProps = {
    hireAppApi
  }


  constructor(props) {

    Orientation.lockToPortrait();

    if(width>height){
      temp=width;
      width=height;
      height=temp;
      }
      // console.log("h",height,"w",width );
    super(props);
    this.state = {
      modalVisible: false,
      videoVisible:false,
      splash: true,
      preSplash:true,
      videoLoading:false,
      mapStyle:         dayStyle,
      markers: [marker1, marker2, marker3],
      // loading: false,
    };
    this.onRegionChange = this
      .onRegionChange
      .bind(this);
  }


  onRegionChange(region) {
    if (region.latitudeDelta > 0.2) {
      this.setState({markers:[marker1, marker2]})
    } else {
      this.setState({markers:[marker1, marker2,marker3]})
    }
  }
  async componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', ()=>false);
  }
  async componentDidMount() {
    setTimeout(()=>{
      this.setState({preSplash:false})
    }, 200);

    setTimeout(()=>{
      this.setState({splash:false})
    }, 2000);

  }
  render() {
        if(this.state.preSplash){
      return(
        // <View style={styles.container}/>
        <SplashScreen start={1000}/>
      )
    }

    return (

      <View style={styles.container}>
          {/* hardwareAccelerated
          transparent
          onRequestClose={()=>{this.setState({splash:false})}}
          visible={this.state.splash}
          animationType="fade" */}
          {renderIf(this.state.splash,
          <View style={{position:"absolute",width,height,zIndex:100}} >
          <SplashScreen/>
          </View>)}
          {renderIf(this.state.videoLoading,
              <View style={{position:"absolute",left:0,top:0,width:height*width,height:width*height,backgroundColor:'rgba(71, 71, 71,1)',zIndex:1001}} />
            )
          }
        <MapView
        ref={(mapView) => { _mapView = mapView; }}
          showsCompass={false}
          style={styles.map}
          onRegionChangeComplete={this.onRegionChange}
          customMapStyle={this.state.mapStyle}
          initialRegion={{
        latitude: 2.945895,
        longitude: 101.870711,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
          rotateEnabled={false}>

          {this
            .state
            .markers
            .map((marker,id) => (
              <MapView.Marker //TODO: create custom view for marker to make the width and height consistent on all resolutions
                key={marker.id} coordinate={marker.latlng} title={marker.title}  description={marker.description}>
                <Image ref="icon" source={id?tetrisBlocks.z:tetrisBlocks.b}style={{width:40,height:40}}/>
                <MapView.Callout
                onPress={()=>{

                  this.setState({videoLoading:true},()=>{
                    this.setState({videoVisible:true},()=>{
                      Orientation.lockToLandscapeLeft();

                    })
                  })
                }}
                style={{width:250,height:200}}>
                  <CustomCallout marker={marker}style={{width:250,height:200}}/>
                </MapView.Callout>
              </MapView.Marker>

))}
        </MapView>
        <TouchableOpacity style={styles.searchIconWrapper}
          onPress={()=>{this.setState({modalVisible:!this.state.modalVisible})}}>
          <Image style={styles.searchIcon} source={require("./assets/icons/png/info.png")}/>
        </TouchableOpacity>

          <LoopingListView countryList={countryList}/>

            <Modal
          animationType="fade"
          hardwareAccelerated
          transparent
          onRequestClose={()=>{this.setState({modalVisible:false})}}
          visible={this.state.modalVisible}
          >
                    <InfoConditionalView fn={()=>{this.setState({modalVisible:false})}}style={{position:"absolute"}}/>
          <TouchableOpacity style={styles.searchIconWrapper}
          onPress={()=>{this.setState({modalVisible:!this.state.modalVisible})}}>
          <Image style={styles.searchIcon} source={require("./assets/icons/png/info.png")}/>
          </TouchableOpacity>
            </Modal>

            <Modal
          animationType="fade"
          hardwareAccelerated
          transparent={false}
          onRequestClose={()=>{
            Orientation.lockToPortrait();

            this.setState({videoVisible:false});
          }}
          visible={this.state.videoVisible}
          >
          {renderIf(this.state.videoLoading,
              <View style={{position:"absolute",left:0,top:0,width:height,height:width,backgroundColor:'rgba(71, 71, 71,1)',zIndex:1001,justifyContent:"center",alignContent:"center"}} >
              <Text style={{fontFamily:"MontserratAlternates-ExtraLight",color:'white',fontSize:35,alignSelf:"center"}}>Loading</Text>
              </View>
            )
          }
            <ScrollView
            ref="videoScrollView"
            scrollEnabled={false}
            contentContainerStyle={styles.screenCover}
            horizontal>
        <View style={{marginLeft:15}}>
        <TouchableOpacity
          onPress={()=>{
            this.player.setNativeProps({volume:0});
            this.refs.videoScrollView.scrollToEnd({animated:true})}}
                  style={{
                  width:30,
                  height:47,
                  position:"absolute",
                  alignSelf:"center",
                  top:width*0.42-28,
                  left:0.92*height}}
                  >
                  <Image
                    style={{ width:30,height:47}}
                    source={rightArrow}
                  />
                  </TouchableOpacity>

          <Video style={{top:-0.027*width,height:width*0.868,width:height*0.90,backgroundColor:'#000'}}
          source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}   // Can be a URL or a local file.
        ref={(ref) => {
          this.player = ref
        }}                                      // Store reference
        rate={1.0}                              // 0 is paused, 1 is normal.
        volume={1.0}                            // 0 is muted, 1 is normal.
        muted={false}                           // Mutes the audio entirely.
        onProgress={(t)=>{
          // console.log(t)
          if(this.state.videoLoading&&t.currentTime>0.2)this.setState({videoLoading:false})
        }}
        paused={false}                          // Pauses playback entirely.
        resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
        onEnd={()=>{
          this.player.seek(0);
          // console.log(this.refs);

          // this.player.seek(0);
          this.refs.videoScrollView.scrollToEnd({animated: true})}}
        repeat={false}                          // Repeat forever.
        playInBackground={false}                // Audio continues to play when app entering background.
        playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
        ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
        />
          </View>

        <View style={{marginRight:15}}>

        <TouchableOpacity
        onPress={()=>{
            this.player.setNativeProps({volume:1});
            this.refs.videoScrollView.scrollTo({x: 0.0, y: 0.0, animated: true})
          this.player.seek(0);
        }}

          style={{width:30,height:47,position:"absolute",left:-0.068*height,top:width*0.42-28,}}
        >
        <Image source={leftArrow}
          style={{ width:30,height:47}}
        />
        </TouchableOpacity>
            <VrVideoComponent
          style={{top:-0.0315*width,height:width*0.868,width:height*0.90,backgroundColor:'#000'}}
          video={{ uri:'https://d2v9y0dukr6mq2.cloudfront.net/video/preview/eG7t61g/underwater-coral-reef-360-vr_S94kBUa0__WM.mp4',
          type: 'stereo'}}
          displayMode={'embedded'}
          volume={1.0}
          enableFullscreenButton={false}
          enableCardboardButton={false}
          enableTouchTracking
          hidesTransitionView={false}
        enableInfoButton={false} />
          </View>

        </ScrollView>
        <TouchableOpacity
          style={{position:"absolute",left:height-44,top:7,width:37,height:37}}
          onPress={()=>{
            Orientation.lockToPortrait();
            this.setState({videoVisible:false})}}>
            <Image style={{width:37,height:37}} source={require("./assets/icons/png/004-cross-button-1.png")}/>
          </TouchableOpacity>
            </Modal>

          <View style={styles.square} />


        <View  //Roulette Border
          style={styles.rouletteBorder}/>

        <Roulette

          customStyle={styles.rouletteStyle}
          customCenterStyle={styles.rouletteCenter}
          rouletteRotate={30}
          enableUserRotate
          onRouletteEnd={()=>{
            _mapView.animateToRegion({
                  latitude: 2.945895,
                  longitude: 101.870711,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
              },1460)
          }}
          radius={200}
          distance={73}>

          {Object
            .keys(tetrisBlocks)
            .map(key => (
              <TouchableOpacity key={key}
              delayPressIn={20}
              delayPRessOut={20}//remove this
              pressRetentionOffset={{top: 100, left: 100, bottom: 100, right: 100}}
              hitSlop={{top: 100, left: 100, bottom: 100, right: 100}}//remove
              onPress={()=>{
              const handle = InteractionManager.createInteractionHandle()
              _mapView.animateToRegion({
                  latitude: 2.945895,
                  longitude: 101.870711,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
              },1460)
              setTimeout(()=>{
              InteractionManager.clearInteractionHandle(handle)
              },610)
              }}>
                <Image
                  style={styles.rouletteItem}
                  source={tetrisBlocks[key]}
                  />
              </TouchableOpacity>
            ))}

        </Roulette>
        <TouchableOpacity
        style={{
          width: 43,
          height: 43,
          position: 'absolute',
          bottom: 0
        }}
        onPress={()=>{
              const handle = InteractionManager.createInteractionHandle()
              _mapView.animateToRegion({
        latitude: 2.945895,
        longitude: 101.870711,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },1460)}}
        >
        <Image
          source={require('./assets/icons/png/selector.png')}
          style={{
          width: 43,
          height: 43,
          position: 'absolute',
          bottom: 0
        }}/>
      </TouchableOpacity>

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

let scrollFlagBottom=false
let scrollFlagTop=false;
class LoopingListView extends React.Component{
  constructor(props){
    super(props)
    this.props=props;

  }
   getItem (data, index) {
    return data.getElementAtIndex(index)
  }
  componentWillUpdate(){
    // console.log("list")
  }
  shouldComponentUpdate(){
    return false;
  }
    getItemCount (data){
    return 200
  }

render(){

  return (
    <VirtualizedList
        ref="vList"
        data={data}
        style={styles.list}

        initialNumToRender={200}
        windowSize={200}
        maxToRenderPerBatch={200}
        getItemCount={this.getItemCount}
        getItem={this.getItem}
        onScroll={(e)=>{
          {/* console.log(scrollFlagBottom,"top",scrollFlagTop) */}
          if(e.nativeEvent.contentOffset.y>9350){
          {/* console.log("bottom") */}
          scrollFlagBottom=true;
            this.refs.vList.scrollToIndex({index:3,viewPosition:0,animated:false})
            setTimeout(()=>{scrollFlagBottom=false},350)
          }else if(e.nativeEvent.contentOffset.y<100&&!scrollFlagTop){
          {/* console.log("top") */}
          scrollFlagTop=true;
            this.refs.vList.scrollToIndex({index:197,viewPosition:1,animated:false})
            setTimeout(()=>{scrollFlagTop=false},350)
          }
        }}
        updateCellsBatchingPeriod={100}
        initialScrollIndex={1}
        keyExtractor={(item, index) => index}
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
           {length: 48, offset: 48*index, index}
        )

        }
        renderItem={({ item, index }) => (
            <TouchableOpacity
            onPress={()=>{
              const handle = InteractionManager.createInteractionHandle()
              _mapView.animateToRegion({latitude:26.820553,longitude:30.802498,latitudeDelta:9.9,longitudeDelta:9.9},1460)
              setTimeout(()=>{
              InteractionManager.clearInteractionHandle(handle)
              },1460)
              }}>
                <View  // Border
            renderToHardwareTextureAndroid
            shouldRasterizeIOS
          style={styles.countryList}>
                <Flag
                    code={this.props.countryList[index%this.props.countryList.length]}
                    size={45}
                    style={styles.flag}
                />
                  </View>
                </TouchableOpacity>
          )}
      />
  )
}
}
class CustomCallout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentWillUpdate(){

  }
  // shouldComponentUpdate(){
  //   console.log(arguments)
  // }
  // async  getImage() {
  //   try {
  //     let response = await fetch(this.props.marker.icon.uri);
  //     console.log(response);
  //     return response;
  //   } catch(error) {
  //     console.error(error);
  //   }
  // }
    componentDidMount(){
      // require( {
      //   uri: "http://www.customwebsitevideo.com/images/prosbo_hires.jpg"
      // })
  }

  render() {
    // if(this.state.loading){
    //   return(
    //     <Text>image is loading</Text>
    //   )

    // }else
    return (
      <View style={styles.card}>
        <WebView
        startInLoadingState
          source={this.props.marker.icon}
          style={styles.cardImage}
          onLoadEnd={()=>{()=>{}
          }}
          onLoadStart={()=>(console.log("started"))}
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
    backgroundColor: '#212121',
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
  screenCover:{
    position: 'absolute',top: 0,left: 0,width:height*2.17,height:width,backgroundColor: 'rgba(71, 71, 71,1)',alignItems:'center',alignContent:'center',alignSelf:'center',justifyContent:'space-between'
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
      height,
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
    width: 150,
    height:250,
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

AppRegistry.registerComponent('hireProject', () => App);
