import React from 'react';
import {
    ScrollView,
    Text
} from 'react-native';
import { graphql,compose,withApollo } from 'react-apollo';
import fetchShop from '../../queries/fetchShop';
import gql from 'graphql-tag';

class Shop extends React.Component{

    constructor(props){
        super(props);
    }

    render(){

        //console.log(this.props.client.cache.data);

        /*
        const data = this.props.client.readQuery({
            query : gql`
            query S{
                categories {
                    id
                    name
                }
            }
            `,
            
        })
        */

        return(
            <ScrollView>
                <Text>
                    Shop !
                </Text>
            </ScrollView>
        )
    }

}

export default compose(withApollo,graphql(fetchShop))(Shop);