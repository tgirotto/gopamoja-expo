import React, { Component } from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Image, Text, View } from 'react-native';
import { selectSeat } from "../redux/actions";
import { connect } from "react-redux";
const uuidv1 = require('uuid/v1');

class ColumnList extends Component {
  constructor(props){
    super(props);
  }

  onPress(item, column) {
    if(item != 'a') {
      return;
    }

    this.setState({
      column : column
    })

    this.props.selectSeat(this.props.row, column)
  }

  seatStyle(item, row, column) {
    let style = {
      width: 50,
      height: 50
    }

    if(row === this.props.seat.row && column === this.props.seat.column) {
      style['tintColor'] = 'green';
    } else if(item === 'a') {
      style['tintColor'] = 'black';
    } else if(item === 'b') {
      style['tintColor'] = 'red';
    } else if(item === 'u') {
      style['tintColor'] = 'grey';
    }

    return style;
  }

  _keyExtractor = (item, index) => {
    return uuidv1();
  };

  _renderItem = ({item, index}) => {
    if(item == " ") {
      return (
        <Image
          source={require('../assets/images/space.png')}
          style={styles.space}/>
      )
    } else {
      return (
        <TouchableOpacity onPress={() => { this.onPress(item, index) }}>
          <Image
            source={require('../assets/images/seat_black.png')}
            style={this.seatStyle(item, this.props.row, index)}/>
        </TouchableOpacity>
      )
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          horizontal={true}
          data={this.props.columns}
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
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flexDirection: 'row',
    flex:1
  },
  space: {
    width: 30,
    height: 50
  }
})

const mapStateToProps = (state) => {
  return {
    seat: state.layout.seat
  }
};

const mapDispatchToProps = {
  selectSeat: selectSeat
};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnList)
