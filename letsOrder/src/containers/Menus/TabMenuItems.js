import React from 'react';
import { View, ScrollView, Text,
     TouchableWithoutFeedback,
     Dimensions,
     Animated,
     StyleSheet } from 'react-native';

const {width,height} = Dimensions.get('window');

console.log("HEIGHT : "+height);

const styles = StyleSheet.create({
    activeTintColor: {
     backgroundColor: 'red',
    },
    inactiveTintColor: {
      backgroundColor: 'blue',
    },
    tabText: {
        color: 'red',
    },
  });

const TabMenuItems = ({props}) => {

    const { activeTintColor, tab, tabbar, tabText, inactiveTintColor } = styles;
    const { index } = props.navigation.state;
    return(
        <View>
        <ScrollView contentContainerStyle={{ flex : 1 }} horizontal showsHorizontalScrollIndicator={false} style={{backgroundColor : '#FFAEB9'}}>
        {
            props.navigation.state.routes.length ? (
                props.navigation.state.routes.map((route,number)=>{
                    const focused = ( index === number ) ? '#1874CD' : '#FF6A6A';
                    const tintColor = focused ? activeTintColor : inactiveTintColor;
                    return (
                        <TouchableWithoutFeedback
                            key={route.key}
                            onPress={() => {
                                props.jumpToIndex(number)
                            }}
                            delayPressIn={0}
                            >
                            <View style={{marginLeft : 20, marginTop : height / 40, shadowOpacity : 25, alignSelf : 'flex-start' }}>
                                <Text style={{borderRadius : 5, fontWeight : 'bold', borderWidth :2, paddingTop : 5,color : 'white', height : height/18, width : width/5,textAlign : 'center', backgroundColor : focused, borderStyle: 'dashed',borderColor : '#CD2626'}}>
                                {props.getLabel({route, number})}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                })
            ) : <Text>
                Boş Menü
                </Text>
        }
    </ScrollView>
    </View>
    )
}

export default TabMenuItems;

/*



<Text style={{ fontSize : 16, marginTop : 10, color :'blue', backgroundColor : 'white' ,fontFamily : 'AppleSDGothicNeo-SemiBold'}}>
                                    {props.getLabel({route, number})}
                                </Text>

*/