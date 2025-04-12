import React from 'react';
import {Dimensions, Platform, StatusBar} from 'react-native';
// import { API_URL, IMAGE_URL } from "@env"
const {width, height} = Dimensions.get('window');
const iconPath = "../Assets/Icons/"


export const matrics = {
  screenWidth: width,
  screenHeight: height,
  screenAverage: (width + height) / 2,
  statusBarHeight: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  textBottomMargin: Platform.OS == 'android' ? 5 : 0,
  keyBoardBehavior: Platform.OS == 'android' ? 'height' : 'padding',
  containerHeight: height*30/100
};

export const Icons = {
  edit: require(iconPath+"edit.png"),
  delete: require(iconPath+"delete.png"),
  back:require(iconPath+"back.png")
 
}
