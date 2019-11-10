import React from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet  } from 'react-native';
import { CONFIG } from '../env.js';
import { connect } from "react-redux";

class ImageListItem extends React.PureComponent {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Image
        source={{uri: CONFIG.images + '/' + this.props.image.filename}}
        style={styles.image}/>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain'
  }
});

export default connect(null, null)(ImageListItem)
