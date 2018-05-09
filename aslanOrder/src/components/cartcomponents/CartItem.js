import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import moment from 'moment';

moment.locale('tr');
const { width, height } = Dimensions.get('window');
console.log(`The width : is ${width}`);
const cartItemWidth = ((3 * width) / 4) - 20;
const cartItemHeight = height / 6;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: cartItemWidth,
    height: cartItemHeight,
  },
  itemPictureContainer: {
    width: cartItemWidth / 4,
    justifyContent: 'center',
  },
  itemInformation: {
    width: (7 * cartItemWidth) / 12,
    justifyContent: 'center',
  },
  itemInformationText: {
    textAlign: 'left',
    marginLeft: 10,
    color: 'blue',
  },
});

const CartItem = ({ item, increaseQuantity, decreaseQuantity }) => (
  <View
    style={{
       backgroundColor: 'white', flexDirection: 'row', justifyContent: 'flex-start', width: cartItemWidth, height: cartItemHeight,
    }}
  >
    <View style={styles.itemPictureContainer}>
      <Image onLoad={() => console.log('Image is loading !')} source={require('./nike.jpg')} />
    </View>

    <View style={styles.itemInformation}>
      <Text adjustsFontSizeToFit style={styles.itemInformationText}>
        {item.product.name} {item.product.price}
      </Text>
    </View>

    <View style={{
     flexDirection: 'column', justifyContent: 'space-between', width: (2 * cartItemWidth / 12),
     }}
    >

      <TouchableOpacity
        onPress={() => increaseQuantity(item)}
        style={{
 borderWidth: 1, height: 3 * cartItemHeight / 8, alignItems: 'center', justifyContent: 'center',
}}
      >
        <Icon size={width / 20} color="green" name="add" adjustsFontSizeToFit />
      </TouchableOpacity>

      <View style={{
 borderRightWidth: 1, borderLeftWidth: 1, height: 2 * cartItemHeight / 8, alignItems: 'center', justifyContent: 'center',
}}
      >
        <Text>
          {item.quantity}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => decreaseQuantity(item)}
        style={{
 borderWidth: 1, height: 3 * cartItemHeight / 8, alignItems: 'center', justifyContent: 'center',
}}
      >
        <Icon size={width / 20} color="red" name="remove" adjustsFontSizeToFit />
      </TouchableOpacity>

    </View>

  </View>
);


CartItem.propTypes = {
  item: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  increaseQuantity: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
};


export default CartItem;
