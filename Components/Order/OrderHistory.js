import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { connect } from 'react-redux';
import orderOld from '../../Redux/API/orderOld';
import { order } from '../../Redux/Reducer/CreateAction';
import getToken from '../../Redux/API/getToken';

import back from '../../Image/backs.png';

import ElevatedView from 'react-native-elevated-view'
import colors from '../../Design/Color';

class OrderHistory extends Component{
    goBack(){
        this.props.navigation.navigate('First');
        this.props.navigation.navigate('DrawerOpen')
    }
    componentDidMount(){
        getToken()
        .then(token => orderOld(token))
        .then(arrorder => this.props.order(arrorder))
        .catch(err => console.log(err,"LOI"));
    }
    render(){
        const { container, header, body, iconStyle, textHeaderStyle, orders, textStyle0, textStyle1, textStyle2, textStyle3, rowOrder, stayElavated } = styles
        const { arrOrder } = this.props;
        console.log(arrOrder,"ORDER HISTORY");
        return(
            <View style={container}>
                <View style={header}>
                    <Text style={textHeaderStyle}></Text>
                    <Text style={textHeaderStyle}>Order History</Text>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Image style={iconStyle} source={back} />
                    </TouchableOpacity>
                </View>
                <View style={body}>
                <FlatList
                    data={arrOrder}
                    renderItem={({item})=> 
                    <View margin={10}>
                        <ElevatedView elevation={6} style={stayElavated}>
                            <View style={orders}>
                                <View style={rowOrder}>
                                    <Text style={textStyle0}>Order id: </Text>
                                    <Text style={textStyle1}>{item.id}</Text>
                                </View>
                                <View style={rowOrder}>
                                    <Text style={textStyle0}>OrderTime: </Text>
                                    <Text style={textStyle2}>{item.date_order}</Text>
                                </View>
                                <View style={rowOrder}>
                                    <Text style={textStyle0}>Status: </Text>
                                    <Text style={textStyle1}>{item.status}</Text>
                                </View>
                                <View style={rowOrder}>
                                    <Text style={textStyle0}>Total: </Text>
                                    <Text style={textStyle2}>{item.total}$</Text>
                                </View>
                            </View>
                        </ElevatedView>                       
                    </View>
                }
                    keyExtractor={(item)=> item.id.toString()}
                />                    
                </View>
            </View>
        );
    }
}
function mapStoreToProps(state){
    return{
        arrOrder : state.arrOrder,
    }
}

export default connect(mapStoreToProps,{order})(OrderHistory);
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.slideUI,
        flex: 1,
    },
    header: {
        flex: 1,
        backgroundColor: colors.topUI,
        flexDirection: 'row',
        padding: width / 25,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,  
    },
    iconStyle: {
        width: width / 13,
        height: height / 18,
    },
    textHeaderStyle: {
        color: 'white',
        fontSize: width / 16,
    },
    body: {
        flex: 13,
        padding: width / 25,
        backgroundColor: colors.white,
    },
    orders: {
        backgroundColor: colors.paleblue,
        margin: 10,
        padding: 10,
        borderRadius: 2,
        justifyContent: 'space-around'
    },
    rowOrder: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textStyle0: {
        color: colors.darkblue,
        fontWeight: 'bold'
    },
    textStyle1: {
        color: colors.darkblue_1,
        fontWeight: 'bold'
    },
    textStyle2: {
        color: colors.brightred,
        fontWeight: 'bold'
    },
    textStyle3: {
        color: '#C21C70',
        fontWeight: 'bold',
    },
    stayElavated: {
        backgroundColor: colors.paleblue,
    },
})