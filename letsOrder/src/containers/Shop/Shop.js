import React from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    Dimensions,
    View,
    Button,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { graphql, compose, withApollo } from 'react-apollo';
import fetchShop from '../../queries/fetchShop';
import gql from 'graphql-tag';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { ShopCreator } from './ShopCreator';
import ProductPage from '../Product/ProductPage';
import Drawer from 'react-native-drawer';
import TabMenuItems from '../Menus/TabMenuItems';
import testCartMutation from '../../mutations/testCartMutation';
const { width, height } = Dimensions.get('window');

class Shop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        }
        this.renderShopTab = this.renderShopTab.bind(this);

    }

    openDrawer() {

        this.setState({
            drawerOpen: true
        })

        this.refs.drawer.open();

    }

    closeDrawer() {

        this.setState({
            drawerOpen: false
        })

        this.refs.drawer.close();

    }
    
    addItemToCart(){

        console.log("Add item ");
        console.log(this.props.client.cache);
        console.log("Add item ");

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
                <ShopCreator categories={categories} props={this.props} />
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
            <Drawer
                ref={'drawer'}
                styles={{
                    shadowColor: "blue",
                    shadowOpacity: 0.8,
                    shadowRadius: 0
                }}
                content={<View
                    style={{ backgroundColor: 'white', height: height, }}
                >
                    <Text> hello drawer </Text>
                </View>}
                onClose={this.closeDrawer.bind(this)}
                onOpen={this.openDrawer.bind(this)}
                tapToClose={true}
                openDrawerOffset={width / 4}
                type="displace"
                side={'right'}
            >

                {this.renderShopTab()}

                <TouchableOpacity onPress={this.state.drawerOpen ? this.closeDrawer.bind(this) : this.openDrawer.bind(this)}
                    style={{ alignSelf: 'flex-end', position: 'absolute', bottom: 50, }}>
                    <Icon
                        name="shopping-cart"
                        color="purple"
                        size={width/7}
                    />
                </TouchableOpacity>
            </Drawer>
        )
    }

}



export default compose(withApollo,graphql(fetchShop))(Shop);
