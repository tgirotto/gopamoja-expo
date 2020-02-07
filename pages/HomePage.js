import React, { Component } from 'react';
import * as Font from 'expo-font';
import Footer from '../components/Footer';
import { Platform,
  AppState,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  DatePickerAndroid,
  DatePickerIOS} from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import {
  initialisePassengers,
  loadOriginsDestinations,
  loadPopularOriginsDestinations,
  setSearchDate,
  setSearchLocation,
  resetJourneys,
  resetLayout
} from "../redux/actions";
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import moment from 'moment'
import { connect } from "react-redux";

// import { CONFIG } from '../env.js';

class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fontLoaded: false,
      showIOSPicker: false
    }

    // this.setSearchDate = this.setSearchDate.bind(this);
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.props.setSearchLocation(location);
  };

  async componentDidMount() {
    await Font.loadAsync({
      'varela-round': require('../assets/fonts/VarelaRound-Regular.ttf'),
    });

    this.setState({
      fontLoaded: true
    });
  }

  async openDatePicker() {
    try {
      if(Platform.OS === 'ios') {
        this.setState({showIOSPicker: !this.state.showIOSPicker})
      } else {
        const { action, year, month, day } = await DatePickerAndroid.open({
          // Use `new Date()` for current date.
          // May 25 2020. Month 0 is January.
          date: this.props.date
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          // Selected year, month (0-11), day
          this.props.setSearchDate(new Date(year, month, day));
        }
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }

  extractDate() {
    return moment(this.props.date).format('DD/MM/YYYY')
  }

  search() {
    this.props.resetJourneys();
    this.props.resetLayout();
    this.props.navigation.navigate('Journeys');
  }

  render() {
    var showIOSPicker = (Platform.OS === 'ios' && this.state.showIOSPicker) ?
      <View style={styles.box1}>
        <DatePickerIOS
                  style={{ height: 200, width: vw(100) }}
                  date={this.props.date} onDateChange={(date)=>this.props.setSearchDate(date)}
                  mode="date"/>
        <TouchableOpacity onPress={() => this.setState({showIOSPicker: !this.state.showIOSPicker})}>
          <Text style={styles.iospickerbtn}>OK</Text>
        </TouchableOpacity>
      </View>: <View />;
    return this.state.fontLoaded ? (
      <View style={styles.container}>
        {showIOSPicker}
        <ScrollView>
          <View style={styles.search}>
            <View style={styles.searchgroup}>
              <Text style={styles.label}>From</Text>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('From')}}>
                <Text style={styles.input}>{this.props.from_name}</Text>
              </TouchableOpacity>
              <Text style={styles.label}>To</Text>
              <TouchableOpacity onPress={() => {this.props.navigation.navigate('To')}}>
                <Text style={styles.input}>{this.props.to_name}</Text>
              </TouchableOpacity>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity onPress={() => {this.openDatePicker()}}>
                <Text style={styles.input}>{this.extractDate()}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {this.search()}}>
                <Text style={styles.submit}>SEARCH</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tutorial}>
              <View style={styles.tutorialHeader}>
                <Text style={styles.tutorialHeaderText}>How it works</Text>
              </View>
              <View style={styles.tutorialBody}>
                <View style={styles.tutorialBodyRow}>
                  <Text style={styles.tutorialStepLeft}>1.</Text>
                  <Text style={styles.tutorialStepRight}>Search the bus ticket prices all across Tanzania.</Text>
                </View>
                <View style={styles.tutorialBodyRow}>
                  <Text style={styles.tutorialStepLeft}>2.</Text>
                  <Text style={styles.tutorialMiddleStepRight}>Compare the fastest and cheapest routes from 60+ partners.</Text>
                </View>
                <View style={styles.tutorialBodyRow}>
                  <Text style={styles.tutorialStepLeft}>3.</Text>
                  <Text style={styles.tutorialStepRight}>Pay with mobile money and get customer support 7 days a week.</Text>
                </View>
              </View>
            </View>
          </View>
          <Footer></Footer>
        </ScrollView>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    zIndex: 0
  },
  search: {
    backgroundColor: '#ffcb37',
  },
  searchgroup: {
    padding: 20
  },
  box1: {
    zIndex: 1,
    position: 'absolute',
    flex: 1,
    flexDirection: 'column',
    height: vh(100) - 50,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  submit: {
    padding: 10,
    fontSize: 18,
    backgroundColor: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  iospickerbtn: {
    // backgroundColor: 'black',
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    padding: 20,
    fontSize: 20
  },
  input: {
    fontFamily: 'varela-round',
    backgroundColor: '#e0b63f',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 24,
    marginBottom: 30,
    borderRadius: 5,
    color: 'black',
    zIndex: 0
  },
  tutorial: {
    flexDirection: 'column',
    minHeight: vh(50) - 50,
    flex: 1,
    backgroundColor: 'white',
  },
  tutorialHeader: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
  },
  tutorialHeaderText: {
    fontFamily: 'varela-round',
    fontSize: 24,
    color: 'black'
  },
  tutorialBody: {
    padding: 20
  },
  tutorialBodyRow: {
    flexDirection: 'row',
    flex: 1,
  },
  tutorialStepLeft: {
    paddingTop: 20,
    textAlign: 'center',
    flex: 0.2,
    fontFamily: 'varela-round',
    fontSize: 18,
    color: 'black'
  },
  tutorialMiddleStepRight: {
    borderTopColor: '#eee',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flex: 0.8,
    fontFamily: 'varela-round',
    fontSize: 16,
    paddingBottom: 20,
    paddingTop: 20,
    color: 'black'
  },
  tutorialStepRight: {
    flex: 0.8,
    fontFamily: 'varela-round',
    fontSize: 16,
    paddingBottom: 20,
    paddingTop: 20,
    color: 'black'
  },
  label: {
    fontFamily: 'varela-round',
    color: 'black'
  }
})

const mapStateToProps = (state) => {
  return {
    from_name: state.search.from_name,
    to_name: state.search.to_name,
    date: state.search.date,
    quantity: state.search.quantity
  }
};

const mapDispatchToProps = {
  loadOriginsDestinations: loadOriginsDestinations,
  loadPopularOriginsDestinations: loadPopularOriginsDestinations,
  setSearchDate: setSearchDate,
  resetJourneys: resetJourneys,
  initialisePassengers: initialisePassengers,
  setSearchLocation: setSearchLocation,
  resetLayout: resetLayout
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
