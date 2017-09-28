import React, {Component} from "react";
import {Animated, View} from "react-native";
import {styles} from "../styles";
import EndResult = Animated.EndResult;

const dotsColorRange = ["rgba(161, 172, 186, 0)", "rgba(161, 172, 186, 255)"];
export class Dots extends Component<IDotsProps, IDotsState> {

    componentWillMount(): void {
        this.setState({animationState: new Animated.Value(0)});
    }

    componentDidMount(): void {
        this.animate();
    }

    animate(): void {
        Animated.timing(
            this.state.animationState, {
                toValue: 1,
                duration: 1000
            })
            .start((result: EndResult) => {
                Animated.timing(
                    this.state.animationState, {
                        toValue: 0,
                        duration: 0
                    })
                    .start((result2: EndResult) => {
                        this.animate();
                    });
            });
    }

    render(): JSX.Element {

        const firstDot = this.state.animationState.interpolate({
            inputRange: [0, 0.33],
            outputRange: dotsColorRange
        });
        const secondDot = this.state.animationState.interpolate({
            inputRange: [0.33, 0.66],
            outputRange: dotsColorRange
        });
        const thirdDot = this.state.animationState.interpolate({
            inputRange: [0.66, 1],
            outputRange: dotsColorRange
        });

        return (
            <View style={styles.dots.container}>
                <Animated.View style={[styles.dots.dot, {backgroundColor: firstDot}]}/>
                <Animated.View style={[styles.dots.dot, {backgroundColor: secondDot}]}/>
                <Animated.View style={[styles.dots.dot, {backgroundColor: thirdDot}]}/>
            </View>
        );
    }

}

interface IDotsProps {
}

interface IDotsState {
    animationState: Animated.Value;
}
