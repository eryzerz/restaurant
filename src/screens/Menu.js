import React, { Component } from 'react'
import axios from 'axios'
import { TouchableOpacity, View, Text, ScrollView, TextInput, ToastAndroid, FlatList, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import { addOrder, updateOrder } from '../store/actions/order'
import { getCategory } from '../store/actions/category'
import { getMenu, getMenuByCategory } from '../store/actions/menu'

class Menu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tableNumber: 0,
            transactionId: 0,
            menus: [],
            menuIds: [],
            counter: 0,
            timer: 60
        }
    }
    
    getTableNum = async () => {
        try {
            const number = await AsyncStorage.getItem('TABLE_NUMBER')
            const id = await AsyncStorage.getItem('TRANSACTION_ID')
            this.setState({
                tableNumber: number,
                transactionId: id,
            })
        } catch (e) {
            console.log(e)
        }
    }

    static navigationOptions = {
            header: null
        }

    

    countHandler = async (data) => {
        let order = this.props.order.addedMenu
        const index = order.findIndex(item => item.id === data.id)

        if(index >= 0) {
            let orderData = order[index]
            let incAmount = orderData.qty + 1
            let incOrder = {
                ...orderData,
                qty: incAmount,
                sumPrice: await orderData.price * incAmount
            }
            order[index] =incOrder
            ToastAndroid.show(`${orderData.name} ditambahkan`, ToastAndroid.LONG)
            await this.props.dispatch(updateOrder(order))
            
        } else {
            data = {
                ...data,
                qty: 1,
                status: 0,
                sumPrice: data.price
            }
            ToastAndroid.show(`${data.name} ditambahkan`, ToastAndroid.LONG)
            await this.props.dispatch(addOrder(data))
            
        }
        
    }

    menuHandler = (item) => {
        this.setState({
            menus: [...this.state.menus, item]
        })
    }

    filterHandler = id => () => {
        this.props.dispatch(getMenuByCategory(id))
    }

    componentDidMount() {
        this.interval = setInterval(
            () => this.setState((prevState)=> ({ timer: prevState.timer - 1 })),
            1000
        );
        this.getTableNum()
        axios.get('http://192.168.1.15:3000/api/v1/categories')
            .then(res => {
                const category = res.data
                this.props.dispatch(getCategory(category))
            })
        this.props.dispatch(getMenu())
        
    }

    componentDidUpdate(){
        if(this.state.timer === 1){ 
            clearInterval(this.interval);
        }
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    _keyExtractor = (item, index) => item.id

    render() {
        
        return (
            <View style={{backgroundColor: '#ffffff'}}>
                <View style={{padding: 20, paddingVertical: 30, flexDirection: 'row', justifyContent:'space-between', backgroundColor: '#ffffff', borderBottomLeftRadius: 40, borderBottomRightRadius: 40, elevation: 20}}>
                    <Text style={{fontWeight: 'bold', color: '#f4c93e', fontSize: 17}}>Meja Nomor {this.props.navigation.getParam('table')}</Text>
                    <Text  style={{fontWeight: 'bold', color: '#f4c93e', fontSize: 17}}>{this.state.timer}</Text>                    
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 25}}>
                    <FlatList 
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true}
                        horizontal={true}
                        data={this.props.category.data}
                        keyExtractor={this._keyExtractor}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={this.filterHandler(item.id)}
                                style={{marginHorizontal: 15, backgroundColor: '#c82726', padding: 10, borderRadius: 50, elevation: 10, marginBottom: 10}}
                            >
                                <Text style={{fontWeight: 'bold', color: '#ffffff'}}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        />
                </View>
                <View style={{height: 600, backgroundColor: '#f8f8f6', borderTopRightRadius: 50, borderBottomLeftRadius: 50, padding: 10, elevation: 10}}>
                    <FlatList
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        data={this.props.menu.data} 
                        keyExtractor={this._keyExtractor}
                        renderItem={(item, index) => (
                            <TouchableOpacity 
                                key={index} 
                                onPress={() => this.countHandler(item.item)}
                                style={{ justifyContent: 'center', marginHorizontal: 10, height: 130, width: 170, marginTop: 10, borderTopRightRadius: 50, borderBottomLeftRadius: 50}}>
                                <ImageBackground source={{uri: item.item.imageURL}} imageStyle={{borderTopRightRadius: 20, borderBottomLeftRadius: 50}} style={{ width: '100%', height: '100%'}}>
                                    <View style={{backgroundColor:'#c82726', opacity: 0.9, borderTopRightRadius: 50, borderBottomLeftRadius: 50}}>
                                        <Text style={{ alignSelf: 'center', color: '#ffffff'}}>{item.item.name}</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        )} />
                </View>
                <View style={{flexDirection:'row', alignItems: 'center', paddingBottom: 2}}>
                    <TouchableOpacity 
                        style={{
                            flex: 1,
                            paddingTop: 8,
                            position: 'absolute',
                            bottom: 2,
                            backgroundColor:'#f4c93e',
                            width: 380,
                            height: 50,
                            borderRadius: 20,
                            marginVertical: 140,
                            marginHorizontal: 15,
                            elevation: 12,
                            alignItems: 'center'}}
                        onPress={() => this.props.navigation.navigate('Order')}
                    >
                        <Text  style={{alignSelf: 'center', color: '#000000', fontSize: 20, fontWeight: 'bold'}}>Order</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        category: state.category,
        menu: state.menu,
        order: state.order,
        transaction: state.transaction
    }
}

export default connect(mapStateToProps)(Menu)

