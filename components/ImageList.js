import React, { Component } from 'react';
import { Platform, AppRegistry, FlatList, StyleSheet, Image, Text, View } from 'react-native';
import ImageListItem from './ImageListItem';

export default class UpcomingList extends Component {
  constructor(props){
    super(props);
  }

  _keyExtractor = (item, index) => {
    console.log(item);
    return JSON.stringify(item.id)
  };

  _renderItem = ({item}) => {
    return (
      <ImageListItem
      image={item}/>
  )};

  render() {
    return (
      <View style={{flex:1, flexDirection: 'row'}}>
        <FlatList
          data={this.props.images}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container :{
    flexDirection: 'column',
    flex:1
  }
})
