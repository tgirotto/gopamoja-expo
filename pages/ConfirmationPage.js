import React, { Component } from 'react';
import Footer from '../components/Footer';
import { ScrollView, TouchableOpacity, ActivityIndicator, Text, View, StyleSheet} from 'react-native';
import { loadTicketConfirmation } from "../redux/actions";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import { connect } from "react-redux";
import { CONFIG } from '../env.js';

class ConfirmationPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    const body = {
      segment_id: this.props.segment_id,
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      phone: this.props.phone,
      date: this.props.date,
      seat: this.props.seat
    }

    fetch(CONFIG.api + '/ticket_request' , {
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
        this.props.loadTicketConfirmation(response.ticket_request, response.journey, response.transaction, response.service_charge);
      }

      this.setState({
        loading: false
      })
    })
    .catch((error) => {
      console.log(error)
    });
  }

  pay() {
    this.props.navigation.navigate('Payment');
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
            <Text style={styles.confirmationtitle}>
              Ticket confirmation
            </Text>
            <View style={styles.confirmationcontainer}>
              <View style={styles.row}>
                <View style={styles.colleft}>
                  <Text style={styles.textleft}>
                    First name
                  </Text>
                </View>
                <View style={styles.colright}>
                  <Text style={styles.textright}>
                    {this.props.confirmation_first_name}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.colleft}>
                  <Text style={styles.textleft}>
                    Last name
                  </Text>
                </View>
                <View style={styles.colright}>
                  <Text style={styles.textright}>
                    {this.props.confirmation_last_name}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.colleft}>
                  <Text style={styles.textleft}>
                    Phone
                  </Text>
                </View>
                <View style={styles.colright}>
                  <Text style={styles.textright}>
                    {this.props.confirmation_phone}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.colleft}>
                  <Text style={styles.textleft}>
                    From
                  </Text>
                </View>
                <View style={styles.colright}>
                  <Text style={styles.textright}>
                    {this.props.confirmation_from}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.colleft}>
                  <Text style={styles.textleft}>
                    To
                  </Text>
                </View>
                <View style={styles.colright}>
                  <Text style={styles.textright}>
                    {this.props.confirmation_to}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.colleft}>
                  <Text style={styles.textleft}>
                    Departure day
                  </Text>
                </View>
                <View style={styles.colright}>
                  <Text style={styles.textright}>
                    {this.props.confirmation_departure_day}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.colleft}>
                  <Text style={styles.textleft}>
                    Departure time
                  </Text>
                </View>
                <View style={styles.colright}>
                  <Text style={styles.textright}>
                    {this.props.confirmation_departure_time}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.colleft}>
                  <Text style={styles.textleft}>
                    Arrival day
                  </Text>
                </View>
                <View style={styles.colright}>
                  <Text style={styles.textright}>
                    {this.props.confirmation_arrival_day}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.colleft}>
                  <Text style={styles.textleft}>
                    Arrival time
                  </Text>
                </View>
                <View style={styles.colright}>
                  <Text style={styles.textright}>
                    {this.props.confirmation_arrival_time}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.colleft}>
                  <Text style={styles.textleft}>
                    Price
                  </Text>
                </View>
                <View style={styles.colright}>
                  <Text style={styles.textright}>
                    TSh {this.props.confirmation_price}
                  </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.colleft}>
                  <Text style={styles.textleft}>
                    Service charge
                  </Text>
                </View>
                <View style={styles.colright}>
                  <Text style={styles.textright}>
                    TSh {this.props.confirmation_service_charge}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => {this.pay()}}>
              <Text style={styles.submit}>PAY</Text>
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
    first_name: state.details.first_name,
    last_name: state.details.last_name,
    phone: state.details.phone,
    segment_id: state.journeys.selected_journey.segment_id,
    seat: state.layout.seat,
    date: state.journeys.selected_journey.date,
    confirmation_first_name: state.ticket.first_name,
    confirmation_last_name: state.ticket.last_name,
    confirmation_phone: state.ticket.phone,
    confirmation_from: state.ticket.from,
    confirmation_to: state.ticket.to,
    confirmation_price: state.ticket.price,
    confirmation_departure_day: state.ticket.departure_day,
    confirmation_departure_time: state.ticket.departure_time,
    confirmation_arrival_day: state.ticket.arrival_day,
    confirmation_arrival_time: state.ticket.arrival_time,
    confirmation_reference_number: state.ticket.reference_number,
    confirmation_service_charge: state.ticket.service_charge
  }
};

const mapDispatchToProps = {
  loadTicketConfirmation: loadTicketConfirmation
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPage)
