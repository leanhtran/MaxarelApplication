import React, { useEffect, useState } from 'react'
import * as getConditionActions from '../../actions/getConditionAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import HTML from 'react-native-render-html';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { ColorCustom } from '../../utils/color';
import { ConstantString } from '../../utils/constant-string';

function GetConditionScreen(props) {
    const {
        isLoading,
        setIsLoading
    } = props

    const [conditionData, setConditionData] = useState([])

    useEffect(() => {
        setIsLoading(true)
        props.actions.getConditionActions.getCondition(_onSuccess, _onError)
    },[])

    const _onSuccess = (data) => {
        setIsLoading(false)
        setConditionData(data.result)
    }

    const _onError = (data) => {
        setIsLoading(false)
        setConditionData('')
        console.log('Error', data)
    }

    return (
        <>
            {
                isLoading ?
                <View style={styles.container}>
                    <ActivityIndicator color={ColorCustom.GREEN} />
                </View>
                :
                (
                    conditionData === '' ?
                    <View style={styles.container}>
                        <Text style={styles.textError}>
                            {ConstantString.CONNECT_SERVER_ERROR}
                        </Text>
                    </View>
                    :
                    <HTML html={conditionData.text} />
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textError: {
        textAlign: 'center',
        fontFamily: ConstantString.FONT_REGULAR,
        fontSize: 16
    }
})

const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            getConditionActions: bindActionCreators(getConditionActions, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetConditionScreen)