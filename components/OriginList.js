import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import OriginListItem from './OriginListItem';

export default class OriginList extends Component {
  constructor(props){
    super(props);
  }

  _keyExtractor = (item, index) => {
    return JSON.stringify(item.id)
  };

  _renderItem = ({item}) => {
    return (
      <OriginListItem
        navigation={this.props.navigation}
        id={item.id}
        name={item.name}
      />
  )};

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>ALL</Text>
        <FlatList
          data={this.props.origins}
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
