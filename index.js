import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, YellowBox, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Data2 from './Data2';

import ViewItems1 from './ViewItems1';
import ViewItems2 from './ViewItems2';

export default class DragAndDropComponent extends Component {
    constructor(props) {
        super(props);
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
        console.disableYellowBox = true;
        this.state = {
            title1: 'Tính đạo hàm của hàm số',
            title2: 'Giải phương trình đạo hàm bằng 0',
            titleData: '',
            showView: false,
            positionXY: [],
            dataValue: [
                {
                    'title': 'Tính đạo hàm của hàm số'
                },
                {
                    'title': 'Tính gía trị của hàm số tại các nghiệm của đạo hàm và tại a,b'
                },
                {
                    'title': 'Vẽ bản biến thiên của hàm số'
                },
                {
                    'title': 'Tìm các nghiệm x 0 của mẫu số và tính giới hạn bên trái và bên phải của hàm số tại các nghiệm đó'
                },
                {
                    'title': 'Giải phương trình đạo hàm bằng 0'
                },
                {
                    'title': 'Dựa vào bảng biến thiên , nêu nhận xét về các khoảng đồng biến (nghịch biến) của hàm số'
                },
            ],
            dataValue2: [
                {
                    'id': 1,
                    'titleData': ''
                },
                {
                    'id': 2,
                    'titleData': ''
                },
                {
                    'id': 3,
                    'titleData': ''
                },
            ],
            positionYFlatList: null,
            positionIndex: null
        }
    }
    addValue1 = (value, index, positionIndex) => {
        const data = {
            'id': positionIndex,
            'titleData': value.title
        }
        const dataAdd = this.state.dataValue2.splice(positionIndex, 1, data)
        console.log('AAAAAA', dataAdd)
        this.setState({ showView: true })
    }
    getPosition = (value, value2, value3) => {
        const a = {
            'Y': value,
            'height': value2,
            'positionIndex': value3
        }
        this.setState({ positionXY: this.state.positionXY.concat(a) }, () => { console.log('Cuong2', this.state.positionXY) })
    }
    render() {
        return (
            <View style={styles.view1}>
                <Text style={styles.text}>Tìm lời giải chi tiết phù hợp với các bước giải của bài toán sau:</Text>
                <Text style={styles.text2}>Xét tính đồng biến, nghịch biến của hàm số y = 2x + 5</Text>
                <View
                    onLayout={event => {
                        event.persist();
                        this.setState({ positionYFlatList: event.nativeEvent.layout.y })
                    }}
                >
                    <FlatList
                        data={this.state.dataValue}
                        renderItem={({ item, index }) => {
                            return (
                                <ViewItems2 item={item}
                                    index={index}
                                    position={this.state.positionXY}
                                    positionFlatList={this.state.positionYFlatList}
                                    onClick1={(value, index, positionIndex) => { this.addValue1(value, index, positionIndex) }}
                                >
                                </ViewItems2>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        numColumns={2}
                        ListHeaderComponent={
                            <>
                                {this.state.dataValue2.map((item, index) => {
                                    return (
                                        <ViewItems1 title={item.title}
                                            id={index}
                                            key={index}
                                            position={(value, value2, value3) => { this.getPosition(value, value2, value3) }}
                                            titleData={item.titleData}
                                            show = {this.state.showView}
                                        >
                                        </ViewItems1>
                                    )
                                })
                                }
                            </>
                        }
                        ListFooterComponent={<View style={{ height: 20 }} />}
                    />
                </View>
                <View style={styles.viewButton}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text3}>Tiếp tục</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view1: {
        flex: 1, backgroundColor: '#FFFFFF'
    },
    text: {
        marginTop: 50, marginLeft: 15, marginRight: 15, fontSize: 16, color: 'black',
        fontWeight: 'bold'
    },
    text2: {
        marginTop: 10, marginLeft: 15,
        color: 'gray', fontSize: 12
    },
    text3: {
        color: 'black', fontSize: 16, fontWeight: 'bold'
    },
    viewButton: {
        width: Dimensions.get('window').width,
        alignItems: 'center', marginBottom: 20
    },
    button: {
        width: 120, height: 50, backgroundColor: 'lightblue', borderRadius: 5, justifyContent: 'center',
        alignItems: 'center'
    }
})