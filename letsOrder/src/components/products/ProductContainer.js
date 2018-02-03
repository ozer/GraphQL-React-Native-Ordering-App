import React from 'react';
import {View,Text,Dimensions, StyleSheet,Image} from 'react-native';
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
        height : (height/10)-(height/12),
        textAlign : 'center'
    }
})

export const ProductContainer = ({product}) => {

    return(
        <View style={styles.container}>
            <Image
                style={styles.imageContainer}
                loadingIndicatorSource={{uri : 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                source={{uri : 'https://www.seaicons.com/wp-content/uploads/2016/07/nike-icon.png'}}
            />
            <Text>
                    {product.name}
            </Text>
        </View>
    )

}
