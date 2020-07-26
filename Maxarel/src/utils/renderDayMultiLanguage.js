import { ConstantString } from "./constant-string"

export const renderDayMultiLanguage = (index) => {  
  let day = ''
  switch(index) {
    case 0: day = ConstantString.STR_SUNDAY
    break;
    case 1: day = ConstantString.STR_MONDAY
    break;
    case 2: day = ConstantString.STR_TUESDAY
    break;
    case 3: day = ConstantString.STR_WEDNESDAY
    break;
    case 4: day = ConstantString.STR_THURSDAY
    break;
    case 5: day = ConstantString.STR_FRIDAY
    break;
    case 6: day = ConstantString.STR_SATURDAY
    break;
  }
  return day
}