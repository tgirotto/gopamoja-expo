import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, ActivityIndicator, Text, View, StyleSheet} from 'react-native';
import QuantityList from '../components/QuantityList';
import { } from "../redux/actions";
import { connect } from "react-redux";

class QuantityPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.journeylist}>
          <QuantityList quantities={this.props.quantities} navigation={this.props.navigation}></QuantityList>
        </View>
      </ScrollView>
    );
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
    quantities: state.search.quantities
  }
};

const mapDispatchToProps = {
  // loadOrigins: loadOrigins,
  // loadPopularOrigins: loadPopularOrigins,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuantityPage)
