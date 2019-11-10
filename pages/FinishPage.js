import React, { Component } from 'react';
import Footer from '../components/Footer';
import { ScrollView, TouchableOpacity, ActivityIndicator, Text, View, StyleSheet} from 'react-native';
import { loadTicketConfirmation } from "../redux/actions";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { connect } from "react-redux";
import { CONFIG } from '../env.js';

class FinishPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  home() {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.message}>
            If your payment was successful, a GoPamoja agent will contact you in the next 15 minutes.
          </Text>
          <TouchableOpacity onPress={() => {this.home()}}>
            <Text style={styles.submit}>FINISH</Text>
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
    flex: 1,
  },
  content: {
    padding: 20,
    minHeight: vh(100)
  },
  message: {
    fontFamily: 'varela-round',
    marginBottom: 20,
    color: 'black',
    fontSize: 18
  },
  submit: {
    marginTop: 20,
    padding: 10,
    fontSize: 18,
    backgroundColor: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white'
  }
})

const mapStateToProps = (state) => {
  return {
    amount: state.ticket.amount,
    reference_number: state.ticket.reference_number
  }
};

const mapDispatchToProps = {
  loadTicketConfirmation: loadTicketConfirmation
};

export default connect(mapStateToProps, mapDispatchToProps)(FinishPage)
