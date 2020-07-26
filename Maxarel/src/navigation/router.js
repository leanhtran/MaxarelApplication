import { ColorCustom } from '../utils/color';
import { ConstantString } from '../utils/constant-string';
import StartScreen from '../screens/startscreen/startScreen';
import LoginScreen from '../screens/startscreen/loginScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { createStackNavigator } from 'react-navigation-stack';
import ArticleScreen from '../screens/startscreen/articleScreen';
import RegisterScreen from '../screens/startscreen/registerScreen';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import HistoryArticleScreen from '../screens/acheteurs-page/showArticle/historyArticleScreen';
import DetailArticleScreen from '../screens/acheteurs-page/detailArticle/detailArticleScreen';
import HistoryArticleVenduerScreen from '../screens/vendeurs/HistoryArticleVenduerScreen';
import CreateArticleScreen from '../screens/vendeurs/CreateArticleSreen';
import LocationScreen from '../screens/startscreen/locationScreen';
import AuthLoading from '../screens/startscreen/AuthLoading';
import LocationDetailScreen from '../screens/acheteurs-page/detailArticle/locationDetailScreen';
import NotifyArriveScreen from '../screens/notification/notifyArriveScreen';
import ForgotPasswordScreen from '../screens/startscreen/forgotPasswordScreen';
import EditProfileScreen from '../screens/profile/editProfileScreen';
import LocationProfileScreen from '../screens/profile/locationProfileScreen';
import ChangePasswordScreen from '../screens/startscreen/changePasswordScreen';
import NotifyEvaluationScreen from '../screens/notification/notifyEvaluationScreen';
import EditArticleScreen from '../screens/vendeurs/EditArticleScreen';
import { Platform } from 'react-native';

const StartStack = createStackNavigator({

    Start: {
        screen: StartScreen,
        navigationOptions: {
            gesturesEnabled: false,
            header: null
        }
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            gesturesEnabled: false,
            header: null
        }
    },
    RegisterScreen: {
        screen: RegisterScreen,
        navigationOptions: {
            gesturesEnabled: false,
            header: null
        }
    },
    HistoryArticle: {
        screen: HistoryArticleScreen,
        navigationOptions: {
            gesturesEnabled: false,
            header: null
        }
    },
    ArticleScreen: {
        screen: ArticleScreen,
        navigationOptions: {
            gesturesEnabled: false,
            header: null
        }
    },

    DetailArticle: {
        screen: DetailArticleScreen,
        navigationOptions: {
            gesturesEnabled: false,
            header: null
        }
    },

    LocationScreen: {
        screen: LocationScreen,
        navigationOptions: {
            gesturesEnabled: false,
            header: null
        }
    },

    LocationDetail: {
        screen: LocationDetailScreen,
        navigationOptions: {
            gesturesEnabled: false,
            header: null
        }
    },

    NotifyArrive: {
        screen: NotifyArriveScreen,
        navigationOptions: {
            gesturesEnabled: false,
            header: null
        }
    },

    ForgotPassword: {
        screen: ForgotPasswordScreen,
        navigationOptions: {
            gesturesEnabled: false,
            header: null
        }
    },

    NotifyEvaluation: {
        screen: NotifyEvaluationScreen,
        navigationOptions: {
            gesturesEnabled: false,
            header: null
        }
    }
}, {
    initialRouteName: 'Start',
});

const ArticleStack = createStackNavigator(
    {
        HistoryArticle: {
            screen: HistoryArticleVenduerScreen,
            navigationOptions: {
                gesturesEnabled: false,
                header: null
            }
        },
        ArticleScreen: {
            screen: CreateArticleScreen,
            navigationOptions: {
                gesturesEnabled: false,
                header: null
            }
        },
        LocationDetail: {
            screen: LocationDetailScreen,
            navigationOptions: {
                gesturesEnabled: false,
                header: null
            }
		},
		EditArticleScreen: {
			screen: EditArticleScreen,
			navigationOptions: {
				gestureDirection: false,
				header: null
			}
		}
    }
);

const ProfileStack = createStackNavigator(
    {
        ProfileScreen: {
            screen: ProfileScreen,
            navigationOptions: {
                gesturesEnabled: false,
                header: null
            }
        },
        EditProfile: {
            screen: EditProfileScreen,
            navigationOptions: {
                gesturesEnabled: false,
                header: null
            }
        },
        LocationProfile: {
            screen: LocationProfileScreen,
            navigationOptions: {
                gesturesEnabled: false,
                header: null
            }
        },
        ChangePassword: {
            screen: ChangePasswordScreen,
            navigationOptions: {
                gesturesEnabled: false,
                header: null
            }
        }
    },
    {
        initialRouteName: "ProfileScreen"
    }
);

const ConsomateursStack = createStackNavigator(
    {
        HistoryArticle: {
            screen: HistoryArticleScreen,
            navigationOptions: {
                gesturesEnabled: false,
                header: null
            }
        },
        DetailArticle: {
            screen: DetailArticleScreen,
            navigationOptions: {
                gesturesEnabled: false,
                header: null
            }
        },
        LocationDetail: {
            screen: LocationDetailScreen,
            navigationOptions: {
                gesturesEnabled: false,
                header: null
            }
        },
        NotifyArrive: {
            screen: NotifyArriveScreen,
            navigationOptions: {
                gesturesEnabled: false,
                header: null
            }
        }
    }
);

const HomeStack = createMaterialTopTabNavigator(
    {
        Achteurs: {
            screen: ConsomateursStack,
            navigationOptions: {
                tabBarLabel: ConstantString.ACHTEURS_LABEL
            }
        },
        Vendeurs: {
            screen: ArticleStack,
            navigationOptions: {
                tabBarLabel: ConstantString.VENDEURS_LABEL
            }
        },
        Profil: {
            screen: ProfileStack,
            navigationOptions: {
                tabBarLabel: ConstantString.PROFIL_LABEL
            }
        },
    }, {
    // initialRouteName: 'Vendeurs',
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
        style: {
            backgroundColor: ColorCustom.WHITE,
            borderTopWidth: 0.5,
            borderTopColor: ColorCustom.LIGHT_GRAY_1,
            height: 50,
            justifyContent: 'center',
            alignContent: 'center',
        },
        labelStyle: {
            fontSize: 14,
            fontFamily: ConstantString.FONT_REGULAR,
            marginTop: Platform.OS === 'ios' ? 5 : 0,
        },
        activeTintColor: ColorCustom.GREEN,
        inactiveTintColor: ColorCustom.GRAY,
        upperCaseLabel: false,
        indicatorStyle: {
            backgroundColor: ColorCustom.WHITE,
        },
    }
});

const RouterAuthStack = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        Start: StartStack,
        Home: HomeStack,
        },
    {
        initialRouteName: "AuthLoading"
    }

);

export default createAppContainer(RouterAuthStack);