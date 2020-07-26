import { ConstantString } from "./constant-string";
import { Images } from "./images";

export const renderCertificateImage = (title) => {
  let sourceImage = ''
  switch(title) {
    case ConstantString.STR_AB: sourceImage = Images.certificate 
    break;
    case ConstantString.STR_DE: sourceImage = Images.deCer
    break;
    case ConstantString.STR_HVE: sourceImage = Images.hveCer
    break;
    case ConstantString.STR_LR: sourceImage = Images.lbCer
    break;
    case ConstantString.STR_AOC: sourceImage = Images.aocCer
    break;
    case ConstantString.STR_AOP: sourceImage = Images.aopCer
    break;
    case ConstantString.STR_IGP: sourceImage = Images.igpCer
    break;
    default: sourceImage = Images.certificate
    break;
  }
  return sourceImage
}