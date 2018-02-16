import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import CartHeader from '../../components/cartcomponents/CartHeader';
moment.locale('tr');

const returnTotalCost = (cartitems) => {

    Array.prototype.sum = function () {

        var T = 0;

        for (var i = 0, _len = this.length; i < _len; i++) {

            console.log("Price : "+this[i].product.price);
            console.log("Quantiy : "+JSON.stringify(this[i]))

            T = parseInt(T) + parseInt(this[i].product.price*this[i].quantity)

        }

        return T;

    }

    return cartitems.sum();

}

const Cart = ({ cart }) => {

    return (
        <View
            style={styles.cartContainer}
        >

        <View>

        </View>
            <Text adjustsFontSizeToFit style={styles.cartHeader}> Cart Creation Date : {moment(cart.created_at).format('LLL')} </Text>
            <Text adjustsFontSizeToFit style={styles.cartHeader}> {returnTotalCost(cart.cartitems)} </Text>


            {
                cart.cartitems.length > 0 ?
                    <View>
                        <CartHeader headerInput={cart.created_at} />
                        
                        {
                            cart.cartitems.map((key, index) => {

                                return (
                                    <View key={index}>
                                        <Text>
                                            {key.product.name}, {key.product.price}
                                        </Text>
                                    </View>
                                )

                            })
                        }
                    </View>
                    :
                    <Text adjustsFontSizeToFit> Cart is empty ! </Text>
            }

        </View>
    )

}

const styles = StyleSheet.create({
    cartContainer: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'center',
    },
    cartHeader: {
        textAlign: 'center'
    }
})

export default Cart;