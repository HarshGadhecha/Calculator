import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class CalcDisplay extends React.Component {

    static defaultProps = {
        display: "",
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.display}>{this.props.display}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding:10
    },

display:{
    fontSize:70,
    textAlign:'right',
}

})