import React, { Component } from 'react'
import { Alert, View, Text, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native'

import { connect } from 'react-redux'
import { updateOrder, postOrder } from '../store/actions/order'
import AsyncStorage from '@react-native-community/async-storage'

class Order extends Component {

    constructor(props) {
        super(props)
        this.state = {
            transactionId: 0,
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

    

    confirmationHandler = () => {
        Alert.alert('Konfirmasi Pemesanan', 'Apakah pesananmu telah usai?', [
            {
                text: 'Belum',
                style: 'cancel'
            },
            {
                text: 'Sudah',
                onPress: () => this.transHandler()
            }
        ])
    }

    getTransId = async () => {
        try {
            const id = await AsyncStorage.getItem('TRANSACTION_ID')
            await this.setState({
                transactionId: id,
            })
        } catch (e) {
            console.log(e)
        }
    }

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

        this.props.order.addedMenu.map(item => {
            const data = {
                menuId: item.id,
                transactionId: this.state.transactionId,
                qty: item.qty,
                price: item.sumPrice,
                status: item.status
            }
            this.props.dispatch(postOrder(data))
        })
        // this.props.order.addedMenu.splice(0, (this.props.order.addedMenu.length))
        const finalCalculation = this.state.transactionData
        this.props.navigation.navigate('Bill', {finalCalculation})
    }

    increment = async(id) => {
        let order = this.props.order.addedMenu
        const index = order.findIndex(item => item.id === id)

        let orderData = order[index]
        let incAmount = orderData.qty + 1
        let incOrder = {
            ...orderData,
            qty: incAmount,
            sumPrice: await orderData.price * incAmount
        }
        order[index] =incOrder
        await this.props.dispatch(updateOrder(order))
    }

    decrement = async(id) => {
        let order = this.props.order.addedMenu
        const index = order.findIndex(item => item.id === id)

        let orderData = order[index]
        if (orderData.qty > 1) {
            let decAmount = orderData.qty - 1
            let decOrder = {
                ...orderData,
                qty: decAmount,
                sumPrice: await orderData.price * decAmount
            }
            order[index] = decOrder
            await this.props.dispatch(updateOrder(order))
        } else {
            order.splice(index, 1)
            await this.props.dispatch(updateOrder(order))
        }
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        this.getTransId()
        
    }

    render() {
        return(
            <View style={{flex: 1,backgroundColor: '#ffffff'}}>
                <View style={{padding: 20, paddingVertical: 30, flexDirection: 'row', justifyContent:'center', backgroundColor: '#ffffff', borderBottomLeftRadius: 40, borderBottomRightRadius: 40, elevation: 20}}>
                    <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#f4c93e', fontSize: 20}}>Your Order</Text>                    
                </View>
                
                <FlatList 
                    data={this.props.order.addedMenu}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    style={{marginBottom: 50}}
                    renderItem={({item}) => (
                        <View>
                            <View style={{flexDirection: 'row', backgroundColor: '#f8f8f6', width: 370, height: 100, borderRadius: 10, marginVertical: 30, marginHorizontal: 20}}>
                                <View style={{flex:2, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                                    <Image style={{width: 100, height: 100, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}} source={{uri: item.imageURL}} />
                                </View>
                                <View style={{flex: 3, marginHorizontal: 20, marginTop: 10}}>
                                    <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 17}}>{item.name}</Text>
                                    <Text style={{fontWeight: 'bold', color: '#000000', fontSize: 15}}>Rp {item.sumPrice}</Text>
                                </View>
                                <View style={{flex: 1, flexDirection:'row', top: 35, right: 60}}>
                                    <TouchableOpacity 
                                        style={{marginHorizontal: 7, backgroundColor: '#dfdfdd',justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 50, elevation: 10, marginBottom: 10, height: 30}} 
                                        onPress={() => this.decrement(item.id)}>
                                        <Text style={{textAlign: 'center', color: '#000000', fontWeight: 'bold', fontSize: 17}}>-</Text>
                                    </TouchableOpacity>
                                    <View style={{backgroundColor: 'white',justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 50, elevation: 10, marginBottom: 10, height: 30}}>
                                        <Text>{item.qty}</Text>
                                    </View>
                                    <TouchableOpacity 
                                        style={{marginHorizontal: 7, backgroundColor: '#f4c93e',justifyContent: 'center', alignItems: 'center', padding: 10, borderRadius: 50, elevation: 10, marginBottom: 10, height: 30}} 
                                        onPress={() => this.increment(item.id)}>
                                        <Text>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                    />
                
                
                <View style={{ alignItems: 'center'}}>
                    <TouchableOpacity 
                        style={{
                            paddingTop: 8,
                            position: 'absolute',
                            backgroundColor:'#f4c93e',
                            width: 380,
                            height: 50,
                            borderRadius: 20,
                            marginVertical: 20,
                            marginHorizontal: 15,
                            elevation: 7,
                            bottom: 0,
                            alignItems: 'center'}}
                            onPress={() => this.confirmationHandler()}
                    >
                        <Text style={{alignSelf: 'center', color: '#000000', fontSize: 20, fontWeight: 'bold'}}>Bill</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {order: state.order}
}

export default connect(mapStateToProps)(Order)