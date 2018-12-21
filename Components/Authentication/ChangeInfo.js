import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import changeInfoUser from '../../Redux/API/changeInfo';
import getToken from '../../Redux/API/getToken';

import back from '../../Image/backs.png';
import { Input, Icon } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/';


class ChangeInfo extends Component{
    constructor(props){
        super(props);
        const {user} = this.props
        this.state={
            name:user.name,
            address:user.address,
            phonenumber:user.phone,
        };
    }
    goBack(){
        this.props.navigation.navigate('First');
        this.props.navigation.navigate('DrawerOpen')
    }
    _changeInfo(){
        const {name, address, phonenumber} = this.state;
        getToken()
        .then(token => changeInfoUser(token, name, phonenumber, address))
        .then(() => this._ChangSuccess())
        .catch(err => console.log(err, "LOI"))
    }
    _ChangSuccess(){
        Alert.alert(
            'Change Info',
            'Update change info success',
            [
              {text: 'OK', onPress: () => this.goBack()},
            ],
          )
    }
    render(){
        const { container, header, body, iconStyle, textHeaderStyle, textInputStyle, button, buttontext } = styles
        const { name, address, phonenumber } = this.state;
        return(
            <View style={container}>
                <View style={header}>
                    <Text style={textHeaderStyle}></Text>
                    <Text style={textHeaderStyle}>User Infomation</Text>
                    <TouchableOpacity onPress={this.goBack.bind(this)}>
                        <Image style={iconStyle} source={back} />
                    </TouchableOpacity>
                </View>
                <View style={body}>
                    <View style={textInputStyle}>
                        <Input
                            placeholder='Enter your name'
                            leftIcon={{
                                type: 'font-awesome',
                                name: 'user',
                                size: 22,
                                color: '#4895F0',
                            }}
                            value={name}
                            onChangeText={(name)=>{this.setState({name})}}
                            inputContainerStyle = {{borderColor: 'transparent'}}
                        />
                    </View>
                    <View style={textInputStyle}>
                        <Input
                            placeholder='Enter your address'
                            leftIcon={{
                                type: 'font-awesome',
                                name: 'address-book',
                                size: 21,
                                color: '#4895F0',
                            }}
                            value={address}
                            onChangeText={(address)=>{this.setState({address})}}
                            inputContainerStyle = {{borderColor: 'transparent'}}
                        />
                    </View>
                    <View style={textInputStyle}>
                        <Input
                            placeholder='Enter your phone number'
                            leftIcon={{
                                type: 'font-awesome',
                                name: 'phone',
                                size: 22,
                                color: '#4895F0',
                                underlineColorAndroid: 'transparent'
                            }}
                            value={phonenumber}
                            onChangeText={(phonenumber)=>{this.setState({phonenumber})}}
                            inputContainerStyle = {{borderColor: 'transparent'}}
                        />
                    </View>                  
                    <TouchableOpacity
                        style={button}
                        onPress={this._changeInfo.bind(this)}
                    >
                        <Text style={buttontext}>CHANGE YOUR INFOMATION</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
function mapStoreToProp(state){
    return {
        user : state.isSignIn,
    }
}

export default connect(mapStoreToProp)(ChangeInfo);

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    header: {
        flex: 7,
        backgroundColor: '#4895F0',
        flexDirection: 'row',
        padding: width / 25,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    iconStyle: {
        width: width / 13,
        height: height / 18,
    },
    textHeaderStyle: {
        color: '#fff',
        fontSize: width / 16,
        fontFamily: 'Roboto',
    },
    body: {
        flex: 93,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F6F6',  
        borderColor: '#4895F0',
    },
    textInputStyle: {
        borderWidth: 2,
        borderColor: '#4895F0',
        width: width - 60,
        height: height * 0.08,
        borderRadius: 30,
        paddingLeft: 20,
        margin: 10,
        marginHorizontal: 20,
        justifyContent: 'center'
    },
    button: {
        width: width - 60,
        height: height * 0.09,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4895F0',
        marginTop: 30,
        marginHorizontal: 20,
        paddingLeft: 20,
    },
    buttontext: {
        color: 'white',
    },
})