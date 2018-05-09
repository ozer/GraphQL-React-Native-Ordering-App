import React from 'react';
import PropTypes from 'prop-types';
import {
    ScrollView,
    View,
    Text,
    Button,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import ProductList from '../../components/products/ProductList';
import AddItemToCart from '../../mutations/AddItemToCart';
import fetchCart from '../../queries/fetchCart';


const styles = StyleSheet.create({
    loadingContainer: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 0.5,
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const LoadingComponent = ({ loading }) => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
    return <View />;
  };

class CategoryPage extends React.Component {

    constructor(props) {
        super(props);

        this.state= {
            loading: false
        }

        
    }

    addItemToCart = (product) => {

        const { addItem } = this.props;

        const quantity = 1
        const { id } = product;
        let productid = '5accbd20621b138128a7667d';

        console.log('Product id : ' + id);

        this.setState({ loading: true });

        addItem({ id, quantity}).then((info) => {
            console.log(info);
            this.setState({ loading: false});
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
            <ScrollView style={{ flex: 1 }} >
                <ProductList loading={this.state.loading} products={params.products} addItem={this.addItemToCart} />
                <LoadingComponent loading={this.state.loading} />
            </ScrollView>
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
                ],
            }),
    })
});

CategoryPage.propTypes = {
    addItem: PropTypes.func.isRequired,
};

export default compose(withApollo, addItem)(CategoryPage);