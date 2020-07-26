import React, { useState } from 'react'
import ForgotPasswordComponent from '../../components/start/forgotPasswordComponent'
import { useNavigation } from 'react-navigation-hooks'
import { useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as forgotPasswordActions from '../../actions/forgotPasswordAction';
import { ConstantString } from '../../utils/constant-string';
import { checkEmpty, checkEmailValidate } from '../../utils/validations';
import { ColorCustom } from '../../utils/color';

function ForgotPasswordScreen(props) {
    const customPopup = useRef(null);
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const {goBack, navigate} = useNavigation()
    const [visibleDialog, setVisibleDialog] = useState(false)

    const _goBack = () => {
        goBack()
    }

    const _onClickNext = () => {
        if (checkEmpty(email) || !email) {
            customPopup.current.alert(ConstantString.EMAIL_EMPTY_ALERT_FORGOT);
        } else if (!checkEmailValidate(email)) {
            customPopup.current.alert(ConstantString.INVALID_EMAIL);
        }
        else {
            const params = {
                emailAddress: email
            }
            console.log(params)
            props.actions.forgotPassword.forgot_password_action(params, _onSucces, _onError)
            setIsLoading(true)
        }
    }

    const _onSucces = (data) => {
        console.log(data)
        setVisibleDialog(true)
        setIsLoading(false)
    }

    const _onError = (data) => {
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
                        navigate('ForgotPassword');
                    },
                },
            });
        } else {
            customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR)
        }
    }

    const _onSubmitDialog = () => {
        setVisibleDialog(false)
        navigate('Login')
    }

    return (
        <ForgotPasswordComponent 
            setEmail={setEmail}
            onClickNext={_onClickNext}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            goBack={_goBack}
            customPopup={customPopup}
            onSubmitDialog={_onSubmitDialog}
            visibleDialog={visibleDialog}
        />
    )
}

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            forgotPassword: bindActionCreators(forgotPasswordActions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);

