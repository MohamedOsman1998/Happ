import renderIf from './renderIf';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
const {width, height} = Dimensions.get("window");
const helperImages = {
    roulette: require('./assets/icons/png/roulette.png'),
    country: require('./assets/icons/png/country.png'),
    legend: require('./assets/icons/png/legend.png'),
}
export default class InfoConditionalView extends Component {
    shouldComponentUpdate() {
        console.log(this.refs.vlist, "f");
        return false;
    }
    render() {
        return (
            <View style={{position:"absolute"}}>
                <View style={ styles.screenCover }></View>
                <Image
                style={styles.roulette}
                source={helperImages.roulette}
                />
                <Image
                style={styles.country}
                source={helperImages.country}
                />
                <Image
                style={styles.legend}
                source={helperImages.legend}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    roulette:{
        position:"absolute",
        left:width/2-50,
        bottom:-height+100+0,
        width:100,
        height:100,
    },
    legend:{
        position:"absolute",
        left:width/2-10,
        bottom:-height+119+100,
        width:200,
        height:240,
    },
    country:{
        position:"absolute",
        left:width/2-125,
        bottom:-height/2-83/2,//do not do it like that instead justify center of parent and change relative position so it works with all layouts and sizes
        width:100,
        height:83,
    },
    screenCover: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        height,
        backgroundColor: 'rgba(236, 240, 241,0.5)',
    }
})