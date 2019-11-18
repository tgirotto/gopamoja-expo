import React, { Component } from 'react';
import { Linking, TouchableOpacity, Button, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { toggleTicketSaleModal, cancelTicketRequest, setSearchDate, clearJourneys, startLoadingJourneys } from "../redux/actions";
import { connect } from "react-redux";
import moment from "moment";

class JourneyButtons extends Component {
  constructor(props){
      super(props);

      // this.cancel = this.cancel.bind(this);
      this.previous = this.previous.bind(this);
      this.next = this.next.bind(this);
  }

  previous() {
    this.props.clearJourneys();
    this.props.setSearchDate(moment(this.props.date).subtract(1, "days").toDate());
    this.props.startLoadingJourneys();
    this.props.navigation.navigate('Journeys');
  }

  next() {
    this.props.clearJourneys();
    this.props.setSearchDate(moment(this.props.date).add(1, "days").toDate());
    this.props.startLoadingJourneys();
    this.props.navigation.navigate('Journeys');
  }

  call() {0
   Linking.openURL('tel:${1234567890}');
  }

  extractDate(string) {
    return moment(new Date(string)).format("DD MMM")
  }

  render() {
    return (
      <View style={styles.buttoncontainer}>
        <TouchableOpacity onPress={this.previous} style={styles.icon}>
            <Ionicons name="ios-arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.date}>{this.extractDate(this.props.date)}</Text>
        <TouchableOpacity onPress={this.next} style={styles.icon}>
            <Ionicons name="ios-arrow-forward" size={28} color="black" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttoncontainer: {
   flex: 1,
   flexDirection: 'row',
   paddingRight: 20
  },
  icon: {
    // paddingRight: 20
    textAlign: 'center',
    justifyContent: 'center'
  },
  date: {
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'black'
  }
})

const mapStateToProps = (state) => {
  return {
    date: state.search.date
  }
}

const mapDispatchToProps = {
  toggleTicketSaleModal: toggleTicketSaleModal,
  cancelTicketRequest: cancelTicketRequest,
  setSearchDate: setSearchDate,
  clearJourneys: clearJourneys,
  startLoadingJourneys: startLoadingJourneys
};

export default connect(mapStateToProps, mapDispatchToProps)(JourneyButtons)
