import React from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet  } from 'react-native';
import { setSearchFrom } from "../redux/actions";
import { connect } from "react-redux";

class PopularOriginListItem extends React.PureComponent {
  constructor(props){
    super(props);
    this.setFrom = this.setFrom.bind(this);
  }

  setFrom() {
    this.props.setSearchFrom(this.props.id, this.props.name);
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <TouchableOpacity onPress={() => {this.setFrom()}} style={styles.container}>
        <Text style={styles.text}>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10
  },
  text: {
    fontSize: 18,
    fontFamily: 'varela-round',
    color: 'black'
  }
});

const mapDispatchToProps = {
  setSearchFrom: setSearchFrom
};

export default connect(null, mapDispatchToProps)(PopularOriginListItem)
