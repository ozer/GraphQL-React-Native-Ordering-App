import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

moment.locale('tr');
const { width, height } = Dimensions.get('window');
const W = 2 * width / 5;
const H = height / 16;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerContainer: {
    width: width / 3,
    height: H,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerLabel: {
    textAlign: 'center',
    color: 'white',
    flexWrap: 'wrap',
  },
  headerInput: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

const CartHeader = ({ headerInput }) => (
  <View style={styles.topContainer}>

    <View style={styles.headerContainer}>

      <Text adjustsFontSizeToFit style={styles.headerLabel}>

            My Cart

      </Text>

    </View>

    <View style={styles.headerContainer}>

      <TouchableOpacity>

        <Text adjustsFontSizeToFit style={styles.headerInput}>

        Drop the cart

        </Text>

      </TouchableOpacity>

    </View>

  </View>
);

export default CartHeader;
