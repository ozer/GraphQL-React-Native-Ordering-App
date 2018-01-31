import React from 'react';
import { View, ScrollView, Text, TouchableWithoutFeedback,TouchableOpacity,Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';
const { width, height } = Dimensions.get('window');
const DrawerMenuItems = ({ props }) => {
    return (
        <ScrollView style={{ marginTop: 20, flexGrow: 1, flexDirection: 'column' }}>
            {
                props.navigation.state.routes.length ? (
                    props.navigation.state.routes.map((route, number) => {
                        return (
                            <TouchableOpacity
                                key={route.key}
                                onPress={() => {
                                    props.navigation.navigate('DrawerClose')

                                    NavigationActions.reset(
                                        {
                                            index: 1,
                                            actions: [
                                                props.navigation.navigate(route.routeName)
                                            ]
                                        }
                                    )

                                }}
                                delayPressIn={0}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 30, marginLeft: width / 8 }}>
                                    <Text style={{ fontSize: 20, color: '#1874CD', fontFamily: 'AppleSDGothicNeo-SemiBold', textAlign: 'center' }}>
                                       {props.getLabel({ route, number })}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                ) : <Text>
                        Boş Menü
                </Text>
            }
        </ScrollView>
    )
}

export default DrawerMenuItems;