import React from 'react';
import {
  StackNavigator,
  DrawerNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SignIn from '../src/containers/Auth/SignIn';
import SignUp from '../src/containers/Auth/SignUp';
import CustomDrawerMenu from '../src/containers/Menus/CustomDrawerMenu';
import Shop from '../src/containers/Shop/Shop';
import { width, height} from '../src/ui/common/responsiveElements';

const SignInStackNavigator = StackNavigator({
  SignInStackNav: {
    screen: SignIn,
  },
}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    headerTitle: 'Welcome !',
    headerTitleStyle: {
      color: 'blue',
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: 20,
    },
  }),
});

const SignUpStackNavigator = StackNavigator({
  SignUpStackNav: {
    screen: SignUp,
  },
}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    headerTitle: 'Welcome !',
    headerTitleStyle: {
      color: 'blue',
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: 20,
    },
  }),
});

// Care this !
const ShopTabNavigator = StackNavigator({
  Shop: {
    screen: Shop,
  },
}, {
  headerMode: 'none',
});


const DrawerBar = DrawerNavigator({
  Shop: {
    screen: ShopTabNavigator,
  },
}, {
  drawerPosition: 'left',
  initialRouteName: 'Shop',
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: 'white' },
  }),
  contentComponent: props => <CustomDrawerMenu {...props} />,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});


const MenuDrawerStack = StackNavigator({
  DrawerBar: {
    screen: DrawerBar,
  },
}, {
  style: {
    leftDrawerWidth: 40,
  },
  index: 0,
  navigationOptions: ({ navigation, transitioning }) => ({
    headerStyle: { backgroundColor: '#1874CD' },
    headerTitle: 'My New Shop',
    gesturesEnabled: false,
    headerLeft: <Icon
      disabled={transitioning}
      name="menu"
      size={height / 18}
      onPress={() => {
                    navigation.navigate({
                        key: null,
                        index: 0,
                        action: [
                            navigation.navigate('DrawerToggle'),
                        ],
                    });
                }}
    />,
  }),
});

const PrimaryNavigator = StackNavigator(
  {
    SignInStack: {
      screen: SignInStackNavigator,
    },
    SignUpStack: {
      screen: SignUpStackNavigator,
    },
    DrawerMainStack: {
      screen: MenuDrawerStack,
    },
  },
  {
    headerMode: 'none',
  },
);


export default PrimaryNavigator;
