import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
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

const Cart = ({ cart }) => (
  <View style={styles.cartContainer}>

    {
                cart.cartitems.length > 0 ?
                  <View>
                    <CartHeader headerInput={cart.created_at} />

                    {
                            cart.cartitems.map((key) => {
                                console.log(`keeey  :${JSON.stringify(key)}`);

                                return (
                                  <CartItem key={key.id} item={key} />
                                );
                            })
                        }
                  </View>
                    :
                  <View style={{ justifyContent: 'center' }}>
                    <Text adjustsFontSizeToFit style={{ textAlign: 'center' }}> Cart is empty ! </Text>
                  </View>
            }

  </View>
);

const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'center',
  },
  cartHeader: {
    textAlign: 'center',
  },
});

export default Cart;
