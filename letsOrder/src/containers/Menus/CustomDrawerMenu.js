import React from 'react'
import { View, ScrollView, Text, TouchableWithoutFeedback } from 'react-native';
import { NavigationActions } from 'react-navigation';
import DrawerMenuItems from './DrawerMenuItems';
import graphql from 'react-apollo/graphql';
import { withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';

const capitalizeFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class CustomDrawerMenu extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {

        const {  client } = this.props;

        const { user } = client.readQuery({
            query: gql`
        {
            user{
                id
                email
                name
                __typename
            }
        }
        `
        })

        return (
            <ScrollView style={{ backgroundColor: 'white' }}>
                <View style={{ marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ color: '#1874CD', fontSize: 20, textAlign: 'center' }}>
                            Hello, { capitalizeFirstLetter(user.name) }
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