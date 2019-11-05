import React, { Component } from 'react';
import Footer from '../components/Footer';
import { ScrollView, TouchableOpacity, ActivityIndicator, Text, View, StyleSheet} from 'react-native';
import { loadTicketConfirmation } from "../redux/actions";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { connect } from "react-redux";
import { CONFIG } from '../env.js';

class CustomSearchConfirmationPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    const body = {
      origin_name: this.props.origin_name,
      destination_name: this.props.destination_name,
      origin_id: this.props.origin_id,
      destination_id: this.props.destination_id,
      date: this.props.date,
      phone: this.props.phone
    }

    console.log(body);

    fetch(CONFIG.api + '/custom_search_request' , {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
    .then((response) => response.json())
    .then((response) => {
      if(response.err) {
        console.log(response.err);
      } else {
        // this.props.loadTicketConfirmation(response.ticket_request, response.journey, response.transaction, response.service_charge);
      }

      this.setState({
        loading: false
      })
    })
    .catch((error) => {
      console.log(error)
    });
  }

  home() {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={styles.container}>
      {this.state.loading &&
      <ActivityIndicator animating = {true} size="large" color="black" />}
      {!this.state.loading &&
        <ScrollView>
          <View style={styles.content}>
            <Text style={styles.confimationmessage}>
              Your request has been received. If the phone number is valid, one of our agents will get in touch with you shortly.
            </Text>
            <TouchableOpacity onPress={() => {this.home()}}>
              <Text style={styles.submit}>FINISH</Text>
            </TouchableOpacity>
          </View>
          <Footer></Footer>
        </ScrollView>}
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
  confimationmessage: {
    backgroundColor: 'yellow',
    marginBottom: 20,
    color: '#856421',
    fontFamily: 'varela-round',
    backgroundColor: '#fef3cd',
    padding: 20,
    fontSize: 18
  },
  confirmationtitle: {
    fontSize: 24,
    fontFamily: 'varela-round',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20
  },
  confirmationcontainer: {
    // padding: 20
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 10
  },
  colleft: {
    flex: 0.3,

  },
  colright: {
    flex: 0.7,
  },
  textleft: {
    fontSize: 16,
    fontFamily: 'varela-round',
    color: 'black'
  },
  textright: {
    fontSize: 18,
    textAlign: 'right',
    fontFamily: 'varela-round',
    color: 'black'
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
    origin_name: state.search.from_name,
    destination_name: state.search.to_name,
    origin_id: state.search.from_id,
    destination_id: state.search.to_id,
    date: state.search.date,
    phone: state.details.phone
  }
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, null)(CustomSearchConfirmationPage)
