import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, ActivityIndicator, StyleSheet } from 'react-native';
import ProductContainer from './ProductContainer';

const styles = StyleSheet.create({
  loadingContainer: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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
        <ActivityIndicator />
      </View>
    );
  }
  return <View />;
};


const ProductList = ({ products, addItem, loading }) => (
  <ScrollView>
    
    {
      products.map(key => (
        <ProductContainer key={key.id} product={key} addItem={addItem} />
      ))
    }
  </ScrollView>
);

LoadingComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
};


ProductList.propTypes = {
  products: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  addItem: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ProductList;
