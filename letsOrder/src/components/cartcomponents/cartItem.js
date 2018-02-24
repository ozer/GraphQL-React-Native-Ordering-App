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
const { width, height } = Dimensions.get("window");
const W = 4 * width / 7;
const H = height / 16;

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        justifyContent : 'flex-start'
    }
})

const CartItem = ({ item }) => {

    return(
        <View style={styles.container}>
            <Text>
               Product :  {item.product.name}
            </Text>
        </View>
    )

}


export default CartItem;