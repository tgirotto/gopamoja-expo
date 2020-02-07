import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Image, Text, View } from 'react-native';
import ColumnList from './ColumnList';
import { connect } from "react-redux";

const uuidv1 = require('uuid/v1');

class RowList extends Component {
  constructor(props){
    super(props);
  }

  _keyExtractor = (item, index) => {
    return uuidv1();
  };

  _renderItem = ({item, index}) => {
    return (
      <ColumnList columns={item} row={index}/>
  )};

  render() {
    return (
      <View style={{flex:1, flexDirection: 'row'}}>
        <FlatList
          data={this.props.rows}
          extraData={this.props.seat}
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
  },
  image: {
    width: 50,
    height: 50
  }
})

const mapStateToProps = (state) => {
  return {
    seat: state.layout.seat
  }
};

export default connect(mapStateToProps, null)(RowList)
