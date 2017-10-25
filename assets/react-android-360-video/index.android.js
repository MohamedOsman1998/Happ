/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import CVrVideoView from './VrVideo360';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class VrVideoComponent extends Component {
  render() {
    return (
      <View style={styles.container}>

        <CVrVideoView
          style={{height:300,width:300,backgroundColor:'#000000'}}
          video={{ uri:'https://d2v9y0dukr6mq2.cloudfront.net/video/preview/eG7t61g/underwater-coral-reef-360-vr_S94kBUa0__WM.mp4',
                   type: 'stereo'}}
          displayMode={'fullscreen'}
          volume={1.0}
          enableFullscreenButton={true}
          enableCardboardButton={true}
          enableTouchTracking={true}
          hidesTransitionView={false}
          enableInfoButton={true} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('VrVideoComponent', () => VrVideoComponent);
