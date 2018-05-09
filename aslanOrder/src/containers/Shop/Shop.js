import React from 'react';
import { View, Text, TabBarIOS } from 'react-native';
import { TabNavigator, StackNavigator, TabBarTop } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import fetchShop from '../../queries/fetchShop';
import CartDrawer from './CartDrawer';
import CategoryPage from './CategoryPage';
import TabMenuItems from '../Menus/TabMenuItems';

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

  console.log(`Shop creator !${categories.length}`);

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
          navigationOptions: {
            title: name,
            tabBarIcon: ({ focused }) => (
              focused ? <Icon name="star" type="simple-line-icon" size={24} iconStyle={{ paddingBottom: 0, paddingTop: 0 }} color="#007700" /> :
              <Icon name="star" type="simple-line-icon" size={24} iconStyle={{ paddingBottom: 0, paddingTop: 0 }} color="#000" />
            ),
          },
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
      pressOpacity: 0.5,
      showIcon: true,
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      tabStyle: {
        backgroundColor: '#1874CD',
        width: Object.keys(routes).length > 4 ? width / 4 : width / Object.keys(routes).length,
        height: height / 12,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'white',
      },
      labelStyle: {
        justifyContent: 'center',
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
    <CartDrawer shopShelf={<ShopCatTabNav />} >
      <View>
        <Text>haha</Text>
      </View>
    </CartDrawer>
  );
}

export default graphql(fetchShop)(MyShop);
