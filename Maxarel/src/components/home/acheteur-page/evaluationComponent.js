import React from 'react'
import { View, StyleSheet } from 'react-native'
import { ColorCustom } from '../../../utils/color'

function EvaluationComponent(props) {
  const {
    size,
    color
  } = props  

  return (
    <View style={[styles.styleCircle, {
      backgroundColor: color, 
      width: size.width, 
      height: size.height, 
      borderRadius: size.radius
    }]}
    />
  )
}

const styles = StyleSheet.create({
  styleCircle: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    marginRight: 5
  }
})

export default EvaluationComponent
