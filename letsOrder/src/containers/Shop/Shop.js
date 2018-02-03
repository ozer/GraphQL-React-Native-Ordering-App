import React from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    Dimensions,
    View
} from 'react-native';
import { graphql, compose, withApollo } from 'react-apollo';
import fetchShop from '../../queries/fetchShop';
import gql from 'graphql-tag';
import { StackNavigator,TabNavigator } from 'react-navigation';
import { ShopCreator } from './ShopCreator';
import ProductPage from '../Product/ProductPage';
import TabMenuItems from '../Menus/TabMenuItems';
const { width, height } = Dimensions.get('window');

class Shop extends React.Component {

    constructor(props) {
        super(props);

        this.renderShopTab = this.renderShopTab.bind(this);

    }

    renderShopTab() {
        const { client } = this.props;
        try {
            const { categories } = client.readQuery({
                query: gql`
                {
                    categories{
                        id
                        name
                        products{
                            id
                            name
                            price
                            quantity
                        }
                    }
                }`
            })

            console.log("Categories  :" + categories);

            return (
                <ShopCreator categories={categories} />
            )

        } catch (error) {
            console.log("Error occured creating the categories due to the : " + error);

            return (
                <View>
                    <Text>
                        Loading...
                    </Text>
                </View>
            )

        }

    }

    render() {

        return (
            this.renderShopTab()
        )
    }

}

export default compose(withApollo, graphql(fetchShop))(Shop);
