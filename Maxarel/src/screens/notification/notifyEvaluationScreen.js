import React, { useState, useRef, useEffect } from 'react'
import { InteractionManager, BackHandler } from 'react-native'
import NotifyEvaluationComponent from '../../components/home/notification/notifyEvaluationComponent'
import { useNavigation, useNavigationParam } from 'react-navigation-hooks'
import * as addEvaluationAction from '../../actions/addEvaluationAction'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ConstantString } from '../../utils/constant-string';
import { ColorCustom } from '../../utils/color';
import * as runFirstTimeActions from '../../actions/runFirstTimeAction';
import { callMaxarel } from '../../utils/callMaxrel';
import AsyncStorage from '@react-native-community/async-storage'
import { setToken } from '../../api/api-instance'
import { USER_TOKEN } from '../../api/config'

function NotifyEvaluationScreen(props) {
  const customPopup = useRef(null)
  const {goBack, navigate} = useNavigation()
  const articleId = useNavigationParam('articleId')
  const [accueilEvaluation, setAccueilEvaluation] = useState('')
  const [quantityEvaluation, setQuantityEvaluation] = useState('')
  const [priceEvaluation, setPriceEvaluation] = useState('')
  const [visibleDialog, setVisibleDialog] = useState(false)
  const [visibleModalCall, setVisibleModalCall] = useState(false)

  const _goBack = () => {
    _checkLogin()
  }

  const _onSend = () => {
    if((accueilEvaluation === '') && (quantityEvaluation === '') && (priceEvaluation === '')) {
      customPopup.current.alert(ConstantString.STR_EMPTY_EVALUATION)
    }
    else {
      let arrayEvaluation = [accueilEvaluation, quantityEvaluation, priceEvaluation]
      let evaluationFormId = []
      arrayEvaluation.map(e => {
        if(e !== '') {
          evaluationFormId.push(e)
        }
      })
      setVisibleDialog(true)
      const params = {
        articleId: articleId,
        evaluationFormId: evaluationFormId
      }
      props.actions.addEvaluationAction.addEvaluation(params, _onSuccessSend, _onErrorSend)
    }
  }

  const _checkLogin = async () => {
    try {
        props.actions.runFirstTimeActions.runFirstTime({})
        const token = await AsyncStorage.getItem(USER_TOKEN)
        if (token !== null) {
          navigate('Home')
        }
        else {
          goBack()
        }
    } catch (e) {
        console.log('Get token error: ', e)
    }
  }


const handleBackButtonClick = () => {
    _checkLogin()
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, [])

  const _onSuccessSend = () => {
    props.actions.runFirstTimeActions.runFirstTime({})
    setVisibleDialog(false)
    InteractionManager.runAfterInteractions(() => {
      customPopup.current.tip({
        content: [
          ConstantString.STR_SEND_FEEDBACK_SUCCESS
        ],
        btn: {
            text: ConstantString.STR_OK,
            style: {
                color: ColorCustom.GREEN,
                fontWeight: '500',
            },
            callback: () => {
              _checkLogin()
            },
        },
      });
    })
  }

  const _onErrorSend = (data) => {
    setVisibleDialog(false)
    customPopup.current.tip({
      content: [
        ConstantString.CONNECT_SERVER_ERROR
      ],
      btn: {
          text: ConstantString.STR_OK,
          style: {
              color: ColorCustom.GREEN,
              fontWeight: '500',
          },
          callback: () => {
            goBack()
          },
      },
    })
  }

  const _callMaxarel = () => {
    setVisibleModalCall(true)
  }

  const _cancelDialogCall = () => {
    setVisibleModalCall(false)
  }

  const _submitDialogCall = () => {
    setVisibleModalCall(false)
    callMaxarel()
  }

  return (
    <NotifyEvaluationComponent
      accueilEvaluation={accueilEvaluation}
      quantityEvaluation={quantityEvaluation}
      priceEvaluation={priceEvaluation}
      setAccueilEvaluation={setAccueilEvaluation}
      setQuantityEvaluation={setQuantityEvaluation}
      setPriceEvaluation={setPriceEvaluation}
      onSend={_onSend}
      goBack={_goBack}
      customPopup={customPopup}
      visibleDialog={visibleDialog}
      callMaxarel={_callMaxarel}
      visibleModalCall={visibleModalCall}
      cancelDialogCall={_cancelDialogCall}
      submitDialogCall={_submitDialogCall}
    />
  )
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
          runFirstTimeActions: bindActionCreators(runFirstTimeActions, dispatch),
          addEvaluationAction: bindActionCreators(addEvaluationAction, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotifyEvaluationScreen);
