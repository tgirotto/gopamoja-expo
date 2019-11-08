import React from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet  } from 'react-native';
import { connect } from "react-redux";
import moment from "moment";

class ImageListItem extends React.PureComponent {
  constructor(props){
    super(props);
  }

  render() {
    console.log('rendering');
    return (
      <View style={styles.card}>
        <Image
         style={{width: '100%', height: '100%'}}
         source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006_edit_1.jpg'}}
         resizeMode={'cover'} // cover or contain its upto you view look
         />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'row'
  }
});


export default connect(null, null)(ImageListItem)
