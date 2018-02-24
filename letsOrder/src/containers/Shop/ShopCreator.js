import React from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    Dimensions,
    View
} from 'react-native';
import { TabNavigator, StackNavigator, TabBarTop } from 'react-navigation';
import ProductPage from '../Product/ProductPage';
import TabMenuItems from '../Menus/TabMenuItems';
const { width, height } = Dimensions.get('window');


export const ShopCreator = ({ categories, props, addItemToCart }) => {

    // This script will create a TabNavigator for categories and StackNavigators for each member of the categories !

    let categoryStack = {};

    let routes = {};

    console.log("Shop creator !");

    categories.forEach((category) => {

        if (category.products.length > 0) {

            const { catname } = category.name;

            if (category.name != undefined) {

                routes[category.name] = {
                    screen: StackNavigator({
                        'isim': {
                            screen: ProductPage
                        }
                    },{
                        headerMode : 'none',
                        initialRouteParams : {
                            categoryName : category.name,
                            products : category.products,
                            screenProps : props.screenProps,
                            addItemToCart : addItemToCart
                        }
                    })
                }
            }
            
        } else {

            console.log("This category has no products !");

        }

    });

    console.log("kupa : "+Object.keys(routes).length);

    const ShopCatTabNav = TabNavigator(routes, {
        tabBarPosition: 'top',
        swipeEnabled : true,
        lazy : true,
        tabBarOptions : {
            scrollEnabled : true,
            showLabel : true,
            showIcon : true,
            tabStyle : {
                backgroundColor : 'pink',
                width : Object.keys(routes).length > 4 ? width / 4 : width / Object.keys(routes).length ,
                height : height / 12,
                alignContent : 'center',
                justifyContent : 'center',
                alignItems : 'center'
            },
            labelStyle : {
                textAlign : 'center',
                fontSize : 12,
                fontWeight : 'bold',
            },
            indicatorStyle : {
                backgroundColor : 'teal'
            },
            allowFontScaling : true,
            upperCaseLabel : true
        },
        tabBarComponent : TabBarTop
    })

    return (<ShopCatTabNav />)

}