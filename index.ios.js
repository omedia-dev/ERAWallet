import './src/shim.js';
import {AppRegistry} from "react-native";
import {App} from "./build/App"

AppRegistry.registerComponent("datachan", () => App);