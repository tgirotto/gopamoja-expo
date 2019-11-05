import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import JourneyListItem from './JourneyListItem';

export default class UpcomingList extends Component {
  constructor(props){
    super(props);
  }

  _keyExtractor = (item, index) => {
    return JSON.stringify(item.id)
  };

  _renderItem = ({item}) => {
    return (
      <JourneyListItem
      navigation={this.props.navigation}
      journey={item}/>
  )};

  render() {
    console.log('rendering journeys');
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.journeys}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
})
