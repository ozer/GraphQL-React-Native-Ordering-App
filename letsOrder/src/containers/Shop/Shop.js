import React from 'react';
import { TabNavigator, StackNavigator, TabBarTop } from 'react-navigation';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import fetchShop from '../../queries/fetchShop';
import CartDrawer from './CartDrawer';
import CategoryPage from './CategoryPage';

import { width, height } from '../../ui/common/responsiveElements';

function MyShop({ data: { loading, error, categories } }) {
  if (loading) {
    return null;
  }
  if (error) {
    console.log(`Error occured due to the : ${error}`);
    return error;
  }

  const routes = {};

  console.log('Shop creator !');
  categories.forEach((category) => {
    if (category.products.length > 0) {
      const { name, products } = category;

      if (category.name !== undefined) {
        routes[category.name] = {
          screen: StackNavigator({
            isim: {
              screen: CategoryPage,
            },
          }, {
            headerMode: 'none',
            initialRouteParams: {
              categoryName: name,
              products,
            },
          }),
        };
      }
    } else {
      console.log('This category has no products !');
    }
  });

  const ShopCatTabNav = TabNavigator(routes, {
    tabBarPosition: 'top',
    swipeEnabled: true,
    lazy: true,
    tabBarOptions: {
      scrollEnabled: true,
      showLabel: true,
      showIcon: true,
      tabStyle: {
        backgroundColor: 'pink',
        width: Object.keys(routes).length > 4 ? width / 4 : width / Object.keys(routes).length,
        height: height / 12,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      },
      labelStyle: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
      },
      indicatorStyle: {
        backgroundColor: 'teal',
      },
      allowFontScaling: true,
      upperCaseLabel: true,
    },
    tabBarComponent: TabBarTop,
  });

  return (
    <CartDrawer shopShelf={<ShopCatTabNav />} />
  );
}

MyShop.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default graphql(fetchShop)(MyShop);
