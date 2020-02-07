import React from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet  } from 'react-native';
import { selectJourney, selectCompany } from "../redux/actions";
import { connect } from "react-redux";
import moment from "moment";

class JourneyListItem extends React.PureComponent {
  constructor(props){
    super(props);

    this.selectJourney = this.selectJourney.bind(this);
  }

  extractDate(datestring) {
    let hour = this.props.journey.departure_hour;
    let minute = this.props.journey.departure_minute;
    return moment(new Date()).set({hour:hour,minute:minute}).format('hh:mm A');
  }

  selectJourney() {
    this.props.selectJourney(this.props.journey);
    this.props.navigation.navigate('Seat');
  }

  openGallery() {
    this.props.selectCompany(this.props.journey.company_id);
    this.props.navigation.navigate('Gallery')
  }

  render() {
    var wifi = (this.props.journey.wifi) ?
      <Text style={styles.details}>WIFI</Text> : null

    var ac = (this.props.journey.ac) ?
      <Text style={styles.details}>AC</Text> : null

    return (
      <TouchableOpacity onPress={() => {this.selectJourney()}} style={styles.touchable}>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.top}>
              <View style={styles.left}>
                <TouchableOpacity onPress={() => {this.openGallery()}}>
                    <Text style={styles.company}>{this.props.journey.company_name}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.right}>
                <Text style={styles.seats}>{this.props.journey.available_seats} available</Text>
                {wifi}
                {ac}
              </View>
            </View>
            <View style={styles.bottom}>
              <View style={styles.left}>
                <Text style={styles.date}>{this.extractDate(this.props.journey.date)}</Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.price}>TSh {this.props.journey.price}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touchable: {
    padding: 10
  },
  card: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  top: {
    flexDirection: 'row',
    flex: 0.5,
    paddingBottom: 10
  },
  bottom: {
    flexDirection: 'row',
    flex: 0.5,
    paddingBottom: 10
  },
  left: {
    flex: 0.6
  },
  right: {
    flex: 0.4,
    flexDirection: 'row',
    textAlign: 'center',
    justifyContent: 'flex-end',
  },
  company: {
    fontSize: 18,
    fontFamily: 'varela-round'
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'varela-round',
    color: 'black'
  },
  date: {
    fontSize: 18,
    color: 'grey',
    fontFamily: 'varela-round'
  },
  details: {
    paddingLeft: 5,
    fontSize: 12,
    fontFamily: 'varela-round'
  },
  seats: {
    paddingLeft: 5,
    fontSize: 12,
    fontFamily: 'varela-round',
    color: 'red'
  }
});

const mapDispatchToProps = {
  selectJourney: selectJourney,
  selectCompany: selectCompany
};

export default connect(null, mapDispatchToProps)(JourneyListItem)
