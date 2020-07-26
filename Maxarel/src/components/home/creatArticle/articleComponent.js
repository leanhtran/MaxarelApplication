import React from 'react'
import { 
    View, 
    Text, 
    TouchableOpacity,
    Switch,
    ScrollView, 
    Image,
    Picker,
    } from 'react-native'
import {OutlinedTextField} from 'react-native-material-textfield'
import { ColorCustom } from '../../../utils/color'
import DatePicker from 'react-native-datepicker'
import DropDownPaging from '../../componentcommun/drop-down-list-paging'
import {myHeight} from "../../../utils/dimension"
import {Images } from "../../../utils/images";
import styles from './styles'
// import { ConstantString } from '../../utils/constant-string'
import { ConstantString } from '../../../utils/constant-string'


function ArticleComponent(props) {
    const {
        article, 
        setArticle, 
        unitType,
        setIsCes,
        setIsCB,
        setIsMoney,
        date,
        setDebutDate,
        arrayHour,
        arrayMinute,
        goBack,
        categories
    } = props
    
    const _renderCategories = () => {
        return (
            categories.map((value, index) => {
                return ( <Picker.Item value={index + 1} label={value} key={index}/>)
            })
    )
    }

    const _renderItemUnity = () => {
        return (
                unitType.map((value, index) => {
                    return ( <Picker.Item value={value} label={value} key={index}/>)
                })
        )
    }
    const _renderHour = () => {
        return (
            arrayHour.map(value => {
                return(
                    <Picker.Item value={value} label={value} key={value} />
                )
            })
        )
    }
    const _renderMinute = () => {
        return (
            arrayMinute.map(value => {
                return(
                    <Picker.Item value={value} label={value} key={value} />
                )
            })
        )
    }

    const _renderData = () => {
        const data = [{key: "id1", label: "test"}, {key: "id2", label: "test1"}, 
                    {key: "id3", label: "test2"}, {key: "id4", label: "test3"}, 
                    {key: "id5", label: "test4"}, {key: "id6", label: "test5"},
                    {key: "id7", label: "test7"}, {key: "id8", label: "test8"},
                    {key: "id9", label: "test9"}, {key: "id10", label: "test10"}, ]
        return data
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={goBack} style={styles.btnBack}>
                        <Image style={styles.imageBack} source={Images.back}/>
                            <Text style={styles.txtBack}>
                                Back
                            </Text>
                    </TouchableOpacity>
                    <Text style={styles.txtHeader}>{ConstantString.STR_TITLE_ARTICLE}</Text>
                </View>
                

                <DropDownPaging
                    data = {_renderData()}
                    heightList = {myHeight*30/100}
                    style = {styles.dropDownListCategory}
                >
                </DropDownPaging>
                <View style={styles.body}>

                {
                /*<View style={styles.btnCategories}>
                    <Picker
                        label="Categories"
                        selectedValue={article.categoryId}
                        onValueChange={(value, index) => {setArticle({...categories, categoryId: (index + 1)})}}
                    >
                        {_renderCategories()}
                    </Picker>
                </View> */
                }

                <OutlinedTextField
                    contentInset={styles.stTextField}
                    fontSize={19}
                    label={ConstantString.STR_PRODUCT}
                />

                <TouchableOpacity style={styles.btnImage}>
                    <Image style={styles.stImage} source={Images.camera}/>
                </TouchableOpacity>

                <OutlinedTextField 
                    onChangeText={text => setArticle({...article, description: text})}
                    contentInset={styles.stTextField}
                    fontSize={19}
                    label={ConstantString.STR_DESCRIPTION}    
                />

                <View style={styles.row}>
                
                    <View style={styles.tfInRow}>
                        <OutlinedTextField
                            onChangeText={text => setArticle({...article, quantity: text})}
                            contentInset={styles.stTextField}
                            fontSize={19}
                            label={ConstantString.STR_QUANTITY}
                        />
                    </View>
                    
                    <View style={styles.btnDropdownUnit}>
                        <Picker 
                            
                        >
                            {_renderItemUnity()}
                        </Picker>
                        
                    </View>
                    
                </View>
                
                <View style={styles.row}>
                    <Text style={styles.stText}>
                        {ConstantString.STR_IS_PESTICIDE}
                    </Text>

                    <Switch 
                        value={article.isPesticides}
                        onValueChange={(val) => setArticle({...article, isPesticides: val})}
                    />
                </View>
                
                <View style={styles.row}>
                    <Text style={styles.stText}>
                        {ConstantString.STR_TITLE_IS_CERTIFICATE}
                    </Text>

                    <Switch 
                        value={article.isCertification}
                        onValueChange={(val) => setArticle({...article, isCertification: val})}
                    />
                </View>

                <OutlinedTextField
                    onChangeText={text => setArticle({...article, certificationName: text})}
                    contentInset={styles.stTextField}
                    fontSize={19}
                    label={ConstantString.STR_TITLE_CERTIFICATE}    
                />

                <View style={styles.row}>
                    <View style={styles.colLeftPrice}>
                        <View style={styles.tfInRowPrice}>
                            <OutlinedTextField
                                onChangeText={text => setArticle({...article, price: text})}
                                fontSize={19}
                                contentInset={styles.stTextField}
                                label={ConstantString.STR_PRICE}
                            />
                        </View>
                        <View style={styles.btnPickerInRowPrice}>
                            <Picker>
                                {_renderItemUnity()}
                            </Picker>
                        </View>
                    </View>
                    
                    <View style={styles.areaCurrentPrice}>
                        <Text style={styles.textAreaCurrentPrice}>{ConstantString.STR_CURRENT_PRICE}</Text>
                    </View>
                </View>
                
                <View style={styles.rowPayment}>
                    <View style={styles.colLeftPayment}>
                        <Text style={styles.stText}>
                            {ConstantString.STR_PAYMENT_METHOD}
                        </Text>
                    </View>
                    
                    <View style={styles.colRigthPayment}>
                        <TouchableOpacity 
                            style={[styles.btnCes, {backgroundColor: article.isCes ? ColorCustom.GREEN : ColorCustom.WHITE }]}
                            onPress={setIsCes}
                            activeOpacity={1}
                        >
                            <Text 
                                style={[styles.textPayment, {color: article.isCes ? ColorCustom.gray : ColorCustom.GREEN }]}
                            >
                                {ConstantString.STR_CASH_METHOD}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={setIsCB}
                            style={[styles.btnCB, {backgroundColor: article.isCB ? ColorCustom.GREEN : ColorCustom.WHITE }]}
                            activeOpacity={1}
                        >
                            <Text style={[styles.textPayment, {color: article.paymentMethod.isCB ? ColorCustom.GRAY : ColorCustom.RED }]}>
                                {ConstantString.STR_CB_METHOD}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={setIsMoney}
                            style={[styles.btnMoney, {backgroundColor: article.isMoney ? ColorCustom.GREEN : ColorCustom.WHITE }]}
                            activeOpacity={1}
                        >   
                            <Text style={[styles.textPayment, {color: article.paymentMethod.isCheque ? ColorCustom.WHITE : ColorCustom.GREEN }]}>
                                {ConstantString.STR_CHEQUE_METHOD}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>

                <View style={styles.row}>
                    <Text style={styles.stText}>
                        {ConstantString.STR_COME_PICK}
                    </Text>

                    <Switch 
                        value={article.comePick}
                        onValueChange={(val) => setArticle({...article, comePick: val})}
                    />
                </View>

                <Text style={styles.stText}>{ConstantString.STR_TITLE_DATE}</Text>

                <View style={styles.rowDebutDate}>
                    <View style={styles.colLeftDebutDate}>
                        <Text style={styles.txtDebutDate}>
                            Début
                        </Text>
                        <DatePicker 
                            confirmBtnText = {"Confirm"}
                            cancelBtnText = {"Cancel"}
                            style={styles.btnDate}
                            date={date}
                            mode={'datetime'}
                            onDateChange={date => setDebutDate(date)}
                        />
                    </View>

                    <View style={styles.colRightDebutDate}>
                        <View>
                            <Text style={styles.txtFin}>
                                Fin
                            </Text>
                        </View>

                        <View style={styles.rowBelowDebutDate}>
                            <View style={styles.pickerDebutDate}>
                                <Picker
                                    selectedValue={article.endHour}
                                    onValueChange={(value) => setArticle({...article, endHour: value})}
                                >
                                    {_renderHour()}
                                </Picker>
                            </View>
                            
                            <View style={styles.pickerDebutDate}>
                                <Picker 
                                    selectedValue={article.endMinute}
                                    onValueChange={(value) => setArticle({...article, endMinute: value})}
                                >
                                    {_renderMinute()}
                                </Picker>
                            </View>
                        </View>

                        
                    </View>
                </View>
                </View>
                <TouchableOpacity style={styles.btnPublier}>
                    <Text style={styles.txtPublier}>
                        {ConstantString.STR_TITLE_PUBLIC}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        
    )
}
export default ArticleComponent
