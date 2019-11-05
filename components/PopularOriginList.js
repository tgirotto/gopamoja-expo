import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import PopularOriginListItem from './PopularOriginListItem'
import { connect } from "react-redux";

class PopularOriginList extends Component {
  constructor(props){
    super(props);
  }

  _keyExtractor = (item, index) => {
    return JSON.stringify(item.id)
  };

  _renderItem = ({item}) => {
    return (
      <PopularOriginListItem
        navigation={this.props.navigation}
        id={item.id}
        name={item.name}
      />
  )};

  filter(array, type) {
    if(type == 'odd') {
      return array.filter(function(element, index, array) {return (index % 2 === 0)})
    } else if(type === 'even') {
      return array.filter(function(element, index, array) {return (index % 2 === 1)})
    }

    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>POPULAR</Text>
        <View style={styles.list}>
          <View style={styles.left}>
            <FlatList
              data={this.filter(this.props.popular_origins, 'odd')}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
          </View>
          <View style={styles.right}>
            <FlatList
              data={this.filter(this.props.popular_origins, 'even')}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
          </View>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
   flexDirection: 'column',
   borderBottomWidth: 1,
   borderBottomColor: '#f4f4f4'
 },
 list: {
   flexDirection: 'row',
   flex: 1
 },
 left: {
   padding: 20,
   fontSize: 18,
   flex: 0.5
 },
 right: {
   padding: 20,
   fontSize: 18,
   flex: 0.5
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

const mapStateToProps = (state) => {
  return {
    popular_origins: state.origins_destinations.popular_origins
  }
}

export default connect(mapStateToProps, null)(PopularOriginList)
