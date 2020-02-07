import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, ActivityIndicator, Text, View, StyleSheet} from 'react-native';
import OriginList from '../components/OriginList';
import PopularOriginList from '../components/PopularOriginList'
import { loadOrigins, loadPopularOrigins } from "../redux/actions";
import { connect } from "react-redux";
import { CONFIG } from '../env.js';

class FromPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    if(this.props.origins == null || this.props.origins.length === 0) {
      fetch(CONFIG.api + '/origins' , {
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
          this.props.loadOrigins(response.origins);
          this.props.loadPopularOrigins(response.popular_origins);
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
      return (
        <ActivityIndicator animating = {true} size="large" color="black" />
      )
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>
            <PopularOriginList popular_origins={this.props.popular_origins} navigation={this.props.navigation}></PopularOriginList>
            <OriginList origins={this.props.origins} navigation={this.props.navigation}></OriginList>
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
    origins: state.origins_destinations.origins,
    popular_origins: state.origins_destinations.popular_origins
  }
};

const mapDispatchToProps = {
  loadOrigins: loadOrigins,
  loadPopularOrigins: loadPopularOrigins,
};

export default connect(mapStateToProps, mapDispatchToProps)(FromPage)
