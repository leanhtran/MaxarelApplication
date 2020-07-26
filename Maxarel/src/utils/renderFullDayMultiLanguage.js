import { ConstantString } from "./constant-string"

export const renderFullDayMultiLanguage = (index) => {  
  let day = ''
  switch(index) {
    case 0: day = ConstantString.STR_FULL_SUNDAY
    break;
    case 1: day = ConstantString.STR_FULL_MONDAY
    break;
    case 2: day = ConstantString.STR_FULL_TUESDAY
    break;
    case 3: day = ConstantString.STR_FULL_WEDNESDAY
    break;
    case 4: day = ConstantString.STR_FULL_THURSDAY
    break;
    case 5: day = ConstantString.STR_FULL_FRIDAY
    break;
    case 6: day = ConstantString.STR_FULL_SATURDAY
    break;
  }  
  return day
}