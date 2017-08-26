import React, {Component} from 'react';
import { Image } from 'react-native';
import * as flags from './assets/flags';

// type Props = {
//   size: 16 | 24 | 32 | 48 | 64,
//   code: string,
//   type?: 'flat' | 'shiny',
//   style?: any,
// };
class Flag extends React.Component{
  componentWillUpdate(){
    console.log("flagsUpdate")
  }
  shouldComponentUpdate(){
    return false;
  }
  render(){
    var { size, code, type, style }=this.props
     const flag = flags['png']['flags'][code]
     const unknownFlag = flags['png']['flags']['unknown'];
    return(
    <Image
    renderToHardwareTextureAndroid ={true}
    shouldRasterizeIOS ={true}
      source={flag || unknownFlag}
      style={[{ width: size, height: size }, style]}
    />

    )
  }


}
export default Flag;
