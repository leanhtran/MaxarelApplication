import React, { useState, useRef } from 'react';
import { useNavigation } from "react-navigation-hooks";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../actions/loginAction';
import LoginComponent from '../../components/start/loginComponent'
import { setToken } from '../../api/api-instance';
import { checkEmpty, checkEmailValidate } from '../../utils/validations';
import { ConstantString } from '../../utils/constant-string';
import { ColorCustom } from '../../utils/color';
import * as runFirstTimeActions from '../../actions/runFirstTimeAction';
import * as locationActions from '../../actions/mapAction';

function LoginScreen(props) {
    const customPopup = useRef(null);
    const { goBack, navigate } = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);

    const _onClickLogin = () => {
        if (checkEmpty(email) || !email || checkEmpty(password) || !password) {
            customPopup.current.alert(ConstantString.EMAIL_EMPTY_ALERT);
        } else if (!checkEmailValidate(email)) {
            customPopup.current.alert(ConstantString.INVALID_EMAIL);
        } else {
            setLoading(true)
            const params = {
                userNameOrEmailAddress: email,
                password: password,
                isAdmin: false,
                rememberClient: true,
            };
            props.actions.login.login(params, _onSucces, _onError);
        }
    }

    const _onRegister = () => {
        _moveToScreenRegister()
    }

    const _onSucces = (data) => {
        setLoading(false)
        setToken(data.result.accessToken)
        props.actions.runFirstTimeActions.runFirstTime({})
        navigate('Vendeurs')
    }

    const _onError = (data) => {
        console.log(data);
        setLoading(false)
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
                        navigate('Login');
                    },
                },
            });
        } else {
            customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR)
        }
    }

    const _moveToScreenRegister = () => {
        props.actions.actionLocation.get_location({})
        navigate("RegisterScreen");
    }

    const _goBack = () => {
        goBack()
    }

    const _onClickForgotPassword = () => {
        navigate('ForgotPassword')
    }

    return (
        <LoginComponent
            isLoading={isLoading}
            onClickLogin={_onClickLogin}
            onRegister={_onRegister}
            setEmail={setEmail}
            setPassword={setPassword}
            customPopup={customPopup}
            goBack={_goBack}
            onClickForgotPassword={_onClickForgotPassword}
        />
    );
}

const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            actionLocation: bindActionCreators(locationActions, dispatch),
            runFirstTimeActions: bindActionCreators(runFirstTimeActions, dispatch),
            login: bindActionCreators(loginActions, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);