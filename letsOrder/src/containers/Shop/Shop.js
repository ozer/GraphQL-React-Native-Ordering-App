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

class Shop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        }
        this.renderShopTab = this.renderShopTab.bind(this);

    }

    openDrawer() {

        this.setState({
            drawerOpen: true
        })

        this.refs.drawer.open();

    }

    closeDrawer() {

        this.setState({
            drawerOpen: false
        })

        this.refs.drawer.close();

    }

    addItemToCart() {

        console.log("Add item ");
        console.log(this.props.client.cache);
        console.log("Add item ");

    }

    renderShopTab() {
        const { client } = this.props;

        console.log("Shop render function running...");

        try {
            const { categories } = client.readQuery({
                query: gql`
                {
                    categories{
                        id
                        name
                        products{
                            id
                            name
                            price
                            quantity
                        }
                    }
                }`
            })

            console.log("Categories  :" + categories);

            return (
                <ShopCreator categories={categories} props={this.props} />
            )

        } catch (error) {
            console.log("Error occured creating the categories due to the : " + error);

            return (
                <View>
                    <Text>
                        Loading...
                    </Text>
                </View>
            )

        }

    }

    render() {

        const { client } = this.props;

        const { user } = client.readQuery({
            query: gql`
        {
            user{
                id
                email
                name
                __typename
                cart{
                    id
                    created_at
                    cartitems{
                        id
                        quantity
                        product{
                            id
                            name
                            price
                        }
                    }
                }
            }
        }
        `
        })

        console.log("Shop gets rendered again ! "+JSON.stringify(user));

        console.log(this.props.screenProps)

        return (
            <View style={{flex : 1}} >

                {this.renderShopTab()}

            </View>
        )

    }

}



export default compose(withApollo, graphql(fetchShop))(Shop);
