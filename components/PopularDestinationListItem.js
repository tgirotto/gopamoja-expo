import React from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet  } from 'react-native';
import { setSearchTo } from "../redux/actions";
import { connect } from "react-redux";

class PopularDestinationListItem extends React.PureComponent {
  constructor(props){
    super(props);
    this.setTo = this.setTo.bind(this);
  }

  setTo() {
    this.props.setSearchTo(this.props.id, this.props.name);
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <TouchableOpacity onPress={() => {this.setTo()}} style={styles.container}>
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
  setSearchTo: setSearchTo
};

export default connect(null, mapDispatchToProps)(PopularDestinationListItem)
