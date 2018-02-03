import React from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    Dimensions,
    View
} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import ProductPage from '../Product/ProductPage';
import TabMenuItems from '../Menus/TabMenuItems';
const { width, height } = Dimensions.get('window');


export const ShopCreator = ({ categories }) => {

    // This script will create a TabNavigator for categories and StackNavigators for each member of the categories !

    let categoryStack = {};

    let routes = {};


    categories.forEach((category) => {

        if (category.products.length > 0) {

            const { catname } = category.name;

            console.log("OHAA : "+category.name);

            if (category.name != undefined) {

                console.log("OHAAAA");

                routes[category.name] = {
                    screen: StackNavigator({
                        'isim': {
                            screen: ProductPage
                        }
                    },{
                        headerMode : 'none',
                        initialRouteParams : {
                            categoryName : category.name,
                            products : category.products
                        }
                    })
                }
            }

            console.log("Routes : " + routes);



        } else {

            console.log("This category has no products !");

        }

    })

    console.log("OHA : " + JSON.stringify(routes));

    const ShopCatTabNav = TabNavigator(routes, {
        tabBarPosition: 'top',
        tabBarComponent: props => <TabMenuItems props={props} />
    })

    return <ShopCatTabNav />

}