import React, { useState, useRef } from 'react'
import ChangePasswordComponent from '../../components/start/changePasswordComponent'
import * as changePasswordAction from '../../actions/changePasswordAction'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ConstantString } from '../../utils/constant-string';
import { useNavigation } from 'react-navigation-hooks';
import { ColorCustom } from '../../utils/color';

function ChangePasswordScreen(props) {
  const customPopup = useRef(null);
  const {goBack, navigate} = useNavigation()
  const [comfirmPassword, setComfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [visibleDialog, setVisibleDialog] = useState(false)
  const initialStateParams = {
    NewPassword: '',
    OldPassword: ''
  }
  const [params, setParams] = useState(initialStateParams)

  const _onClickNext = () => {
    if (params.NewPassword.length < 8 || params.NewPassword.length > 16) {
      customPopup.current.alert(ConstantString.STR_CHECK_PASSWORD_ALERT)
    }
    else if (params.NewPassword !== comfirmPassword) {
      customPopup.current.alert(ConstantString.STR_NEW_PASSWORD_NOT_MATCH)
    }
    else {
      setIsLoading(true)
      console.log(params);
      props.actions.changePassword.changePassword(params, _onSuccessChange, _onErrorChange)
    }
  }

  const _onSuccessChange = (data) => {
    setIsLoading(false)
    setVisibleDialog(true)  
  }

  const _onErrorChange = (data) => {
    setIsLoading(false)
    if(data.error && data.error.message && data.error.details){
      customPopup.current.tip({
          title: data.error.message,
          content: [
              data.error.details
          ],
          btn: {
              text: ConstantString.STR_OK,
              style: {
                  color: ColorCustom.GREEN,
                  fontWeight: '500',
              },
              callback: () => {
                  navigate('ChangePassword');
              },
          },
      });
    } else {
        customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR)
    }
  }

  const _onSubmitDialog = () => {
    goBack()
  }

  const _goBack = () => {
    goBack()
  }

  return (
    <ChangePasswordComponent
      onClickNext={_onClickNext}
      params={params}
      setParams={setParams}
      setComfirmPassword={setComfirmPassword}
      customPopup={customPopup}
      setIsLoading={setIsLoading}
      isLoading={isLoading}
      visibleDialog={visibleDialog}
      onSubmitDialog={_onSubmitDialog}
      goBack={_goBack}
    />
  )
}

const mapStateToProps = (state) => {
  return {
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      actions: {
        changePassword: bindActionCreators(changePasswordAction, dispatch),
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen);