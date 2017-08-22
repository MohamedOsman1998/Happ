import React, {Component, PropTypes, Children} from 'react';
import {View, Animated,Dimensions, PanResponder, StyleSheet, Easing} from 'react-native';

import RouletteItem from './RouletteItem';
 var {height, width} = Dimensions.get('window');
 class Roulette extends Component {

  constructor(props) {
    super(props);
    this.state = {
      _animatedValue: new Animated.Value(0),
      activeItem: 0,
    };
    this.gestureVars={
      gestureActive:false,
      gestureOffset:0,
    }
    let animationFun = Animated.event([
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
        console.log("grans")
          const {children} = this.props;

          // let prevActiveItem=this.state.activeItem-1<1?children.length:this.state.activeItem-1;

          // this.gestureVars.gestureOffset=prevActiveItem*width/2-gestureState.moveX
          this.gestureVars.gestureOffset=this.state._animatedValue._value*width/2-gestureState.moveX;
          this.state._animatedValue.stopAnimation()
          
          // console.log(this,width)
      },
      onPanResponderRelease: (evt, gestureState) => {
        const {enableUserRotate, handlerOfRotate} = this.props;
        console.log(gestureState,gestureState.vx);
        if (enableUserRotate) {
          const {children} = this.props;
          const {activeItem} = this.state;//dont need activeItem anymore
          const nextItem = Math.round(this.state._animatedValue._value) + 20;//make this dependant on velocity and do direction and ignore small dx's
          
          // this
          //   .state//becoz it might be out of range becoz of prev anim 
          //   ._animatedValue
          //   .setValue(activeItem);
          Animated.timing(this.state._animatedValue, {
            toValue: nextItem,
            duration:5000,
            easing: Easing.out(Easing.exp),
            //  useNativeDriver: true, //try this
          },).start();

          const newActiveItem = (nextItem % children.length)+1

          // console.log(newActiveItem)

          this.setState({
            activeItem: newActiveItem
          }, () => handlerOfRotate(children[children.length - newActiveItem].props));
        }
      }
    });
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
        {Children.map(children, (child, index) => <RouletteItem
          item={child}
          index={index}
          radius={radius}
          step={this.step}
          distance={distance}
          rouletteRotate={rouletteRotate}/>)}
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
