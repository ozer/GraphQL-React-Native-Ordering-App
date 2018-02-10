import React from 'react';
import {View,Text, StyleSheet} from 'react-native';

const Cart = ({ cart }) => {

    return(
        <View
        style={styles.cartContainer}
        >
            <Text> Total Cost : 0 ₺</Text>
            
        </View>
    )

}

const styles = StyleSheet.create({
    cartContainer : {
        flex : 1,
        paddingTop : 10,
        justifyContent : 'center'
    }
})

export default Cart;