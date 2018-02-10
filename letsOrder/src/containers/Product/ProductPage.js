import React from 'react';
import {
    View,
    Text,
    Animated,
    ListView,
    Dimensions,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { withApollo, compose } from 'react-apollo';
import { ProductContainer } from '../../components/products/ProductContainer';
import gql from 'graphql-tag';
import graphql from 'react-apollo/graphql';
import addItemToCart from '../../mutations/addItemToCart';
import fillCartMutation from '../../mutations/fillCart';
import testCartMutation from '../../mutations/testCartMutation';
import fetchCart from '../../queries/fetchCart'
const { width, height } = Dimensions.get('window');
const fadeAnim = new Animated.Value(0);

const styles = StyleSheet.create({
    seperator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E'
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerInput: {
        height: 30,
        width: 200,
        backgroundColor: 'pink',
        flex: 1,
        paddingHorizontal: 8,
        fontSize: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
    }
})

class ProductPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: null
        }
        this.renderSeperator = this.renderSeperator.bind(this);
    }

    componentDidMount() {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 3000
            }
        ).start();
    }

    renderSeperator(rowId) {

        return (
            <View key={rowId}
                style={styles.seperator}
            />
        )

    }

    renderHeader() {

        return (
            <View style={styles.header}>
                <Text
                    style={{ textAlign: 'center', marginBottom: 15, }}
                >
                    İçkiler !
                </Text>
            </View>
        )

    }

    addItemToCart(product) {

        const { client, addItem } = this.props;

        /*
        this.props.navigation.state.params.testCart()
            .then((test) => {
                console.log("Test cart mutation : " + test);
            }).catch((testErr) => {
                console.log("Error for test carm utation : " + testErr);
            })
        */


        try {
            const { user } = client.readQuery({
                query: gql`
            {
                user{
                    id
                    email
                    name
                    __typename
                    cart{
                        id
                        created_at
                        cartitems{
                            id
                            product{
                                id
                                name
                                price
                            }
                        }
                    }
                }
            }
            `
            })

            console.log("User : "+JSON.stringify(user))

            const { id } = product;

            let userId = user.id;

            let quantity = 1


            addItem({ id,quantity,userId })
                .then((info) => {
                    console.log("Information : " + JSON.stringify(info))

                    const user2 = client.readQuery({
                        query: gql`
                    {
                        user{
                            id
                            email
                            name
                            __typename
                            cart{
                                id
                                created_at
                                cartitems{
                                    id
                                    product{
                                        id
                                        name
                                        price
                                    }
                                }
                            }
                        }
                    }
                    `
                    })

                    console.log("USer 2 : "+JSON.stringify(user2));

                }).catch((err) => {
                    console.log("Error occured while adding item to the cart : " + err);
                    const errors = err.graphQLErrors.map(error =>
                        error.message
                    )
                })

        } catch (error) {
            console.log("Error occured at reading user from the cache due to the following err : " + error);
        }



    }

    render() {

        const { products } = this.props.navigation.state.params;

        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.id !== r2.id
        });

        return (
            <Animated.ScrollView
                style={{ opacity: fadeAnim, flex: 1, backgroundColor: 'white' }}
            >

                <View
                    style={styles.list}
                >
                    {
                        products.map((key, index) => {
                            return (
                                <View style={{ width: width / 3 }}
                                    key={index}>
                                    <ProductContainer product={key} addItemToCart={this.addItemToCart.bind(this)} />
                                </View>
                            )
                        })
                    }
                </View>
            </Animated.ScrollView>
        )
    }

}

const addItem = graphql(testCartMutation, {
    props: ({ mutate }) => ({
        addItem: (item) =>
            mutate({
                variables : {
                    quantity : item.quantity,
                    productId : item.id,
                    id : item.userId
                },
                refetchQueries : [
                    { query : fetchCart },
                ],
            }),
    })
})



export default compose(withApollo,addItem)(ProductPage)

/*
                <ListView
                    contentContainerStyle={styles.list}
                    style={{ flex: 1, marginTop: height / 20 }}
                    dataSource={dataSource.cloneWithRows(products)}
                    renderRow={(rowData) => <ProductContainer product={rowData} />}
        />
*/