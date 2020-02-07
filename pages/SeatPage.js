import React, { Component } from 'react';
import Footer from '../components/Footer';
import { ActivityIndicator, Image, ScrollView, TouchableOpacity, Keyboard, TextInput, Text, View, StyleSheet} from 'react-native';
import RowList from '../components/RowList';
import { CONFIG } from '../env.js';
import { connect } from "react-redux";
import { startLoadingLayout, endLoadingLayout } from "../redux/actions";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

class SeatPage extends React.Component {
  constructor(props) {
    super(props)
  }

  submit() {
    this.props.navigation.navigate('Confirmation');
  }

  loadLayout() {
    this.props.startLoadingLayout();
    let trip_id = encodeURIComponent(this.props.selected_journey.trip_id);
    let segment_id = encodeURIComponent(this.props.selected_journey.segment_id);
    let date = encodeURIComponent(this.props.date.toISOString());

    const url = CONFIG.api +
    "/layout?date=" + date +
    "&trip_id=" + trip_id +
    "&segment_id=" + segment_id

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
        this.props.endLoadingLayout(response.layout);
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }

  componentWillMount() {
    this.loadLayout();
  }

  componentDidUpdate() {
    // console.log(this.props);
  }

  done() {
    this.props.navigation.navigate('Details');
  }

  render() {
    console.log('===================');
    console.log(this.props.layout);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.rowlist}>
              {this.props.loading_layout &&
              <ActivityIndicator animating = {true} size="large" color="black" />}
              {!this.props.loading_layout &&
              <RowList rows={this.props.layout.split("\n")}></RowList>}
            </View>
            <TouchableOpacity onPress={() => {this.done()}}>
              <Text style={styles.submit}>DONE</Text>
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
  rowlist: {
    marginTop: 50,
    minHeight: vh(100)
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
    selected_journey: state.journeys.selected_journey,
    loading_layout: state.layout.loading_layout,
    layout: state.layout.layout,
    date: state.search.date,
    trip_id: state.journeys.selected_journey.trip_id,
    segment_id: state.journeys.selected_journey.segment_id
  }
};

const mapDispatchToProps = {
  startLoadingLayout: startLoadingLayout,
  endLoadingLayout: endLoadingLayout
};

export default connect(mapStateToProps, mapDispatchToProps)(SeatPage)
