import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, Text, Image, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { connect } from "react-redux";
import { startLoadingGallery, endLoadingGallery, resetGallery } from "../redux/actions";
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import ImageList from '../components/ImageList';
import Footer from '../components/Footer';
import { CONFIG } from '../env.js';

class GalleryPage extends React.Component {
  constructor(props) {
    super(props)

    this.loadImages = this.loadImages.bind(this);
  }

  loadImages() {
    this.props.startLoadingGallery();
    let companyId = encodeURIComponent(this.props.company_id);

    const url = CONFIG.api +
    "/images?company_id=" + companyId;

    fetch(
      url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    .then((response) => response.json())
    .then((response) => {
      if(response.err) {
        console.log(response.err);
      } else {
        this.props.endLoadingGallery(response.images);
      }
    })
    .catch((error) => {
      console.log(error)
    });
  }

  componentWillMount() {
    this.loadImages();
  }

  componentDidUpdate() {
    if(this.props.loading_images) {
      this.loadImages();
    }
  }

  render() {
    var imageList = (this.props.images.length > 0) ?
      <ImageList images={this.props.images}></ImageList>
      : <Text>No images available yet</Text>
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.journeylist}>
            {this.props.loading_images &&
            <ActivityIndicator animating = {true} size="large" color="black" />}
            {!this.props.loading_images && imageList}
          </View>
          <Footer></Footer>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  journeyheader: {
    padding: 20,
    fontSize: 18,
  },
  journeyheadercontent: {
    fontSize: 20,
    fontFamily: 'varela-round',
    color: 'black'
  },
  journeylist: {
    minHeight: vh(100),
  }
})

const mapStateToProps = (state) => {
  return {
    loading_images: state.gallery.loading_images,
    images: state.gallery.images,
    company_id: state.gallery.company_id
  }
};

const mapDispatchToProps = {
  startLoadingGallery: startLoadingGallery,
  endLoadingGallery: endLoadingGallery,
  resetGallery: resetGallery
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage)
