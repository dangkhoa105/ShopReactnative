import { StackNavigator, TabNavigator } from'react-navigation';
import { Image, Text, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import Home from '../Main/Home/Home.js';
import Cart from '../Order/Cart.js';
import Search from '../Main/Search.js';
import Contact from '../Main/Contact.js';
import Product from '../Main/Home/Product/Product.js';
import ProductDetail from '../Main/Home/Product/ProductDetail.js';
import IconCart from '../Route/TabBarIcon/IconCart.js';

import iconHome from '../../Image/home0.png';
import iconSearch from '../../Image/search0.png';
import iconContact from '../../Image/contact0.png';
import iconHome1 from '../../Image/home.png';
import iconSearch1 from '../../Image/search.png';
import iconContact1 from '../../Image/contact.png';
import Header from '../Main/Header.js';
import colors from '../../Design/Color.js';

var { width, height } = Dimensions.get('window');

const styles=StyleSheet.create({
    icon: {
        width: width / 14,
        height: height / 25,
    },
    iconText: {
        color: colors.bannerUI,
        fontSize: width / 33,
    },
    iconTextActive: {
        color: colors.bannerUI,
        fontSize: width / 33,
    },
})

export const ROUTE_HOME = StackNavigator({
    HOME:{screen: Home, navigationOptions:{header:null}},
    PRODUCT:{screen: Product, navigationOptions:{header:null}},
    PRODUCTDETAIL:{screen: ProductDetail, navigationOptions:{header:null}},
})
export const ROUTE_CART = StackNavigator({
    CART:{screen: Cart, navigationOptions:{header:null}},
    PRODUCTDETAIL:{screen: ProductDetail, navigationOptions:{header:null}},    
})
export const ROUTE_SEARCH = StackNavigator({
    SEARCH:{screen: Search, navigationOptions:{header:null}},
    PRODUCTDETAIL:{screen: ProductDetail, navigationOptions:{header:null}},
})
export const ROUTE_CONTACT = StackNavigator({
    CONTACT:{screen: Contact, navigationOptions:{header:null}},
})
export const TABBAR = TabNavigator(   
    {                             
        tabHome: {
            screen: ROUTE_HOME,
            navigationOptions:{
                tabBarIcon: ({ focused, tintColor }) => {
                    if (focused) {
                        return (<Image source={iconHome1} style={styles.icon} />)
                    }
                    else {
                        return (<Image source={iconHome} style={styles.icon} />)
                    }
                },
                tabBarLabel: ({ focused, tintColor }) =>
                    (<Text style={focused ? styles.iconTextActive : styles.iconText}>Home</Text>),
            }
        },
        tabCart: {
            screen: ROUTE_CART,
            navigationOptions:{
                tabBarIcon: ({focused})=> <IconCart focused={focused}/>,
                tabBarLabel: ({focused, tintColor})=> 
                    (<Text style={focused ? styles.iconTextActive : styles.iconText}>Cart</Text>),
            }                
        },
        tabSearch: {
            screen: ROUTE_SEARCH,
            navigationOptions:{
                tabBarIcon: ({ focused, tintColor }) => {
                    if (focused) {
                        return (<Image source={iconSearch1} style={styles.icon} />)
                    }
                    else {
                        return (<Image source={iconSearch} style={styles.icon} />)
                    }
                },
                tabBarLabel: ({focused, tintColor})=> 
                    (<Text style={focused ? styles.iconTextActive : styles.iconText}>Search</Text>),
            }
        },
        tabContact: {
            screen: ROUTE_CONTACT,
            navigationOptions:{
                tabBarIcon: ({ focused, tintColor }) => {
                    if (focused) {
                        return (<Image source={iconContact1} style={styles.icon} />)
                    }
                    else {
                        return (<Image source={iconContact} style={styles.icon} />)
                        return
                    }
                },
                tabBarLabel:({focused, tintColor})=> 
                    (<Text style={focused ? styles.iconTextActive : styles.iconText}>Contact</Text>),
            }
        }
    },
    {
        tabBarPosition:'bottom',
        swipeEnabled: true,
        tabBarOptions:{
            style: {
                backgroundColor: colors.bannerUI,
                //flex: 0.12,
                height: 0,
                justifyContent: 'center',
            },
            
            showIcon: true,
            showLabel: true,
        },
    }
)

