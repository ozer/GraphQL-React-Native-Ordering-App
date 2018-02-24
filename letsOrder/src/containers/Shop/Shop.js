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
import PropTypes from 'prop-types';
moment.locale('tr');
const { width, height } = Dimensions.get('window');

class Shop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            loading: false
        }

        this.renderShopTab = this.renderShopTab.bind(this);

        this.addItemToCart = this.addItemToCart.bind(this);

    }


    openDrawer() {

        this._drawer.open();

    }

    closeDrawer() {


        this._drawer.close();

    }

    addItemToCart() {

        console.log("Add item ");

        console.log("Add item ");
        
        alert("hehe");

        const { client, addItem } = this.props;

        try {
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

            console.log("User : " + JSON.stringify(user))

            const { id } = product;

            let userId = user.id;

            let quantity = 1


            addItem({ id, quantity, userId })
                .then((info) => {
                    console.log("Information : " + JSON.stringify(info))

                    this.setState({
                        loading: false
                    })

                    const user2 = client.readQuery({
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

                    console.log("USer 2 : " + JSON.stringify(user2));

                }).catch((err) => {

                    console.log("Error occured while adding item to the cart : " + err);

                    const errors = err.graphQLErrors.map(error =>
                        error.message
                    )

                    this.setState({
                        loading: false
                    })

                })

        } catch (error) {

            console.log("Error occured at reading user from the cache due to the following err : " + error);

            this.setState({
                loading: false
            })

        }

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
                            created_at
                        }
                    }
                }`
            })

            console.log("Categories  :" + categories);

            return (
                <ShopCreator categories={categories} props={this.props}  addItemToCart={this.addItemToCart} />
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
        return (
            <Drawer
                ref={ref => this._drawer = ref}
                onClose={this.closeDrawer.bind(this)}
                onOpen={this.openDrawer.bind(this)}
                tapToClose={true}
                openDrawerOffset={width / 4}
                type="displace"
                side={'right'}
                content={<ScrollView
                    style={{ backgroundColor: 'white', flex: 1 }}

                >
                    <View>
                        {user.cart != null ? <Cart cart={user.cart} /> : <Text> Sepetiniz boş gözüküyor ! </Text>}
                    </View>
                </ScrollView>}
                styles={{
                    drawer: {
                        shadowColor: "black",
                        shadowOpacity: 0.8,
                        shadowRadius: 20,
                        shadowOffset: {
                            width: -10,
                            height: 10
                        },
                    },
                }}>

                {this.renderShopTab()}

                <TouchableOpacity onPress={this.state.drawerOpen ? this.closeDrawer.bind(this) : this.openDrawer.bind(this)}
                    style={{ alignSelf: 'flex-end', position: 'absolute', bottom: 50, }}>
                    <Icon
                        name="shopping-cart"
                        color="purple"
                        size={width / 7}
                    />
                </TouchableOpacity>

            </Drawer>
        )

    }

}


const addItem = graphql(testCartMutation, {
    props: ({ mutate }) => ({
        addItem: (item) =>
            mutate({
                variables: {
                    quantity: item.quantity,
                    productId: item.id,
                    id: item.userId
                },
                refetchQueries: [
                    { query: fetchCart },
                ],
            }),
    })
})


export default compose(withApollo, addItem, graphql(fetchShop))(Shop);
/*

<View style={{flex : 1}} >

                {this.renderShopTab()}

            </View>

<Drawer
                ref={'drawer'}
                onClose={this.closeDrawer.bind(this)}
                onOpen={this.openDrawer.bind(this)}
                tapToClose={true}
                openDrawerOffset={width / 4}
                type="displace"
                side={'right'}
                content={<ScrollView
                    style={{ backgroundColor: 'white', flex: 1 }}

                >
                    <View>
                        {user.cart != null ? <Cart cart={user.cart} /> : <Text> Sepetiniz boş gözüküyor ! </Text>}
                    </View>
                </ScrollView>}
                styles={{
                    drawer: {
                        shadowColor: "black",
                        shadowOpacity: 0.8,
                        shadowRadius: 20,
                        shadowOffset: {
                            width: -10,
                            height: 10
                        },
                    },
                }}>

                 <TouchableOpacity onPress={this.state.drawerOpen ? this.closeDrawer.bind(this) : this.openDrawer.bind(this)}
                    style={{ alignSelf: 'flex-end', position: 'absolute', bottom: 50, }}>
                    <Icon
                        name="shopping-cart"
                        color="purple"
                        size={width / 7}
                    />
                </TouchableOpacity>

        </Drawer>
*/