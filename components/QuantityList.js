import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import QuantityListItem from './QuantityListItem';

export default class QuantityList extends Component {
  constructor(props){
    super(props);
  }

  _keyExtractor = (item, index) => {
    return JSON.stringify(item)
  };

  _renderItem = ({item}) => {
    return (
      <QuantityListItem
        navigation={this.props.navigation}
        item={item}
      />
  )};

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.quantities}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   flexDirection: 'column'
 },
 header: {
   backgroundColor: 'black',
   padding: 10,
   fontSize: 24,
   color: 'white',
   textAlign: 'center',
   justifyContent: 'center'
 }
})
