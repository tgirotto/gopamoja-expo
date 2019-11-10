import React, { Component } from 'react';
import Footer from '../components/Footer';
import { ScrollView, TouchableOpacity, Keyboard, TextInput, Text, View, StyleSheet} from 'react-native';
import DetailList from '../components/DetailList';
import { setDetails, setFirstName, setLastName, setPhone, setPromo } from "../redux/actions";
import { connect } from "react-redux";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

class DetailsPage extends React.Component {
  constructor(props) {
    super(props)
  }

  onFirstNameChange(text) {
    this.props.setFirstName(text)
  }

  onLastNameChange(text) {
    this.props.setLastName(text)
  }

  onPhoneChange(text) {
    this.props.setPhone(text)
  }

  onPromoChange(text) {
    this.props.setPromo(text)
  }

  submit() {
    this.props.navigation.navigate('Confirmation');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.group}>
              <Text style={styles.detailslabel}>First name</Text>
              <TextInput
                style={styles.detailsinput}
                onChangeText={text => this.onFirstNameChange(text)}
              />
            </View>
            <View style={styles.group}>
              <Text style={styles.detailslabel}>Last name</Text>
              <TextInput
                style={styles.detailsinput}
                onChangeText={text => this.onLastNameChange(text)}
              />
            </View>
            <View style={styles.group}>
              <Text style={styles.detailslabel}>Phone</Text>
              <TextInput
                keyboardType="phone-pad"
                style={styles.detailsinput}
                onChangeText={text => this.onPhoneChange(text)}
              />
            </View>
            <View style={styles.warningcontainer}>
              <Text style={styles.warningcontent}>
                If the phone number is incorrect, we will not be able to contact you.
              </Text>
            </View>
            <TouchableOpacity onPress={() => {this.submit()}}>
              <Text style={styles.submit}>NEXT</Text>
            </TouchableOpacity>
          </View>
          <Footer></Footer>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  content : {
    padding: 20,
    minHeight: vh(100)
  },
  group: {
    marginBottom: 20,
  },
  detailslabel: {
    marginBottom: 10,
    fontSize: 18,
    color: 'black'
  },
  detailsinput: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    fontFamily: 'varela-round',
    color: 'black'
  },
  warningcontainer: {
    backgroundColor: '#fef3cd',
    padding: 20,
  },
  warningcontent: {
    color: '#856421',
    fontFamily: 'varela-round',
    fontSize: 20
  },
  submit: {
    marginTop: 20,
    padding: 10,
    fontSize: 18,
    backgroundColor: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white'
  },
})

const mapStateToProps = (state) => {
  return {
    first_name: state.details.first_name,
    last_name: state.details.last_name,
    phone: state.details.phone,
    promo: state.details.promo
  }
};

const mapDispatchToProps = {
  setFirstName: setFirstName,
  setLastName: setLastName,
  setPhone: setPhone,
  setPromo: setPromo
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage)
