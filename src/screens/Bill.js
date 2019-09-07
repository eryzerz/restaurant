import React, { Component } from 'react'
import {View, Text, TouchableOpacity, BackHandler, Alert } from 'react-native'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import { getOrderByTrans } from '../store/actions/order'
import { updateTransaction } from '../store/actions/transaction'



class Bill extends Component {

    constructor(props) {
        super(props)
        this.state = {
            transactionData: {
                subtotal: 0,
                discount: 0,
                serviceCharge: 0,
                tax: 0,
                total: 0,
                isPaid: 0
            }
        }
    }

    static navigationOptions = {
        header: null
    }

    handleAndroidBackButton = callback => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            callback();
            return true;
        });
    };

    transHandler = () => {
        let orderTotal = 0
        this.props.order.addedMenu.forEach(item => {
            orderTotal += item.sumPrice
        })
        this.setState(Object.assign(this.state.transactionData, {
            subtotal: orderTotal,
            discount: 0,
            serviceCharge: orderTotal * 0.2,
            tax: orderTotal * 0.1,
            total: orderTotal + orderTotal * 0.2 + orderTotal * 0.1
        }))
    }


    finishHandler = async() => {
        const id = await AsyncStorage.getItem('TRANSACTION_ID')
        let trans = this.state.transactionData
        const data = {
            subtotal: trans.subtotal,
            discount: trans.discount,
            serviceCharge: trans.serviceCharge,
            tax: trans.tax,
            total: trans.total,
            isPaid: 1
        }
        await this.props.dispatch(updateTransaction(data, id))
        await this.props.navigation.navigate('Checkout')
    }

    exitAlert = () => {
        Alert.alert(
            'PERINGATAN',
            'Pemesanan telah final',
            [
                {text: 'OK'}
            ]
        );
    };

    componentDidMount() {
        this.handleAndroidBackButton(this.exitAlert)
        this.transHandler()
    }

    render() {
        return(
            <View style={{flex: 1,backgroundColor: '#397c3c'}}>
                <View style={{padding: 20, paddingVertical: 30, flexDirection: 'row', justifyContent:'center', backgroundColor: '#f4c93e', borderBottomLeftRadius: 40, borderBottomRightRadius: 40, elevation: 20}}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#ffffff', fontSize: 20}}>Your Bill</Text>                    
                </View>
                <View style={{backgroundColor: '#397c3c', borderRadius: 10, marginVertical: 30, marginHorizontal: 20, justifyContent: 'space-between', elevation: 7}}>
                    {this.props.order.addedMenu.map((item) => {
                        return (
                            <View key={item.id} style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between'}}>
                                {item.status == 0 && <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 18, marginRight: 30}}>{item.qty}x</Text>}
                                {item.status == 1 && <Text style={{color: '#f8f8f6', fontWeight: 'bold', fontSize: 18, marginRight: 30}}>SENT</Text>}
                                
                                <Text style={{color: '#f8f8f6', fontWeight: 'bold', top: 3, marginRight: 30}}>{item.name}</Text>
                                <Text style={{color: '#f8f8f6', fontWeight: 'bold', top: 3, marginRight: 30}}>Rp {item.sumPrice}</Text>
                            </View>
                        )
                    })}
                </View>
                
                <View style={{flexDirection: 'row', backgroundColor: '#397c3c', width: 370, height: 130, borderRadius: 10, marginVertical: 30, marginHorizontal: 20, justifyContent: 'space-between', elevation: 20}}>
                    <View style={{margin: 10}}>
                        <Text style={{color: '#ffffff', fontWeight: 'bold', top: 3}}>Sub Total</Text>
                        <Text style={{color: '#ffffff', fontWeight: 'bold', top: 3}}>Diskon</Text>
                        <Text style={{color: '#ffffff', fontWeight: 'bold', top: 3}}>Service Charge(5%)</Text>
                        <Text style={{color: '#ffffff', fontWeight: 'bold', top: 3}}>Tax(10%)</Text>
                        <Text style={{color: '#ffffff', fontWeight: 'bold', top: 3}}>Total</Text>
                    </View>
                    <View style={{margin: 10, marginLeft: 1}}>
                        <Text style={{color: '#f8f8f6', fontWeight: 'bold', top: 3}}>Rp {this.state.transactionData.subtotal}</Text>
                        <Text style={{color: '#f8f8f6', fontWeight: 'bold', top: 3}}>Rp {this.state.transactionData.discount}</Text>
                        <Text style={{color: '#f8f8f6', fontWeight: 'bold', top: 3}}>Rp {this.state.transactionData.serviceCharge}</Text>
                        <Text style={{color: '#f8f8f6', fontWeight: 'bold', top: 3}}>Rp {this.state.transactionData.tax}</Text>
                        <Text style={{color: '#f8f8f6', fontWeight: 'bold', top: 3}}>Rp {this.state.transactionData.total}</Text>
                    </View>
                </View>
                <View style={{ flexDirection:'row', alignItems: 'center', flex: 1}}>
                    <TouchableOpacity 
                        style={{
                            flex: 1,
                            paddingTop: 8,
                            position: 'absolute',
                            backgroundColor:'#f4c93e',
                            width: 380,
                            height: 50,
                            borderRadius: 20,
                            marginVertical: 20,
                            marginHorizontal: 15,
                            elevation: 7,
                            bottom:0,
                            alignItems: 'center'}}
                            onPress={this.finishHandler}
                    >
                        <Text style={{alignSelf: 'center', color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        order: state.order,
        transaction: state.transaction
    }
    
}

export default connect(mapStateToProps)(Bill)