import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Button,
  Container,
  Content,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import { width, height } from '../../ui/common/responsiveElements';

const styles = StyleSheet.create({
  container: {
    width: width / 3,
    height: height / 10,
    alignItems: 'center',
    marginTop: 5,
    flex: 1,
    elevation: 2,
  },
  imageContainer: {
    height: height / 12,
    width: width / 3,
    justifyContent: 'center',
  },
  priceContainer: {
    width: width / 3,
    backgroundColor: 'white',
  },
  productHeader: {
    alignItems: 'center',
  },
});

const ProductContainer = ({ product, addItem }) => (

  <View style={styles.container}>

    <TouchableOpacity
      onPress={() => addItem(product)}
    >
      <View style={styles.productHeader}>
        <Text
          adjustsFontSizeToFit
          style={{ textAlign: 'center', fontWeight: 'bold' }}
        >
          {product.name}
        </Text>
      </View>
      <View
        style={styles.priceContainer}
      >
        <Text style={{ textAlign: 'center', color: 'blue' }}>
          Price : {product.price}$
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);


ProductContainer.propTypes = {
  product: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  addItem: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
};


export default ProductContainer;
