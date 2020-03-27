import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, PanResponder, Animated } from 'react-native';

export default class ViewItems2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY({ x: 0, y: 0 }),
            showDraggable: true,
        }
        this.val = { x: 0, y: 0 }
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderGrant: (e, gesture) => {
                this.state.pan.setOffset({
                    x: this.val.x,
                    y: this.val.y
                })
                this.state.pan.setValue({ x: 0, y: 0 })
            },
            onPanResponderMove: Animated.event([
                null, { dx: this.state.pan.x, dy: this.state.pan.y }
            ]),
            onPanResponderRelease: (e, gesture) => {
                this.drag(gesture);
                Animated.spring(this.state.pan, {
                    toValue: { x: 0, y: 0 },
                    friction: 5
                }).start();
            }
        });
    }
    drag = (gesture) => {
        let { position, positionFlatList } = this.props;
        console.log('Cuong', positionFlatList)
        let y = gesture.moveY - positionFlatList;
        let arrFilter = position.filter((item, index) => {
            if (y > item.Y && y < item.Y + item.height) {return item}
        });
        if(arrFilter[0]){
            this.setDrag(arrFilter[0], y);
        }
    }
    setDrag = (data, y) => {
        let { onClick1, item, index } = this.props;
        console.log('arr', data);
        if (data.Y && y > data.Y && y < (data.Y + data.height)) {
            onClick1(item, index, data.positionIndex);
        }
    }
    render() {
        let { id, title } = this.props.item;
        const panStyle = {
            transform: this.state.pan.getTranslateTransform()
        }
        return (
            <Animated.View style={[styles.view1, panStyle]}
                {...this.panResponder.panHandlers}
            >
                <Text style={styles.text}>{title}</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    view1: {
        width: Dimensions.get('window').width / 2 - 40,
        backgroundColor: 'lightblue', marginTop: 20, marginLeft: 15, marginRight: 15,
        borderRadius: 5, borderColor: 'black', borderWidth: 1
    },
    text: {
        fontSize: 11, color: 'black', margin: 5, textAlign: 'center'
    }
})