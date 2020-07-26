import { all } from 'redux-saga/effects';
import { watchGetUnitType } from './get-unit-type-saga';
import { watchLogin, watchResgister } from "./login-saga";
import { watchCategories } from './get-categories-saga';
import { watchGetProduit, watchGetProduitByCategoriesId } from './get-produit-saga'
import { watchGetArticleById, watchCreateArticleByUser } from './get-article-by-id';
import { watchGetHistoryArticle, watchGetProductByInputText, watchGetHistoryArticleVendeur, watchCreateArticle } from './get-history-article-saga';
import { watchGetLocation } from './get-location-saga';
import { watchGetProfile } from './get-profile-saga';
import { watchSendDtCustomer } from './send-dt-customer-saga';
import { watchForgot } from './forgot-password-saga';
import { watchSendDtProvider } from './send-dt-provider-saga';
import { watchDeleteEndPoint } from './delete-end-point-saga';
import { watchUpdateProfile, watchIsUpdateProfile } from './update-profile-saga';
import { watchChangePassword } from './change-password-saga';
import { watchQuickyCreateArticle } from './quickly-create-article-saga';
import { watchAddEvaluation } from './add-evaluation-saga';
import { watchUpdateArticle } from './update-article-saga';
import { watchUpdateAvatar, watchGetAvatar } from './avatar-saga';
import { watchRunFirstTime } from './run-first-time-saga';
import { watchRememberProduct } from './remember-product-saga';
import { watchDeleteArticleSaga } from './delete-article-saga';
import { watchGetCertificate } from './get-certificate-saga';
import { watchGetCondition } from './get-condition-saga';
function* rootSaga() {
    yield all([
		//it will looking for the TYPES in the Class
        watchLogin(),
        watchResgister(),
        watchGetUnitType(),
        watchCategories(),
        watchGetProduit(),
        watchGetProduitByCategoriesId(),
        watchGetHistoryArticle(),
        watchGetProductByInputText(),
        watchGetArticleById(),
        watchCreateArticleByUser(),
        watchGetHistoryArticleVendeur(),
        watchGetLocation(),
        watchGetProfile(),
        watchSendDtCustomer(),
        watchForgot(),
        watchSendDtProvider(),
        watchDeleteEndPoint(),
        watchUpdateProfile(),
        watchIsUpdateProfile(),
        watchChangePassword(),
        watchQuickyCreateArticle(),
        watchCreateArticle(),
		watchAddEvaluation(),
		watchUpdateArticle(),
        watchGetAvatar(),
        watchUpdateAvatar(),
        watchRunFirstTime(),
        watchRememberProduct(),
        watchDeleteArticleSaga(),
        watchGetCertificate(),
        watchGetCondition(),
    ])
}
export default rootSaga