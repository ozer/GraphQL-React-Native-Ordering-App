import React from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    Dimensions,
    View,
    Button,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { graphql, compose, withApollo } from 'react-apollo';
import fetchShop from '../../queries/fetchShop';
import fetchCart from '../../queries/fetchCart';
import gql from 'graphql-tag';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { ShopCreator } from './ShopCreator';
import ProductPage from '../Product/ProductPage';
import Drawer from 'react-native-drawer';
import Cart from '../Cart/Cart'
import TabMenuItems from '../Menus/TabMenuItems';
import testCartMutation from '../../mutations/testCartMutation';
import moment from 'moment';
moment.locale('tr');
const { width, height } = Dimensions.get('window');

class NewShop extends React.Component{



}

export default compose(withApollo, graphql(fetchShop))(NewShop);