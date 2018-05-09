import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, ScrollView, TouchableOpacity, TextInput, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Drawer from 'react-native-drawer';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

import Cart from '../Cart/Cart'
import AddItemToCart from '../../mutations/AddItemToCart';
import fetchCart from '../../queries/fetchCart';

import increaseQuantityMutation from '../../mutations/increaseQuantity';
import decreaseQuantityMutation from '../../mutations/decreaseQuantity';

const { width, height } = Dimensions.get('window');

class CartDrawer extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            drawerOpen: false,
            loading: false,
            selectedTab: 'Drinks'
        };

    };

    openDrawer = () => {

        this.forceUpdate();

        this._drawer.open();

    };

    closeDrawer = () => {

        this._drawer.close();

    };

    increaseQuantity = (item) => {


        const { increaseQuantity } = this.props;

        const { product } = item;

        const { id } = product;

        this.setState({ loading: true });

        increaseQuantity({id}).then((info) => {
            console.log(info);
            setTimeout(() => {
                this.setState({loading: false});
            }, 1000);
        }).catch(e => {
            // GraphQL errors can be extracted here
            if (e.graphQLErrors) {
                // reduce to get message
                _.reduce(
                   e.graphQLErrors,
                   (res, err) => [...res, error.message],
                   []
                );
            }
            console.log(e);
         });

    }

    decreaseQuantity = (item) => {

        const { decreaseQuantity } = this.props;

        const { product } = item;

        const { id } = product;

        this.setState({loading: true});

        decreaseQuantity({id}).then((info) => {
            console.log(info);
            setTimeout(() => {
                this.setState({loading: false});
            }, 1000);
            
        }).catch(e => {
            // GraphQL errors can be extracted here
            if (e.graphQLErrors) {
                // reduce to get message
                _.reduce(
                   e.graphQLErrors,
                   (res, err) => [...res, error.message],
                   []
                );
            }
            console.log(e);
         });

    }

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

        const { cart } = user;

        return(
            <Drawer
                    ref={ref => this._drawer = ref}
                    onClose={this.closeDrawer}
                    acceptPan={false}
                    onOpen={this.openDrawer}
                    tapToClose={true}
                    openDrawerOffset={width / 4}
                    type="displace"
                    side={'right'}
                    content={
                        <View style={{ flex: 1 }} >
                            {user.cart != null ? <Cart decreaseQuantity={this.decreaseQuantity} increaseQuantity={this.increaseQuantity} cart={cart} /> : <Text> The cart looks empty ! </Text>}
                        </View>}
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

const increaseQuantity = graphql(increaseQuantityMutation,{
    props: ({ mutate }) => ({
        increaseQuantity: (item) => 
            mutate({
                variables: {
                    productId: item.id
                },
                refetchQueries: [
                    {
                        query: fetchCart
                    }
                ]
            })
    })
});

const decreaseQuantity = graphql(decreaseQuantityMutation,{
    props: ({ mutate }) => ({
        decreaseQuantity: (item) => 
            mutate({
                variables: {
                    productId: item.id
                },
                refetchQueries: [
                    {
                        query: fetchCart
                    }
                ]
            })
    })
});

CartDrawer.propTypes = {
    decreaseQuantity: PropTypes.func.isRequired,
    increaseQuantity: PropTypes.func.isRequired,
};

export default compose(withApollo, increaseQuantity, decreaseQuantity)(CartDrawer);