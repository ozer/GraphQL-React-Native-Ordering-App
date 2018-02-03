import React from 'react';
import {
    TabNavigator,
    StackNavigator,
    DrawerNavigator,
    addNavigationHelpers
} from 'react-navigation';
import App from '../App';
import SignIn from '../src/containers/Auth/SignIn';
import SignUp from '../src/containers/Auth/SignUp';
import CustomDrawerMenu from '../src/containers/Menus/CustomDrawerMenu';
import Shop from '../src/containers/Shop/Shop';
import { Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ShopCreator from '../src/containers/Shop/ShopCreator';
const SignInStackNavigator = StackNavigator({
    SignInStackNav: {
        screen: SignIn
    }
}, {
        headerMode: 'float',
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'Welcome !',
            headerTitleStyle: {
                color: 'blue',
                fontWeight: 'bold',
                fontStyle: 'italic',
                fontSize: 20
            }
        })
    });

const SignUpStackNavigator = StackNavigator({
    SignUpStackNav: {
        screen: SignUp
    }
}, {
        headerMode: 'float',
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'Welcome !',
            headerTitleStyle: {
                color: 'blue',
                fontWeight: 'bold',
                fontStyle: 'italic',
                fontSize: 20
            }
        })
    });

const ShopTabNavigator = StackNavigator({
    Shop: {
        screen: Shop
    }
}, {
        headerMode: 'none'
    })


const DrawerBar = DrawerNavigator({
    Shop: {
        screen: ShopTabNavigator
    },
    Shop2: {
        screen: ShopTabNavigator
    }

}, {
        drawerPosition: 'left',
        headerMode: 'none',
        initialRouteName: 'Shop',
        navigationOptions: ({ navigation }) => ({
            headerStyle: { backgroundColor: 'white' },
        }),
        contentComponent: props => <CustomDrawerMenu {...props} />,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle'
    })



const MenuDrawerStack = StackNavigator({
    DrawerBar: {
        screen: DrawerBar
    }
}, {
        style: {
            leftDrawerWidth: 40
        },
        index: 0,
        navigationOptions: ({ navigation }) => ({
            headerStyle: { backgroundColor: '#1874CD' },
            gesturesEnabled: false,
            headerLeft: <Icon
                name="menu"
                onPress={() => {
                    navigation.navigate({
                        key: null,
                        index: 0,
                        action: [
                            navigation.navigate('DrawerToggle')
                        ]
                    })
                }}
            />
        }),
    })

const PrimaryNavigator = StackNavigator({
    SignInStack: {
        screen: SignInStackNavigator
    },
    SignUpStack: {
        screen: SignUpStackNavigator
    },
    DrawerMainStack: {
        screen: MenuDrawerStack
    }
},
    {
        headerMode: 'none'
    });


export default PrimaryNavigator;
