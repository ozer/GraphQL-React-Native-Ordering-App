import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
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
import Icon from 'react-native-vector-icons/FontAwesome'
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width: width / 3,
        height: height / 10,
        alignItems: 'center',
        marginTop: 5
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
        alignItems: 'center'
    },
})

export const ProductContainer = ({ product, addItemToCart }) => {

    return (

        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => addItemToCart(product)}
            >
                <View style={styles.productHeader}>
                    <Text adjustsFontSizeToFit
                        style={{ textAlign: 'center', fontWeight: 'bold' }}
                    >
                        {product.name}
                    </Text>
                </View>
                <View
                    style={styles.priceContainer}
                >
                    <Text
                        style={{ textAlign: 'center', color: 'blue' }}
                    >
                        Price : {product.price}
                    </Text>
                </View>

            </TouchableOpacity>
        </View>
    )

}
/*


<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop : height/25}}>

                    <View style={{ justifyContent: 'center', borderWidth: 1, alignContent :'center',alignItems :'center',alignSelf :'center' }}>
                        <Icon name="plus" />
                        <Text adjustsFontSizeToFit> Add </Text>
                    </View>
                    <View style={{ justifyContent: 'center', borderWidth: 1, alignContent :'center',alignItems :'center',alignSelf :'center' }}>
                        <Icon name="minus" />
                        <Text adjustsFontSizeToFit> Remove </Text>
                    </View>
                    <View style={{ justifyContent: 'center', borderWidth: 1, alignContent :'center',alignItems :'center',alignSelf :'center' }}>
                        <Icon name="remove" />
                        <Text adjustsFontSizeToFit> Delete </Text>
                    </View>
                </View>


*/