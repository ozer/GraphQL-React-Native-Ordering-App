import React from 'react';
import { View, ScrollView, Text, TouchableWithoutFeedback } from 'react-native';
import { NavigationActions } from 'react-navigation';
import DrawerMenuItems from './DrawerMenuItems';
import graphql from 'react-apollo/graphql';
import { withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';

const capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

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

class CartMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('cart menu');

    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{ marginTop: 20 }}>
          <View style={{
 flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center',
}}
          >
            <Text style={{ color: '#1874CD', fontSize: 20, textAlign: 'center' }}>
                            Hello,
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default compose(withApollo)(CartMenu);
