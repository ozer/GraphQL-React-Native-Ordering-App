import React from 'react';
import { View, Dimensions, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Drawer from 'react-native-drawer';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import Cart from '../Cart/Cart'
import AddItemToCart from '../../mutations/AddItemToCart';
import fetchCart from '../../queries/fetchCart';

const { width, height } = Dimensions.get('window');

class CartDrawer extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            drawerOpen: false,
            loading: false,
            selectedTab: 'Drinks'
        };

    }

    openDrawer = () => {

        this.forceUpdate();

        this._drawer.open();

    };

    closeDrawer = () => {

        this._drawer.close();

    };

    getUser = () => {
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

        return user;
    }

    shopShelf = () => {
        return this.props.shopShelf
    }

    render(){

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
        });

        console.log(`ZUHAHAHA`);

        return(
            <Drawer
                    ref={ref => this._drawer = ref}
                    onClose={this.closeDrawer}
                    onOpen={this.openDrawer}
                    tapToClose={true}
                    openDrawerOffset={width / 4}
                    type="displace"
                    side={'right'}
                    content={<ScrollView
                        style={{ backgroundColor: 'white', flex: 1 }}

                    >
                        <View>
                            {user.cart != null ? <Cart cart={user.cart} /> : <Text> The cart looks empty ! </Text>}
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

                    {this.shopShelf()}

                    <TextInput onChange={()=>this.setState({name: 'ozer'})} />

                    <TouchableOpacity onPress={this.state.drawerOpen ? this.closeDrawer : this.openDrawer}
                        style={{ alignSelf: 'flex-end', position: 'absolute', bottom: 50 }}>
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

export default compose(withApollo)(CartDrawer);