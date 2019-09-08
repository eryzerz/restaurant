import React, { Component } from 'react'
import { TouchableOpacity, TextInput, Text, View, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux';

import { addTransaction } from '../store/actions/transaction'


class SetTable extends Component {

    state = {
        tableNum: ''
    }

    changeTextHandler = text => {
        this.setState({
            tableNum: text
        })
    }

    submitHandler = async() => {
        if (this.state.tableNum.length !== 0) {
            await AsyncStorage.setItem('TABLE_NUMBER', `${this.state.tableNum}`)
            await this.props.dispatch(addTransaction({
                tableNumber: this.state.tableNum,
                isPaid: false
            }))
            
            await AsyncStorage.setItem('TRANSACTION_ID', `${this.props.transaction.data.id}`)
            let table = this.state.tableNum
            await this.props.navigation.navigate('Menu', {table})
        } else {
            Alert.alert('PERINGATAN', 'Anda harus memasukkan nomot tabel terlebih dahulu')
        }
    }

    static navigationOptions = {
        header: null
    }
    

    render() {
        return(
            <View style={{flex:1,justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff'}}>
                <View style={{ borderTopRightRadius: 50, borderBottomLeftRadius: 50, padding: 40, backgroundColor: '#ffffff', elevation: 12}}>
                    <View style={{ alignSelf: 'center'}}>
                        <Text style={{fontSize: 20,fontWeight: 'bold', color: '#000000'}}>Masukkan Nomor Meja</Text>
                    </View>
                    <View style={{ marginTop: 10, borderRadius: 15, alignSelf: 'center', width: 100, height: 40}}>
                        <TextInput keyboardType='number-pad' style={{alignSelf: 'center', backgroundColor: '#f8f8f6', width: 200, color: '#f4c93e', textAlign: 'center', fontWeight: 'bold'}} onChangeText={this.changeTextHandler} />
                    </View>
                    <View style={{ alignSelf: 'center', backgroundColor: '#f4c93e', width: 100, height: 40, marginTop: 10, elevation: 7, borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => this.submitHandler()}>
                            <Text style={{ color: '#0B132B', alignSelf: 'center', fontWeight: 'bold'}}>Eat In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        transaction: state.transaction
    }
}

export default connect(mapStateToProps)(SetTable)