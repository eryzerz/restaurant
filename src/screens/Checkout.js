import React, { Component } from 'react'
import { View, Text, TouchableOpacity, BackHandler } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

export default class Checkout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tableNumber: 0,
            transactionId: 0
        }
    }

    getTableNum = async () => {
        try {
            const number = await AsyncStorage.getItem('TABLE_NUMBER')
            const id = await AsyncStorage.getItem('TRANSACTION_ID')
            await this.setState({
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

    componentDidMount() {
        this.getTableNum()
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            Alert.alert("PERINGATAN", "Anda telah finalisasi pemesanan", { cancelable: false });
            return true;
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4c93e'}}>
                <View>
                    <Text style={{color: '#ffffff', fontSize: 17, fontWeight: 'bold'}}>SILAHKAN TUNJUKKAN LAMAN INI KE KASIR</Text>
                </View>
                <View>
                    <Text style={{textAlign: 'center', fontSize: 40, color: '#c82726', fontWeight: 'bold'}}>#{this.state.tableNumber}</Text>
                    <Text style={{textAlign: 'center', fontSize: 20, color: '#f8f8f6'}}>Terima Kasih</Text>
                </View>
                <View style={{alignItems: 'center', marginTop: 150, top: 60}}>
                    <TouchableOpacity 
                        style={{
                            position: 'absolute',
                            left: 50,
                            backgroundColor:'#c82726',
                            width: 120,
                            height: 100,
                            borderRadius: 20,
                            elevation: 12,
                            justifyContent: 'center',
                            alignItems: 'center'}}
                        onPress={() => this.props.navigation.navigate('Home')}
                    >
                        <Text  style={{textAlign: 'center', color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>Back to Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}