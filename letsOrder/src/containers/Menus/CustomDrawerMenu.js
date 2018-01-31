import React from 'react'
import { View, ScrollView, Text, TouchableWithoutFeedback } from 'react-native';
import { NavigationActions } from 'react-navigation';
import DrawerMenuItems from './DrawerMenuItems';
import graphql from 'react-apollo/graphql';
import { withApollo, compose } from 'react-apollo';

class CustomDrawerMenu extends React.Component{
    constructor(props){
        super(props);
    }
    render(){

        console.log(this.props.client.cache.data)

        return(
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View style={{ marginTop: 20 }}>
                    <View style={{flexDirection : 'row',justifyContent : 'center', alignItems : 'center',alignSelf :'center'}}>
                    <Text style={{ color: '#1874CD', fontSize: 20, textAlign :'center' }}>
                        Hello, Customer
                    </Text>
                    </View>
                </View>
                <DrawerMenuItems
                props={this.props}
                />
            </ScrollView>
        )
    }
}

export default compose(withApollo)(CustomDrawerMenu)