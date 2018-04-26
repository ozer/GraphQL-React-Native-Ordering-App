import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

moment.locale('tr');
const { width, height } = Dimensions.get('window');
const W = 4 * width / 7;
const H = height / 16;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

const CartItem = ({ item }) => (
  <View style={styles.container}>
    <Text>
        Product :  {item.product.name}
    </Text>
  </View>
);

CartItem.propTypes = {
  item: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};


export default CartItem;
