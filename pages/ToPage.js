import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, ActivityIndicator, Text, View, StyleSheet} from 'react-native';
import DestinationList from '../components/DestinationList';
import PopularDestinationList from '../components/PopularDestinationList'
import { loadDestinations, loadPopularDestinations } from "../redux/actions";
import { connect } from "react-redux";
import { CONFIG } from '../env.js';

class ToPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    if(this.props.destinations == null || this.props.destinations.length === 0) {
      fetch(CONFIG.api + '/destinations' , {
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
          this.props.loadDestinations(response.destinations);
          this.props.loadPopularDestinations(response.popular_destinations);
        }

        this.setState({
          loading: false
        })
      })
      .catch((error) => {
        console.log(error)
      });
    } else {
      this.setState({
        loading: false
      })
    }
  }

  render() {
    if(this.state.loading) {
      return (<ActivityIndicator animating = {true} size="large" color="black" />)
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>
            <PopularDestinationList popular_destinations={this.props.popular_destinations} navigation={this.props.navigation}></PopularDestinationList>
            <DestinationList destinations={this.props.destinations} navigation={this.props.navigation}></DestinationList>
          </ScrollView>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  popularcontainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4'
  },
  popularheader: {
    backgroundColor: '#d4d4d4',
    fontSize: 30,
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white'
  }
})

const mapStateToProps = (state) => {
  return {
    destinations: state.origins_destinations.destinations,
    popular_destinations: state.origins_destinations.popular_destinations
  }
};

const mapDispatchToProps = {
  loadDestinations: loadDestinations,
  loadPopularDestinations: loadPopularDestinations
};

export default connect(mapStateToProps, mapDispatchToProps)(ToPage)
