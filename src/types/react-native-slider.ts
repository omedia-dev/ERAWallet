declare module "react-native-slider" {
    import {ImageURISource, ViewStyle} from "react-native";
    import {Component} from "react";

    export default class Slider extends Component<ISliderProps, {}> {

    }

    interface ISliderProps {
        /**
         * Initial value of the slider
         * @default 0
         */
        value?: number;
        /**
         * If true the user won't be able to move the slider
         * @default false
         */
        disabled?: boolean;
        /**
         * Initial minimum value of the slider
         * @default 0
         */
        minimumValue?: number;
        /**
         * Initial maximum value of the slider
         * @default 1
         */
        maximumValue?: number;
        /**
         * Step value of the slider. The value should be between 0 and maximumValue - minimumValue)
         * @default 0
         */
        step?: number;
        /**
         * The color used for the track to the left of the button
         * @default '#3f3f3f'
         */
        minimumTrackTintColor?: string;
        /**
         * The color used for the track to the right of the button
         * @default '#b3b3b3'
         */
        maximumTrackTintColor?: string;
        /**
         * The color used for the thumb
         * @default '#343434'
         */
        thumbTintColor?: string;
        /**
         * The size of the touch area that allows moving the thumb. The touch area has the same center as the visible thumb. This allows to have a visually small thumb while still allowing the user to move it easily.
         * @default {width: 40, height: 40}
         */
        thumbTouchSize?: object;
        /**
         * Callback continuously called while the user is dragging the slider
         */
        onValueChange?: (value: number) => void;
        /**
         * Callback called when the user starts changing the value (e.g. when the slider is pressed)
         */
        onSlidingStart?: () => void;
        /**
         * Callback called when the user finishes changing the value (e.g. when the slider is released)
         */
        onSlidingComplete?: (value: number) => void;
        /**
         * The style applied to the slider container
         */
        style?: ViewStyle;
        /**
         * The style applied to the track
         */
        trackStyle?: ViewStyle;
        /**
         * The style applied to the thumb
         */
        thumbStyle?: ViewStyle;
        /**
         * Sets an image for the thumb.
         */
        thumbImage?: ImageURISource;
        /**
         * Set this to true to visually see the thumb touch rect in green.
         * @default false
         */
        debugTouchArea?: boolean;
        /**
         * Set to true if you want to use the default 'spring' animation
         * @default false
         */
        animateTransitions?: boolean;
        /**
         * Set to 'spring' or 'timing' to use one of those two types of animations with the default animation properties.
         * @default 'timing'
         */
        animationType?: string;
        /**
         * Used to configure the animation parameters. These are the same parameters in the Animated library.
         * @default undefined
         */
        animationConfig?: object;
    }
}
