
require("../lib/swisscalc.lib.format.js");
require("../lib/swisscalc.lib.operator.js");
require("../lib/swisscalc.lib.operatorCache.js");
require("../lib/swisscalc.lib.shuntingYard.js");
require("../lib/swisscalc.display.numericDisplay.js");
require("../lib/swisscalc.display.memoryDisplay.js");
require("../lib/swisscalc.calc.calculator.js");

import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, PanResponder } from 'react-native';
import { CalcButton, CalcDisplay } from '../component/index.js';


export default class CalcScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "0",
        }
        this.oc = global.swisscalc.lib.operatorCache;
        this.calc = new global.swisscalc.calc.calculator();

        //pan responders
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt,gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt,gestureState) => true,
            onMoveShouldSetPanResponder: (evt,gestureState) => true,
            onMoveShouldSetPanResponder: (evt,gestureState) => true,
            onPanResponderRelease: (evt,gestureState) => {
                if (Math.abs(gestureState.dx) >= 50) {
                    this.onBackspacePress();
                }
            }
        })
    }
    //occurs when a digit is pressed...
    onDigitPress = (digit) => {
        this.calc.addDigit(digit);
        this.setState({ display: this.calc.getMainDisplay() })
    }
    //occurs when C is pressed...
    onClearPress = () => {
        this.calc.clear();
        this.setState({ display: this.calc.getMainDisplay() })
    }
    //on press backspace
    onBackspacePress = () => {
        this.calc.backspace();
        this.setState({ display: this.calc.getMainDisplay() })
    }
    //occures when = is pressed
    onEqualPress = () => {
        this.calc.equalsPressed();
        this.setState({ display: this.calc.getMainDisplay() })
    }
    //occures when +/- is pressed
    onPlusMinus = () => {
        this.calc.negate();
        this.setState({ display: this.calc.getMainDisplay() })
    }
    //occures when + - / X  is pressed
    onBinaryOperator = (operator) => {
        this.calc.addBinaryOperator(operator);
        this.setState({ display: this.calc.getMainDisplay() })

    }

    onUnaryOperatorPressed = (operator) => {
        this.calc.addUnaryOperator(operator);
        this.setState({ display: this.calc.getMainDisplay() })
    }
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.displayContainer}{...this.panResponder.panHandlers}>
                    <CalcDisplay display={this.state.display} />
                </View>

                <View>

                    <View style={styles.btnRow}>
                        <CalcButton onPress={this.onClearPress} title="C" backGroundColor="#003c8f" color="white" />
                        <CalcButton onPress={this.onPlusMinus} title="+/-" backGroundColor="#003c8f" color="white" />
                        <CalcButton onPress={() => this.onUnaryOperatorPressed(this.oc.PercentOperator)} title="%" backGroundColor="#003c8f" color="white"/>
                        <CalcButton onPress={() => { this.onBinaryOperator(this.oc.DivisionOperator) }} title="/" backGroundColor="#003c8f" color="white" />

                    </View>
                    <View style={styles.btnRow}>
                        <CalcButton onPress={() => { this.onDigitPress("7") }} title="7" backGroundColor="#ccc" color="black" />
                        <CalcButton onPress={() => { this.onDigitPress("8") }} title="8" backGroundColor="#ccc" color="black" />
                        <CalcButton onPress={() => { this.onDigitPress("9") }} title="9" backGroundColor="#ccc" color="black" />
                        <CalcButton onPress={() => { this.onBinaryOperator(this.oc.MultiplicationOperator) }} title="X" backGroundColor="#003c8f" color="white" />
                    </View>

                    <View style={styles.btnRow}>
                        <CalcButton onPress={() => { this.onDigitPress("4") }} title="4" backGroundColor="#ccc" color="black" />
                        <CalcButton onPress={() => { this.onDigitPress("5") }} title="5" backGroundColor="#ccc" color="black" />
                        <CalcButton onPress={() => { this.onDigitPress("6") }} title="6" backGroundColor="#ccc" color="black" />
                        <CalcButton onPress={() => { this.onBinaryOperator(this.oc.SubtractionOperator) }} title="-" backGroundColor="#003c8f" color="white" />
                    </View>

                    <View style={styles.btnRow}>
                        <CalcButton onPress={() => { this.onDigitPress("1") }} title="1" backGroundColor="#ccc" color="black" />
                        <CalcButton onPress={() => { this.onDigitPress("2") }} title="2" backGroundColor="#ccc" color="black" />
                        <CalcButton onPress={() => { this.onDigitPress("3") }} title="3" backGroundColor="#ccc" color="black" />
                        <CalcButton onPress={() => { this.onBinaryOperator(this.oc.AdditionalOperator) }} title="+" backGroundColor="#003c8f" color="white" />
                    </View>

                    <View style={styles.btnRow}>
                        <CalcButton onPress={() => { this.onDigitPress("0") }} title="0" backGroundColor="#ccc" color="black" style={{ flex: 2, marginRight: 1 }} />
                        <CalcButton onPress={() => { this.onDigitPress(".") }} title="." backGroundColor="#ccc" color="black" style={{ marginRight: 0.8 }} />
                        <CalcButton onPress={this.onEqualPress} title="=" backGroundColor="#003c8f" color="white" />

                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    displayContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 0.5,
    },
})