import React, { Component } from 'react';
import Footer from '../components/Footer';
import { ScrollView, TouchableOpacity, ActivityIndicator, Text, View, StyleSheet} from 'react-native';
import { loadTicketConfirmation } from "../redux/actions";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { connect } from "react-redux";
import { CONFIG } from '../env.js';

class PaymentPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  finish() {
    this.props.navigation.navigate('Finish');
  }

  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.paymentsectiontitle}>To pay for the ticket, please follow these steps:</Text>
          <View style={styles.paymentgroup}>
            <Text style={styles.paymenttitle}>Mpesa</Text>
            <Text style={styles.paymentrow}>1. Dial *150*00#</Text>
            <Text style={styles.paymentrow}>2. 4. Pay through M-PESA</Text>
            <Text style={styles.paymentrow}>3. 4. Insert company number</Text>
            <Text style={styles.paymentrow}>4. Insert this number  "220044"</Text>
            <Text style={styles.paymentrow}>5. Insert reference number (Meter number): {this.props.reference_number}</Text>
            <Text style={styles.paymentrow}>6. Insert amount: TSh {this.props.amount}</Text>
            <Text style={styles.paymentrow}>7. Insert your password</Text>
            <Text style={styles.paymentrow}>8. 1</Text>
          </View>
          <View style={styles.paymentgroup}>
            <Text style={styles.paymenttitle}>Tigopesa</Text>
            <Text style={styles.paymentrow}>1. Dial *150*01#</Text>
            <Text style={styles.paymentrow}>2. 4. Pay Bill</Text>
            <Text style={styles.paymentrow}>3. 3. Insert company number</Text>
            <Text style={styles.paymentrow}>4. Insert this number "220044"</Text>
            <Text style={styles.paymentrow}>5. Insert reference number (Meter number): {this.props.reference_number}</Text>
            <Text style={styles.paymentrow}>6. Insert amount: TSh {this.props.amount}</Text>
            <Text style={styles.paymentrow}>7. Insert your password</Text>
            <Text style={styles.paymentrow}>8. 1</Text>
          </View>
          <TouchableOpacity onPress={() => {this.finish()}}>
            <Text style={styles.submit}>PAID</Text>
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
  paymentgroup: {
    marginBottom: 20
  },
  paymentsectiontitle: {
    fontFamily: 'varela-round',
    marginBottom: 20,
    color: 'black',
    fontSize: 20
  },
  paymenttitle: {
    fontFamily: 'varela-round',
    marginBottom: 10,
    color: 'black',
    fontSize: 18
  },
  paymentrow: {
    fontFamily: 'varela-round',
    marginBottom: 10,
    color: 'black',
    fontSize: 16
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage)
