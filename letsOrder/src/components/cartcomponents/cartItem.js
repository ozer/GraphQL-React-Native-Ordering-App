import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import moment from 'moment';
moment.locale('tr');
const { width, height } = Dimensions.get("window");
const W = 4 * width / 7;
const H = height / 16;

const cartItem = ({ }) => {

    return(
        <View>
            <Text>
                Cart item
            </Text>
        </View>
    )

}


export default cartItem;