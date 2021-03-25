import React, { Component } from 'react';
import {Button, Text, View} from 'react-native';
import QrReader from 'react-qr-reader';

 
class QRCode extends Component {
  state = {
    result: 'No result'
  }
 
  handleScan = (data: any) => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  handleError = (err: any) => {
    console.error(err)
  }
  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <Text>{this.state.result}</Text>
      </div>
    )
  }
}

export default QRCode;
