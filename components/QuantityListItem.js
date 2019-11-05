import React from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet  } from 'react-native';
import { setSearchQuantity } from "../redux/actions";
import { connect } from "react-redux";


class DestinationListItem extends React.PureComponent {
  constructor(props){
    super(props);
    this.setTo = this.setTo.bind(this);
  }

  setTo() {
    this.props.setSearchQuantity(this.props.item);
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <TouchableOpacity onPress={() => {this.setTo()}} style={styles.container}>
        <Text style={styles.text}>{this.props.item}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f4f4f4'
  },
  text: {
    textAlign: 'center',
    flex: 1,
    fontSize: 18,
    fontFamily: 'varela-round'
  }
});

const mapDispatchToProps = {
  setSearchQuantity: setSearchQuantity
};

export default connect(null, mapDispatchToProps)(DestinationListItem)
