import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const width=Dimensions.get('window').width;

class CalcButton extends React.Component {
static defaultProps={

    onPress:function(){},
    title:"",
    color:'white',
    backgroundColor:"black",
}

    render() {
        var bc = this.props.backGroundColor;
        return (
            <TouchableOpacity onPress={this.props.onPress} 
            style={{...Styles.container,backgroundColor:bc,...this.props.style}}>
                <Text style={{...Styles.text,color:this.props.color}}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

export default CalcButton;

const Styles=StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        height:75,
        width:width/4-0.5,
        borderWidth:0.1

    },
    text:{
        fontSize:18,
        fontWeight:'bold'
    }
})