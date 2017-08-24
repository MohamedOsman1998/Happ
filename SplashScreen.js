import React from 'react';
import { Animated,StyleSheet,Dimensions ,Text,Image,View} from 'react-native';
import Animation from 'lottie-react-native';

const {width, height} = Dimensions.get("window");

export default class splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
      loading:new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 2500,
    }).start(()=>{
      this.state.progress.setValue(0)
      Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 2500,
    }).start()});
    
    // this.i=-1;
    // this.loadingFun=()=>{
    //     this.state.loading.setValue(0)
    //     this.i++
    //       Animated.timing(this.state.loading, {
    //     toValue: 1,
    //     duration: 2500,
    //   }).start(this.i<0?this.loadingFun:()=>{})}
    //   this.loadingFun()

    Animated.timing(this.state.loading, {
        toValue: 1,
        duration: 2500,
      }).start(()=>{
        this.state.loading.setValue(0)
          Animated.timing(this.state.loading, {
        toValue: 1,
        duration: 2500,
      }).start(()=>{
        this.state.loading.setValue(0)
          Animated.timing(this.state.loading, {
        toValue: 1,
        duration: 2500,
      }).start(()=>{
        this.state.loading.setValue(0)
          Animated.timing(this.state.loading, {
        toValue: 1,
        duration: 2500,
      }).start()})})});
  }

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.textWrapper}>
                <Text style={styles.text}>App Name</Text>
            </View>
        <View style={styles.appIconBackground}    />
            <Image style={styles.appIcon}
                source={require('./assets/icons/icon2.png')}/>
      <Animation
        style={{
          width: 100,
          height: 100,
            position:'absolute',
            bottom:10,
            right:130
        }}
        source={require('./assets/animations/location.json')}
        progress={this.state.progress}
      />
      <Animation
        style={{
          width: 100,
          height: 100,
            position:'absolute',
            bottom:80,
            right:130
        }}
        source={require('./assets/animations/preloader.json')}
        progress={this.state.loading}
      />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    width:width,
    height:height,
    backgroundColor:'#212121',
  },
  text:{
      fontWeight:'bold',
      color:'white',
      fontSize:35,
  },
  textWrapper:{
    position:'absolute',
    bottom:370,
    right:100
  },
  appIcon:{
      position:'absolute',
      right:130,
      width:100,
      height:100,
      bottom: 240
  },
  appIconBackground:{
    width:90,
    height:90,
    borderRadius:90/2,
    borderWidth:49,
    borderColor:'#ffffff',
    position:'absolute',
    bottom: 241,
      right:131,
},
// appIconBackground:{
//     width:102,
//     height:102,
//     borderRadius:102/2,
//     borderWidth:102/2,
//     borderColor:'#ffffff',
//     position:'absolute',
//     bottom: 239,
//       right:129,
// }
})