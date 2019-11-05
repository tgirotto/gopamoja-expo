import React from 'react';
import { Platform, Image, TouchableOpacity, Text, View, StyleSheet  } from 'react-native';
import { connect } from "react-redux";
import { Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class Footer extends React.PureComponent {
  constructor(props){
    super(props);
  }

  phoneCall() {
    let phone = '+255762906525', phoneNumber;
    if(Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else  {
      phoneNumber = `tel:${phone}`;
    }

    Linking.openURL(phoneNumber);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.content} onPress={() => { this.phoneCall() }}>
          <Text style={styles.contentText}>
            <Ionicons name="ios-call" size={28} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#212b33',
    flexDirection: 'row',
    flex: 1
  },
  content: {
    flex: 1
  },
  contentText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontFamily: 'varela-round',
  }
});

const mapDispatchToProps = {

};

export default connect(null, null)(Footer)
