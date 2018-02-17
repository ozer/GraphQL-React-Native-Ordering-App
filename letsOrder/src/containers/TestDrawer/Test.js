import React from 'react';
import Drawer from 'react-native-drawer';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

const SomeText = ({})=>{

    console.log("Some test gets rendered !");

    return ( <Text> selam </Text>)

}

class TestDrawer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        }
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

    componentWillUpdate() {

        console.log("Re rendering...")

    }

    returnSomeText() {

        console.log("Some text is running");

        return (
            <Text>
                Selam
            </Text>
        )

    }

    render() {

        return (
            <Drawer ref={'drawer'} type="displace"
                content={<View style={{flex : 1}} ></View>}
                openDrawerOffset={100}
                onClose={this.closeDrawer.bind(this)}
                onOpen={this.openDrawer.bind(this)} side={'right'}>

                <View style={{flex : 1}}>
                    <TouchableOpacity onPress={this.state.drawerOpen ? this.closeDrawer.bind(this) : this.openDrawer.bind(this)}>
                        <Text>
                            Open Drawer
                    </Text>
                    </TouchableOpacity>
                    

                    <SomeText />

                </View>




            </Drawer>
        )

    }

}

export default TestDrawer;
