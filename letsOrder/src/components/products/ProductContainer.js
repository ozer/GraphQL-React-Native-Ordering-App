import React from 'react';
import {View,Text,Dimensions, StyleSheet,Image, TouchableOpacity} from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container : {
        width : width/3,
        height : height/10,
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 10
    },
    imageContainer : {
        height : height/12,
        width : width/3
    },
    priceContainer : {
        width : width/3,
        backgroundColor : 'white'
    }
})

export const ProductContainer = ({product,addItemToCart}) => {

    return(
        <View style={styles.container}>
        <TouchableOpacity
            onPress={()=>addItemToCart(product)}
        >
            <View>
                <Text>
                    {product.name}
                </Text>
            </View>
            <View
            style={styles.priceContainer}
            >
            <Text
            style={{textAlign : 'center', color : 'blue'}}
            >
                    {product.price}
            </Text>
            </View>
            </TouchableOpacity>
        </View>
    )

}
