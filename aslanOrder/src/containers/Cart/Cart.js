import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import CartHeader from '../../components/cartcomponents/CartHeader';
import CartItem from '../../components/cartcomponents/CartItem';

moment.locale('tr');

const returnTotalCost = (cartitems) => {
  Array.prototype.sum = function () {
    let T = 0;

    for (let i = 0, _len = this.length; i < _len; i++) {
      console.log(`Price : ${this[i].product.price}`);
      console.log(`Quantiy : ${JSON.stringify(this[i])}`);

      T = parseInt(T) + parseInt(this[i].product.price * this[i].quantity);
    }

    return T;
  };

  return cartitems.sum();
};

const styles = StyleSheet.create({
  cartContainer: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    // justifyContent: 'center',
    backgroundColor: '#1874CD',
    flex: 1,
  },
  cartHeader: {
    textAlign: 'center',
  }
});

const Cart = ({
  cart, increaseQuantity, decreaseQuantity,
}) => (
  <ScrollView style={styles.cartContainer}>

    {
                cart.cartitems.length > 0 ?
                  <View>
                    <CartHeader headerInput={cart.created_at} />
                    <View>

                      {
                            cart.cartitems.map((key) => {
                                console.log(`Cart item in the user's cart :${JSON.stringify(key)}`);
                                return (
                                  <View key={key.id} style={{ paddingTop: 10 }}>
                                    <CartItem increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} item={key} />
                                  </View>
                                );
                            })
                        }

                    </View>
                    <View style={{ paddingBottom: 45 }} >
                      <Text>
                        Checkout : $ 16.67
                      </Text>
                    </View>
                  </View>
                    :
                  <View style={{ justifyContent: 'center' }}>
                    <Text adjustsFontSizeToFit style={{ textAlign: 'center' }}> Cart is empty ! </Text>
                  </View>
            }

  </ScrollView>
);

Cart.propTypes = {
  cart: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  increaseQuantity: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
};

export default Cart;
