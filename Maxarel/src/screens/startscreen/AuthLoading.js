import React, { useEffect,useState } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { DEVICE_TOKEN } from '../../actions/actiontypes';
import * as runFirstTimeActions from '../../actions/runFirstTimeAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { USER_TOKEN } from '../../api/config';
import { setToken } from '../../api/api-instance';
import { Platform } from 'react-native';

function AuthLoading(props) {
  const { navigate } = useNavigation()

  useEffect(() => {
    onStart()
    getDeviceToken()
  });

  const storeData = async (token) => {
    try {
        await AsyncStorage.setItem(DEVICE_TOKEN, token)
    } catch (e) {
        console.log("Save token error: ", e)
    }
  }

  const getDeviceToken = () => {
    PushNotification.configure({
      onRegister: function(data) {
        storeData(data.token)
      },
  
      onNotification: function(notification) {
        console.log("NOTIFICATION AuthLoading:",notification);
        if(Platform.OS === 'ios') {
          const data = notification.data.data
          if(notification.foreground === true) {
            if(data.typeId === '1') {
              navigate('NotifyEvaluation', {
                "articleId" : data.articleId
              })
            }
            else{
              navigate('NotifyArrive', {
                  'distance': data.distance,
                  'articleId': data.articleId
              })
            }
          }
          props.actions.runFirstTimeActions.runFirstTime({
            distance: data.distance,
            articleId: data.articleId,
            typeId: data.typeId,
            foreground: notification.foreground
          })
          notification.finish("backgroundFetchResultNewData")
        }
        else {
          if(notification.foreground === true && notification.userInteraction) {
            if(notification.typeId === '1') {
              navigate('NotifyEvaluation', {
                "articleId" : notification.articleId
              })
            }
            else{
              navigate('NotifyArrive', {
                  'distance': notification.distance,
                  'articleId': notification.articleId
              })
            }
          }
        props.actions.runFirstTimeActions.runFirstTime({
          distance: notification.distance,
          articleId: notification.articleId,
          typeId: notification.typeId,
          foreground: notification.foreground
        })
        }
      },

      senderID: "323270401877",
      permissions: {
      alert: true,
      badge: true,
      sound: true
      },
      popInitialNotification: true,
      requestPermissions: true
    })
  }

  const onStart = async () => {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN);
      if (token !== null) {
          setToken(token)
          navigate('Home')
      }
      else navigate('Start')
  } catch (e) {
      console.log('Get token error: ', e)
  }
  }

  return <></>;
}

const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      actions: {
        runFirstTimeActions: bindActionCreators(runFirstTimeActions, dispatch),
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);