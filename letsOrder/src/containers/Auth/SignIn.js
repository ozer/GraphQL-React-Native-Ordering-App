import React from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { NavigationActions } from 'react-navigation';
import gql from 'graphql-tag';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
    Button,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import LoginMutation from '../../mutations/Login';
import PropTypes from 'prop-types';
import CurrentUser from '../../queries/CurrentUser';
import { Header } from '../../components/common/Header';
import fetchShop from '../../queries/fetchShop';
import testCartMutation from '../../mutations/testCartMutation';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 50,
    },
    inputContainer: {
        marginBottom: 20,
        marginTop: height / 16,
    },
    input: {
        height: 40,
        borderRadius: 4,
        marginVertical: 6,
        textAlign: 'center',
        padding: 6,
        backgroundColor: 'white',
        color: 'blue',
        borderWidth: 1,
    },
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
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 12,
    },
    switchAction: {
        paddingHorizontal: 4,
        color: 'blue',
    },
    submit: {
        marginVertical: 6,
    },
});


class SignIn extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            view: 'login',
            loading: false,
            email: '',
            password: ''
        };

        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.switchView = this.switchView.bind(this);
    }

    async componentWillMount() {



    }

    login() {

        const { email, password } = this.state;

        this.setState({
            loading: true
        })

        console.log("Email : " + email);
        console.log("Password : " + password);

        this.props.login({ email, password })
            .then((user) => {

                this.setState({
                    loading: false
                })

                if (user) {

                    console.log("User : " + JSON.stringify(user.data.signIn.jwt));
                    const { jwt } = user.data.signIn;
                    // Lets set the token to the AsyncStorage
                    AsyncStorage.setItem('JWT', jwt);

                    // Lets get inside of the application by resetting Navigation Stack
                    // so that the user will not be able to go back without Logout operation !!

                    NavigationActions.reset(
                        {
                            index: 0,
                            key: null,
                            actions: [
                                this.props.navigation.navigate('DrawerMainStack')
                            ]
                        }
                    )


                } else {

                    alert("Error occured !");

                }

            }).catch(err => {
                console.log("err occured due to the :" + err);
                this.setState({
                    loading: false
                });
                alert('Please enter correct credentials !');
            })

    }

    signup() {

    }



    switchView() {
        this.setState({
            view: this.state.view === 'signup' ? 'login' : 'signup',
        });
    }

    render() {

        const { view } = this.state;

        return (
            <KeyboardAvoidingView
                behavior={'padding'}
                style={styles.container}
            >
                {this.state.loading ?
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator />
                    </View> : undefined}

                <Header header={view === 'signup' ? 'Sign Up !' : 'Sign In !'} />

                <View style={styles.inputContainer}>
                    <TextInput
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        selectTextOnFocus
                        clearTextOnFocus
                        onChangeText={email => this.setState({ email })}
                        placeholder={'Email'}
                        placeholderTextColor={'black'}
                        style={styles.input}
                    />
                    <TextInput
                        onChangeText={password => this.setState({ password })}
                        placeholder={'Password'}
                        placeholderTextColor={'black'}
                        secureTextEntry
                        selectTextOnFocus
                        clearTextOnFocus
                        style={styles.input}
                    />
                </View>
                <Button
                    onPress={this[view]}
                    style={styles.submit}
                    title={view === 'signup' ? 'Sign up' : 'Login'}
                    disabled={this.state.loading
                        //|| !!this.props.auth.jwt 
                        || (this.state.email == '' && this.state.password == '')}
                />
                <View style={styles.switchContainer}>
                    <Text>
                        {view === 'signup' ?
                            'Already have an account?' : 'New to the app?'}
                    </Text>
                    <TouchableOpacity
                        onPress={this.switchView}
                    >
                        <Text style={styles.switchAction}>
                            {view === 'login' ? 'Sign up' : 'Login'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )

    }

}

const login = graphql(LoginMutation, {
    props: ({ mutate }) => ({
        login: (user) =>
            mutate({
                variables: { email: user.email, password: user.password },
                refetchQueries: [{ query: fetchShop }],
                update: (proxy, { data: { signIn } }) => {

                    console.log("USSER : " + JSON.stringify(signIn))

                    const query = gql`     {                 
                            user{
                                id
                                email
                                jwt
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
                    `;
                    proxy.writeQuery({ query: query, data: { user: signIn } })
                }
            }),
    }),
});

export default compose(withApollo, login)(SignIn);