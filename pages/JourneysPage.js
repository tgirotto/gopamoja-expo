import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { connect } from "react-redux";
import { startLoadingJourneys, endLoadingJourneys, setPhone, resetJourneys } from "../redux/actions";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import JourneyList from '../components/JourneyList';
import Footer from '../components/Footer';
import { CONFIG } from '../env.js';

class JourneysPage extends React.Component {
  constructor(props) {
    super(props)

    this.loadJourneys = this.loadJourneys.bind(this);
  }

  onPhoneChange(text) {
    this.props.setPhone(text)
  }

  loadJourneys() {
    this.props.startLoadingJourneys();

    let from = encodeURIComponent(this.props.from_id);
    let to = encodeURIComponent(this.props.to_id);
    let date = encodeURIComponent(this.props.date.toISOString());

    let location = this.props.location;
    let latitude, longitude;

    if(location['coords'] && location['coords']['latitude']) {
      latitude = location['coords']['latitude']
    } else {
      latitude = 0;
    }

    if(location['coords'] && location['coords']['longitude']) {
      longitude = location['coords']['longitude']
    } else {
      longitude = 0;
    }

    latitude = encodeURIComponent(latitude);
    longitude = encodeURIComponent(longitude);

    const url = CONFIG.api +
    "/journeys?date=" + date +
    "&origin_id=" + from +
    "&destination_id=" + to +
    "&latitude=" + latitude +
    "&longitude=" + longitude;

    fetch(
      url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    .then((response) => response.json())
    .then((response) => {
      if(response.err) {
        console.log(response.err);
      } else {
        // this.props.resetJourneys();
        this.props.endLoadingJourneys(response.journeys);
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }

  componentWillMount() {
    this.loadJourneys();
  }

  componentDidUpdate() {
    if(this.props.loading_journeys) {
      this.loadJourneys();
    }
  }

  submit() {
    this.props.navigation.navigate('CustomSearchConfirmation');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.journeyheader}>
            <View style={styles.group}>
              <Text style={styles.journeyheaderlabel}>From</Text>
              <Text style={styles.journeyheadercontent}>
                {this.props.from_name}
              </Text>
            </View>
            <View style={styles.group}>
              <Text style={styles.journeyheaderlabel}>To</Text>
              <Text style={styles.journeyheadercontent}>
                {this.props.to_name}
              </Text>
            </View>
          </View>
          <View style={styles.journeylist}>
            {this.props.loading_journeys &&
            <ActivityIndicator animating = {true} size="large" color="black" />}
            {(this.props.journeys.length > 0) &&
            <JourneyList journeys={this.props.journeys} navigation={this.props.navigation}></JourneyList>}
            {(!this.props.loading_journeys && this.props.journeys.length < 1) &&
            <View style={styles.nojourneyscontainer}>
              <View style={styles.nojourneyscontent}>
                <Text style={styles.nojourneys}>We could not find the journey you are looking for you in our records. However, you can leave your phone number below. We will do a custom search and get back to you within 30 minutes.</Text>
              </View>
              <Text style={styles.detailslabel}>Phone</Text>
              <TextInput
                keyboardType="phone-pad"
                style={styles.detailsinput}
                onChangeText={text => this.onPhoneChange(text)}
              />
              <TouchableOpacity onPress={() => {this.submit()}}>
                <Text style={styles.submit}>SEND</Text>
              </TouchableOpacity>
            </View>
          }
          </View>
          <Footer></Footer>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  journeyheader: {
    padding: 20,
    fontSize: 18,
  },
  journeyheadercontent: {
    fontSize: 20,
    fontFamily: 'varela-round',
    color: 'black'
  },
  journeylist: {
    minHeight: vh(100)
  },
  group: {
    marginBottom: 20
  },
  journeyheaderlabel: {
    fontFamily: 'varela-round',
    color: 'black'
  },
  nojourneyscontainer : {
    padding: 20
  },
  nojourneyscontent: {
    marginBottom: 10,
    padding: 20,
    backgroundColor: '#fef3cd',
  },
  nojourneys: {
    color: '#856421',
    fontFamily: 'varela-round',
    fontSize: 20
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
    from_id: state.search.from_id,
    to_id: state.search.to_id,
    from_name: state.search.from_name,
    to_name: state.search.to_name,
    date: state.search.date,
    journeys: state.journeys.journeys,
    loading_journeys: state.journeys.loading_journeys,
    location: state.search.location
  }
};

const mapDispatchToProps = {
  startLoadingJourneys: startLoadingJourneys,
  endLoadingJourneys: endLoadingJourneys,
  setPhone: setPhone,
  resetJourneys: resetJourneys
};

export default connect(mapStateToProps, mapDispatchToProps)(JourneysPage)
