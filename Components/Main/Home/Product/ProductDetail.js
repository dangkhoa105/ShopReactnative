import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { addProductToCart, updateProductsCart } from '../../../../Redux/Reducer/CreateAction.js';
import back from '../../../../Image/back.png';
import carts from '../../../../Image/cartfull.png';
import saveCart from '../../../../Redux/API/saveCart.js';

import ElevatedView from 'react-native-elevated-view'
import colors from '../../../../Design/Color.js';

const url="http://192.168.56.1:80/app/images/product/";

class ProductDetail extends Component {
    goHome(){
        this.props.navigation.goBack();
    }

    addProductsToCart() {
        const { arrCart, user } = this.props;
        const { product } = this.props.navigation.state.params;
        const i = arrCart.map(e => { return e.id }).indexOf(product.id);

        if(user !== ''){
            //check duplicate product
            if (i == -1) {
                product.quantity = 1;
                this.props.addProductToCart(product);
                //Save product to cart
                let newArr = arrCart.concat(product);
                saveCart(newArr);
            } else if (i > -1) {
                //Increate amount product
                //Reducer tang so luong product len + 1
                var products = arrCart.map(e => {
                    if (e.id == product.id) {
                        e.quantity += 1;
                    }
                    return e;
                });
                this.props.updateProductsCart(products);
                saveCart(products);
            } 
        }else {return alert("Sign in, please!")}        
    }
  render() {
    const { colorStyle, container, titleContainer, textMain, cardStyle, header, stayElavated, body, textBlack, textSmoke, textHighlight, textMaterial, imagebackstyle, imageStyles, viewDetail, viewColor } = styles;
    const { product } = this.props.navigation.state.params;
    
    return (
        <ElevatedView elevation={5} style={container}>
            <View style={cardStyle}>
                <View style={header}>
                    <TouchableOpacity onPress={this.goHome.bind(this)}>
                        <Image style={imagebackstyle} source={back}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.addProductsToCart.bind(this)}>
                        <Image style={imagebackstyle} source={carts}/>
                    </TouchableOpacity>
                </View>
                <View style={body}>
                    <View key={product.id}>
                        <ScrollView style={{ flexDirection: 'row', paddingLeft: 30, height: imageHeight}} horizontal >
                            <ElevatedView elevation={6} style={{margin: 5}}>
                                <Image style={imageStyles} source={{ uri: `${url}${product.images[0]}` }} />
                            </ElevatedView>
                            <ElevatedView elevation={6} style={{margin: 5}}>
                                <Image style={imageStyles} source={{ uri: `${url}${product.images[1]}` }} />   
                            </ElevatedView>                              
                        </ScrollView>                       
                        <View style={titleContainer}>
                            <Text style={textMain}>
                                <Text style={textBlack}>{product.name.toUpperCase()} </Text>
                                <Text style={textBlack}> /</Text>
                                <Text style={textSmoke}> {product.price}$</Text>
                            </Text>
                        </View>                        
                        <View style={viewDetail}>
                            <Text style={textHighlight}>{product.description}</Text>
                        </View>
                        <View style={viewColor}>
                            <Text style={textMaterial}>Material {product.material} </Text>
                            <View style={colorStyle}>        
                                <Text style={textMaterial}>Color {product.color}</Text>
                                <View style={{backgroundColor: product.color.toLowerCase(), width:15, height: 15, borderRadius: 100, marginLeft: 10, marginRight:5, borderColor: '#C21C70'}}/>
                            </View>
                        </View>
                    </View>                                                  
                </View> 
            </View>              
        </ElevatedView>
    );
  }
}//361*452

function mapStoreToProps(state){
    return {
      arrCart: state.arrCart,
      user: state.isSignIn,
    };
  }

export default connect(mapStoreToProps, {addProductToCart,updateProductsCart})(ProductDetail);

var { width, height } = Dimensions.get('window');
const imageWidth = (width - 100) / 2;
const imageHeight = (imageWidth / 361) * 452;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        margin: width / 40,
    },
    cardStyle: {
        flex: 1,
    },
    header: {
        flex: 0.4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    titleContainer: {
        borderBottomWidth: 1,
        borderColor: '#F6F6F6',
        marginHorizontal: 20,
        paddingTop: 8,
        justifyContent: 'center',
        alignItems: 'center'     
    },
    textMain: {
        paddingLeft: 5,
        marginBottom: 10,       
    },
    imagebackstyle: {
        width: width / 11,
        height: height / 18,
    },
    body: {
    },
    imageStyles: {
        //margin: width / 76,
        width: imageWidth,
        height: imageHeight,
        //marginHorizontal: 5,
        //resizeMode: 'center'
    },
    textBlack: {
        fontFamily: 'Avenir',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3F3F46',
        paddingLeft: 20,
        marginVertical: 10,
        marginHorizontal: 15,
    },
    textSmoke: {
        fontFamily: 'Avenir',
        fontSize: 20,
        color: colors.brightorange
    },
    textHighlight: {
        fontSize: 17,
        color: colors.lightBlack
    },
    textMaterial: {
        color: '#C21C70',
        fontSize: 15,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    viewDetail: {
        borderColor: 'gray',
        borderTopWidth: 3,
        padding: 17,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },    
    viewColor: {
        marginHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    colorStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },    
    stayElavated: {
        backgroundColor: '#FFF',
    },          
})