import React from 'react';
import {View,Text,Dimensions, StyleSheet} from 'react-native';
const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
    containerStyle : {
        marginTop : height/16,
        alignItems : 'center',
        justifyContent : 'center',
        height : height/10
    },
    headerStyle : {
        textAlign : 'center',
        color : 'blue',
        fontSize : 24
    }
})

export const Header = ({header})=>{

    return(
        <View style={styles.containerStyle}>
            <Text style={styles.headerStyle}>
                {header}
            </Text>
        </View>
    )
}

