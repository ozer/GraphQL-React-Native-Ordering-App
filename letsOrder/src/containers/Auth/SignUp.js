import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmpass: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Let's Order Sign Up </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: height / 20,
  },
});

function mapStateToProps(state) {
  return {
    data: state.auth,
  };
}


export default SignUp;
