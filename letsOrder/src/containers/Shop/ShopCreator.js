import React from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  Dimensions,
  View,
  Button,
  TabBarIOS,
} from 'react-native';
import { TabNavigator, StackNavigator, TabBarTop, createNavigationContainer, createNavigator, TabRouter } from 'react-navigation';
import TabMenuItems from '../Menus/TabMenuItems';
import TestPage from './TestPage';

const { width, height } = Dimensions.get('window');

const ShopCreator = ({ categories, props, addItem }) => {
  const categoryStack = {};

  const routes = {};

  console.log('Shop creator !');

  categories.forEach((category) => {
    if (category.products.length > 0) {
      const { catname } = category.name;

      if (category.name != undefined) {
        routes[category.name] = {
          screen: StackNavigator({
            isim: {
              screen: TestPage,
            },
          }, {
            headerMode: 'none',
            initialRouteParams: {
              categoryName: category.name,
              products: category.products,
              screenProps: props.screenProps,
              addItem,
            },
          }),
        };
      }
    } else {
      console.log('This category has no products !');
    }
  });

  const ShopCatTabNav = TabNavigator(routes, {
    tabBarPosition: 'top',
    swipeEnabled: true,
    lazy: true,
    tabBarOptions: {
      scrollEnabled: true,
      showLabel: true,
      showIcon: true,
      tabStyle: {
        backgroundColor: 'pink',
        width: Object.keys(routes).length > 4 ? width / 4 : width / Object.keys(routes).length,
        height: height / 12,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
      labelStyle: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
      },
      indicatorStyle: {
        backgroundColor: 'teal',
      },
      allowFontScaling: true,
      upperCaseLabel: true,
    },
    tabBarComponent: TabBarTop,
  });

  return <ShopCatTabNav />;
};


export default ShopCreator;
