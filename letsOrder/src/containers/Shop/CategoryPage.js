import React from 'react';
import {
    View,
    Text,
    Button,
} from 'react-native';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import ProductList from '../../components/products/ProductList';
import AddItemToCart from '../../mutations/AddItemToCart';
import fetchCart from '../../queries/fetchCart';

class CategoryPage extends React.Component {

    constructor(props) {
        super(props);
    }

    addItemToCart = (product) => {

        const { addItem } = this.props;

        const quantity = 1
        const { id } = product;
        let productid = '5accbd20621b138128a7667d';

        console.log('Product id : ' + id);

        addItem({ id, quantity}).then((info) => {
            console.log(info);
        }).catch(e => {
            // GraphQL errors can be extracted here
            if (e.graphQLErrors) {
                // reduce to get message
                _.reduce(
                   e.graphQLErrors,
                   (res, err) => [...res, error.message],
                   []
                );
            }
            console.log(e);
         })

    }

    render() {

        const { params } = this.props.navigation.state;
        
        return (
            <View>
                <ProductList products={params.products} addItem={this.addItemToCart} />
            </View>
        )
    }
}

const addItem = graphql(AddItemToCart, {
    props: ({ mutate }) => ({
        addItem: (item) =>
            mutate({
                variables: {
                    productId: item.id,
                    quantity: item.quantity,
                },
                refetchQueries: [
                    { query: fetchCart }
                ]
            }),
    })
})

export default compose(withApollo, addItem)(CategoryPage);