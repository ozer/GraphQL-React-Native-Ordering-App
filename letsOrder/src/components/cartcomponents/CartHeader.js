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
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    width: width / 3,
    height: H,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerLabel: {
    textAlign: 'center',
    color: 'black',
  },
  headerInput: {
    textAlign: 'center',
    color: 'blue',
    fontWeight: 'bold',
  },
});

const CartHeader = ({ headerInput }) => (
  <View style={styles.topContainer}>

    <View style={styles.headerContainer}>

      <Text adjustsFontSizeToFit style={styles.headerLabel}>

                    Cart Creation Date :

      </Text>

    </View>

    <View style={styles.headerContainer}>

      <Text adjustsFontSizeToFit style={styles.headerInput}>

        {moment(headerInput).format('LLL')}

      </Text>

    </View>

  </View>
);

export default CartHeader;
