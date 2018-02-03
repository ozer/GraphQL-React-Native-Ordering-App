import React from 'react';
import {
    View,
    Text,
    Animated,
    ListView,
    Dimensions,
    StyleSheet,
    TextInput
} from 'react-native';
import { ProductContainer } from '../../components/products/ProductContainer';
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
        alignItems: 'flex-start'
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerInput: {
        height: 30,
        width : 200,
        backgroundColor : 'pink',
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
                style={{textAlign :'center', marginBottom : 15,}}
                >
                    İçkiler !
                </Text>
            </View>
        )

    }

    render() {

        console.log("This props : " + JSON.stringify(this.props.navigation));

        const { products } = this.props.navigation.state.params;

        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1.id !== r2.id
        });

        return (
            <Animated.View
                style={{ opacity: fadeAnim, flex: 1 }}
            >

                <ListView
                    contentContainerStyle={styles.list}
                    style={{ flex: 1, marginTop: height / 20 }}
                    dataSource={dataSource.cloneWithRows(products)}
                    renderRow={(rowData) => <ProductContainer product={rowData} />}
                />


            </Animated.View>
        )
    }

}

export default ProductPage;