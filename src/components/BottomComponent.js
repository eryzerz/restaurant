import React, { Component } from 'react'
import { View, TextInput, Text, TouchableOpacity } from 'react-native'

export default class BottomComponent extends Component {
    render() {
        return (
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection: 'row', backgroundColor: 'silver'}}>
                <View style={{ width: 300, marginLeft: 30, marginRight:20, backgroundColor: 'white', height: 40, marginTop: 10}}>
                    <Text>{this.props.input}</Text>
                </View>
                <View>
                    <View style={{backgroundColor:'green'}}>
                        <TouchableOpacity style={{ width: 200}}>
                            <Text>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text>Call</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <Text>Bill</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}