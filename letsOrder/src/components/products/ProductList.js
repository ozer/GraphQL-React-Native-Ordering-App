import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import ProductContainer from './ProductContainer';

const ProductList = ({ products, addItem }) => (
  <ScrollView>
    {
      products.map(key => (
        <ProductContainer key={key.id} product={key} addItem={addItem} />
      ))
    }
  </ScrollView>
);

ProductList.propTypes = {
  products: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  addItem: PropTypes.func.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ProductList;
