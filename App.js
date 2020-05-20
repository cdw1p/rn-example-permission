import React, { PureComponent, memo } from 'react'
import { View, Text } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import JailMonkey from 'jail-monkey'

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isJailBroken: false,
      isMockLocation: false,
      isTrustApp: false,
      isHookDetection: false
    }
  }

  componentDidMount = async () => {
    let request = await Promise.all([
      JailMonkey.isJailBroken(),
      JailMonkey.canMockLocation(),
      JailMonkey.trustFall(),
      JailMonkey.hookDetected()
    ])

    this.setState({
      isJailBroken: request[0],
      isMockLocation: request[1],
      isTrustApp: request[2],
      isHookDetection: request[3]
    })
  }
  render() {
    const ListPermission = (props) => {
      return (
        <View style={{flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: hp('1.8%'), fontWeight: 'bold', color: '#1a1a1a'}}>{props.NamaKriteria}</Text>
          </View>
          <View style={{width: 20, height: 20, borderWidth: 1, borderColor: props.Status ? '#0f91fc' : '#ee4540', borderRadius: 30/2, alignItems: 'center', justifyContent: 'center'}}>
            {
              props.Status ?
                <Icon name={'check-bold'} size={10} color={'#0f91fc'}/>
              :
                <Icon name={'close'} size={10} color={'#ee4540'}/>
            }
          </View>
          {
            props.Important ?
              <View style={{left: -10, bottom: 8, position: 'absolute'}}>
                <Icon name={'star'} size={5} color={'#ee4540'}/>
              </View>
            :
              <></>
          }
        </View>
      )
    }
    return (
      <View style={{flex: 1, marginHorizontal: 40, alignItems: 'center', justifyContent: 'center'}}>
        <ListPermission NamaKriteria={'Rooted Devices / Jailbreak'} Status={this.state.isJailBroken} Important={true}/>
        <ListPermission NamaKriteria={'Mock Location Status'} Status={this.state.isHookDetection} Important={true}/>
        <ListPermission NamaKriteria={'Installed as Trust Application'} Status={this.state.isTrustApp} Important={true}/>
        <ListPermission NamaKriteria={'Hook Detected from Third Party'} Status={this.state.isHookDetection} Important={true}/>
      </View>
    )
  }
}

export default memo(App)