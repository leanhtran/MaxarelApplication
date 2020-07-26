import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import ArticleComponent from '../../components/home/creatArticle/articleComponent'
import { useNavigation } from 'react-navigation-hooks'
import * as getCategoriesAction from '../../actions/getCategoriesAction'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


function ArticleScreen(props) {
    const initialState = {
        categoryId :0,
        productId: 0,
        price: 0,
        quantity: 0,
        isPesticides: false,
        isCertification: false,
        certificationName: '',
        description: '',
        address: '',
        isActive: true,
        comePick: false,
        unitTypeId: 0,
        paymentMethod: {
            isCash: false,
            isCB: false,
            isCheque: false
        },
        debutDate: '',
        endHour: 0,
        endMinute: 0,
        userId: 0,
        listImages: [],
        id: 0
    }
    const [produitByIdData, setProduitByIdData] = useState([])
    const {goBack, navigate} = useNavigation()
    const unitType = ['kg','g','m','cm'];
    const [article, setArticle] = useState(initialState)
    const [date, setDate] = useState(new Date())
    const arrayHour = ['00','01','02','03','04']
    const arrayMinute = [
    '00','01','02','03','04','05','06','07','08','09',
    '10','11','12','13','14','15','16','17','18','19',
    '20','21','22','23','24','25','26','27','28','29',
    '30','31','32','33','34','35','36','37','38','39',
    '40','41','42','43','44','45','46','47','48','49',
    '50','51','52','53','54','55','56','57','58','59']

    const [categories, setCategories] = useState([])
    const [produitData, setProduitData] = useState([])

    useEffect(() => {
        props.actions.articleAction.get_categories(_onSucces, _onError);
    },[props])

    const onChangeCategories = value => {
        setArticle({...article, categoryId: value})
        const params = {
            id: article.categoryId
        }
        props.actions.articleAction.get_produit(params,_getProduitByIdSucces, _getProduitByIdError)
    }
    const _getProduitByIdSucces = data => {
        setProduitByIdData(data)
    }
    const _getProduitByIdError = () => {
    }
    const searchProduit = text => {
        const params = {
            categoryId: article.categoryId,
            input: text
        }
        props.actions.articleAction.get_produit(params,_getProduitSucces, _getProduitError)
    }
    
    const _getProduitSucces = data => {
        setProduitData(data)
    }
    const _getProduitError = () => {
    }
    const _onSucces = (data) => {
        const dataCategories = data.result.map(e => e.name)
        setCategories(dataCategories)        
    }

    const _onError = (data) => {
    }
    const _goBack = () => {
        goBack
    }
    const setIsCes = () => {
        setArticle({...article, paymentMethod:  {...article.paymentMethod, isCash: !article.paymentMethod.isCash}})
    }
    const setIsCB = () => {
        setArticle({...article, paymentMethod:  {...article.paymentMethod, isCB: !article.paymentMethod.isCB}})
    }
    const setIsMoney = () => {
        setArticle({...article, paymentMethod:  {...article.paymentMethod, isCheque: !article.paymentMethod.isCheque}})
    }
    const setDebutDate = (date) => {
        setDate(date)
        setArticle({...article, debutDate: date})
    }
    

    return (
        <ArticleComponent 
            article={article}
            setArticle={setArticle}
            unitType={unitType}
            setIsCes={setIsCes}
            setIsCB={setIsCB}
            setIsMoney={setIsMoney}
            date={date}
            setDebutDate={setDebutDate}
            arrayHour={arrayHour}
            arrayMinute={arrayMinute}
            goBack={_goBack}
            categories={categories}
            searchProduit={searchProduit}
            onChangeCategories={onChangeCategories}
            produitData={produitData}
        />
    )
}

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            articleAction: bindActionCreators(getCategoriesAction, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleScreen);
