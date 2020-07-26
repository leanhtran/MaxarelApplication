import React, { useState,useEffect, useRef } from 'react'
import NotifyArriveComponent from '../../components/home/notification/notifyArriveComponent'
import { useNavigationParam, useNavigation } from 'react-navigation-hooks'
import * as getArticleByIdAction from '../../actions/getArticleByIdAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import * as runFirstTimeActions from '../../actions/runFirstTimeAction';
import { ColorCustom } from '../../utils/color';

function NotifyArriveScreen(props) {
    const customPopup = useRef(null)
    const {goBack} = useNavigation()
    const distance = useNavigationParam('distance')
    const articleId = useNavigationParam('articleId')
    const [articleData, setArticleData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [linkImage_0, setLinkImage_0] = useState('')

    const _onSubmit = () => {
        props.actions.runFirstTimeActions.runFirstTime({})
        goBack()
    }

    useEffect(() => {
        setIsLoading(true)
        const params = {
            articleId: articleId
        }
        props.actions.get_article_by_id.getArticleById(params, _onSuccess, _onError)
    },[articleId])

    const _onSuccess = data => {
        setLinkImage_0(data.result.listImages[0])
        setArticleData(data.result)
        setIsLoading(false)
    }

    const _onError = (data) => {
        setIsLoading(false)
        if(data.error && data.error.message && data.error.details){
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
                        goBack();
                    },
                },
            });
        } else {
            customPopup.current.alert(ConstantString.CONNECT_SERVER_ERROR)
        }
    }

    return (
        <NotifyArriveComponent
            onSubmit={_onSubmit}
            distance={distance}
            articleId={articleId}
            articleData={articleData}
            isLoading={isLoading}
            linkImage_0={linkImage_0}
            customPopup={customPopup}
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
            get_article_by_id: bindActionCreators(getArticleByIdAction, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotifyArriveScreen);