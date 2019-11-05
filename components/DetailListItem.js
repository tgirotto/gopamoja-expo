import React from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet  } from 'react-native';
import { setSearchTo } from "../redux/actions";
import { connect } from "react-redux";


class DestinationListItem extends React.PureComponent {
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
      <View style={styles.card}>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>First name</Text>
          <TextInput
              style={styles.input}
              onChangeText={text => this.onFirstNameChange(text)}
              value={this.props.first_name}
              onSubmitEditing={Keyboard.dismiss}
            />
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>Last name</Text>
          <TextInput
              style={styles.input}
              onChangeText={text => this.onLastNameChange(text)}
              value={this.props.last_name}
              onSubmitEditing={Keyboard.dismiss}
            />
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
              style={styles.input}
              onChangeText={text => this.onPhoneChange(text)}
              value={this.props.phone}
              onSubmitEditing={Keyboard.dismiss}
            />
        </View>
        <View style={styles.detailsRow}>
          <Text style={styles.label}>Promo</Text>
          <TextInput
              style={styles.input}
              onChangeText={text => this.onPromoChange(text)}
              value={this.props.promo}
              onSubmitEditing={Keyboard.dismiss}
            />
        </View>
      </View>
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
    fontSize: 18,
    fontFamily: 'varela-round'
  }
});

const mapDispatchToProps = {
  setSearchTo: setSearchTo
};

export default connect(null, mapDispatchToProps)(DestinationListItem)
