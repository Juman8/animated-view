import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

export default class ViewItems1 extends Component {
  getPosition = (event) => {
    let { position, id } = this.props;
    position(event.nativeEvent.layout.y, event.nativeEvent.layout.height, id)
  }
  render() {
    let { id, titleData } = this.props;
    return (
      <View
        style={styles.view1}
        onLayout={event => {
          this.getPosition(event)
        }}>
        <Text>{id + 1}</Text>
        <View style={[styles.view2,{backgroundColor: (titleData) ? 'lightblue' : '#FFFFFF' }]}>
            <Text numberOfLines = {2}>{titleData}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view1: {
    width: Dimensions.get('window').width,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center'
  },
  view2:{
      width: Dimensions.get('window').width - 120,
      height: 50, borderRadius: 20, borderWidth: 1,
      marginLeft: 10, justifyContent: 'center', alignItems: 'center', padding: 10
  }
});
