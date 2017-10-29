import React, {Component, PropTypes, Children} from 'react';
import {View, Animated,Dimensions, PanResponder, StyleSheet, Easing} from 'react-native';

import RouletteItem from './RouletteItem';
 let {height, width} = Dimensions.get('window');
 let temp=0;
 if(width>height){
  temp=width;
  width=height;
  height=temp;
  }
 class Roulette extends Component {

  constructor(props) {
    if(width>height){
      temp=width;
      width=height;
      height=temp;
      }
    super(props);
    this.state = {
      isReleased:true,
      _animatedValue: new Animated.Value(0),
      // activeItem: 0,
    };
    this.gestureVars={
      gestureActive:false,
      gestureOffset:0,
    }
    const animationFun = Animated.event([
      null, {
        moveX: this.state._animatedValue
      }
    ])
    this.step = props.step || (2 * Math.PI) / props.children.length;

    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (n, arg) => {
        arg.moveX= (this.gestureVars.gestureOffset +arg.moveX)/(width/2) //TODO:change to a value that depends on teh screen
        animationFun(n, arg)
      },
       onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started.
        // gestureState.d{x,y} will be set to zero now
          // console.log("grans")
          const {children} = this.props;

          // let prevActiveItem=this.state.activeItem-1<1?children.length:this.state.activeItem-1;

          // this.gestureVars.gestureOffset=prevActiveItem*width/2-gestureState.moveX
          this.gestureVars.gestureOffset=this.state._animatedValue._value*width/2-gestureState.moveX;
          this.setState({isReleased:false},()=>{
            this.state._animatedValue.stopAnimation()
          })

          // console.log(this,width)
      },
      onPanResponderRelease: (evt, gestureState) => {
        const {enableUserRotate, handlerOfRotate} = this.props;
        if (enableUserRotate) {
          let nextItem ;
          const {children} = this.props;
          // const {activeItem} = this.state;//dont need activeItem anymore
          const sign=gestureState.vx>0?1:-1;
          // console.log(gestureState.vx)
          gestureState.vx=Math.abs(gestureState.vx)
          this.setState({isReleased:true})

          if(gestureState.vx<0.4){
            // console.log("first")
             nextItem=Math.round(this.state._animatedValue._value);
            Animated.spring(this.state._animatedValue, {
              toValue: nextItem,
              speed:18,
              bounciness:19,
            },).start();

          }else if(gestureState.vx<1.3){
          //   console.log("sec")
          //  console.log(this.state._animatedValue._value%children.length+(gestureState.vx*6)*sign)

             nextItem=Math.round(this.state._animatedValue._value+(gestureState.vx*6)*sign);
            Animated.timing(this.state._animatedValue, {
              toValue: nextItem,
              duration:3000,
              easing: Easing.out(Easing.exp),
            },).start(()=>{if(this.state.isReleased)this.props.onRouletteEnd&&this.props.onRouletteEnd()});

          }else {
            nextItem = Math.round(this.state._animatedValue._value + (gestureState.vx*13)*sign );//make this dependant on velocity and do direction and ignore small dx's
          //  console.log("last")
          //  console.log((gestureState.vx))

          // this
          //   .state//becoz it might be out of range becoz of prev anim
          //   ._animatedValue
          //   .setValue(activeItem);
          Animated.timing(this.state._animatedValue, {
            toValue: nextItem,
            duration:gestureState.vx*3100>9000?9000:gestureState.vx*3100,
            easing: Easing.out(Easing.poly(3)),
            //  useNativeDriver: true, //try this
          },).start(()=>{if(this.state.isReleased)this.props.onRouletteEnd&&this.props.onRouletteEnd()});

        }
        // console.log(nextItem,this.state._animatedValue._value)
      //     const newActiveItem = (nextItem % children.length)+1
      //  handlerOfRotate(children[children.length - newActiveItem].props);
        }
      }
    });
  }

  componentWillUpdate(){
    // console.log("rouletteUpdated")
  }
  shouldComponentUpdate(){
    return false;
  }

  getCenterCoordinates({x, y, width, height}) {
    this.setState({
      centerX: x + (width / 2),
      centerY: y + (height / 2)
    });
  }

  renderDefaultCenter() {
    const {radius, customCenterStyle} = this.props;

    return (<View
      style={[
      styles.center, {
        width: radius / 10,
        height: radius / 10,
        borderRadius: radius
      },
      customCenterStyle
    ]}
      onLayout={(event) => this.getCenterCoordinates(event.nativeEvent.layout)}/>);
  }

  render() {
    const {
      children,
      radius,
      distance,
      renderCenter,
      customStyle,
      rouletteRotate
    } = this.props;

    const interpolatedRotateAnimation = this
      .state
      ._animatedValue
      .interpolate({
        inputRange: [
          0, children.length
        ],
        outputRange: [
          `${rouletteRotate}deg`, `${ 360 + rouletteRotate}deg`
        ]
      });

    return (
      <Animated.View
      renderToHardwareTextureAndroid
      shouldRasterizeIOS
        {...this.panResponder.panHandlers}
        style={[
        styles.container, {
          width: radius,
          height: radius,
          borderRadius: radius / 2
        }, {
          transform: [
            {
              rotate: interpolatedRotateAnimation
            }
          ]
        },
        customStyle
      ]}>
        {Children.map(children, (child, index) => (<RouletteItem
          item={child}
          index={index}
          radius={radius}
          step={this.step}
          distance={distance}
          rouletteRotate={rouletteRotate}/>))}
        {renderCenter() || this.renderDefaultCenter()}
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: {
    backgroundColor: 'gray'
  }
});

Roulette.propTypes = {
  step: PropTypes.number,
  radius: PropTypes.number,
  distance: PropTypes.number,
  rouletteRotate: PropTypes.number,
  enableUserRotate: PropTypes.bool,
  children: PropTypes.array,
  renderCenter: PropTypes.func,
  handlerOfRotate: PropTypes.func,
  customStyle: PropTypes.any,
  customCenterStyle: PropTypes.any
};

Roulette.defaultProps = {
  radius: 300,
  distance: 100,
  rouletteRotate: 0,
  enableUserRotate: false,
  renderCenter: () => {},
  handlerOfRotate: () => {}
};

export default Roulette;
