import React from 'react';
import {
    TabNavigator,
    StackNavigator,
    DrawerNavigator,
    addNavigationHelpers
} from 'react-navigation';
import { Dimensions } from 'react-native';
import App from '../App';
import SignIn from '../src/containers/Auth/SignIn';
import SignUp from '../src/containers/Auth/SignUp';
import CustomDrawerMenu from '../src/containers/Menus/CustomDrawerMenu';
import CartMenu from '../src/containers/Menus/CartMenu'
import Shop from '../src/containers/Shop/Shop';
import { Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ShopCreator from '../src/containers/Shop/ShopCreator';
import Test from '../src/containers/TestDrawer/Test';

const { width, height } = Dimensions.get('window');

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
        headerMode: 'none',
        navigationOptions: ({ navigation }) => ({
            headerRight: <Icon
                name="shopping-cart"
                size={height/18}
                onPress={() => {
                    navigation.navigate({
                        key: null,
                        index: 0,
                        action: [
                            navigation.navigate('DrawerTogg')
                        ]
                    })
                }}
            />
        })
    })


const DrawerBar = DrawerNavigator({
    Shop: {
        screen: ShopTabNavigator
    },
    Shop2: {
        screen: Test
    }

}, {
        drawerPosition: 'left',
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
            headerTitle : 'My New Shop',
            gesturesEnabled: false,
            headerLeft: <Icon
                name="menu"
                size={height/18}
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
        headerMode: 'none',
    });


export default PrimaryNavigator;
