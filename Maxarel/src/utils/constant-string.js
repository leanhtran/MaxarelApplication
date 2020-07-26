import { Platform } from 'react-native';
//Screen Login
export const STR_ERROR = "  Le nom d'utilisateur ou le mot de passe que vous avez entrés ne correspondent pas"
export const STR_ANNONCE_TRYING = "Veuillez vérifier et réessayer"

const FONT_REGULAR = Platform.OS === "ios" ? "Calibri" : "Calibri-Regular"

export const ConstantString = {
    ACHTEURS_LABEL: "Consommateur",
    VENDEURS_LABEL: "Producteur",
    PROFIL_LABEL: "Profil",
    //icon euro
    STR_ICON_EURO: '€',

    //forgot password screen
    EMAIL_EMPTY_ALERT_FORGOT: "L'email n'est peut-être pas vide",

    //start screen
    STR_WHO_ARE_YOU: "Vous êtes ",

    // Login Screen
    EMAIL_EMPTY_ALERT: "L'email et le mot de passe ne peuvent pas être vides!",
    INVALID_EMAIL: "Adresse e-mail invalide!",
    CONNECT_SERVER_ERROR: "Erreur de connexion au serveur. Veuillez réessayer!",
    STR_LOGOUT_TEXT: "Se Déconnecter",

    //Register Screen
    STR_TITLE_LOGIN: "Se Connecter",
    STR_TITLE_REGISTER: "Inscription",
    STR_PLACE_HOLDER_NAME: "Prénom - Nom",
    STR_PLACE_HOLDER_SURNAME: "Surname",
    STR_EMAIL_PLACE_HOLDER: "Adresse e-mail",
    STR_PASSWORD_PLACE_HOLDER: "Mot de passe",
    STR_FORGOT_PASSWORD: "Mot de passe oublié",
    STR_ADDRESS: "Adresse",
    STR_FULLNAME_EMPTY_ALERT: 'Nom-Prénom ne peut pas être vide!',
    STR_ADDRESS_EMPTY_ALERT: "L'adresse ne peut pas être vide!",
    STR_PHONE_NUMBER_EMPTY_ALERT: 'Le numéro de téléphone ne peut pas être vide',
    STR_CHECK_PASSWORD_ALERT: "Mot de passe doit contenir 8-16 caractères",
    STR_PARTIULIER: 'Particulier',
    STR_PROFESSIONAL: 'Professionnel',
    STR_ARTISAN: 'Artisan',
    STR_FERME: 'Ferme',
    STR_ASSOCIATION: 'Association',
    STR_MONASTERY_ABBAYE: 'Monastère/Abbaye',
    STR_ALERT_TIME_OUT: `Veuillez activer la géolocalisation de votre appareil, merci`,
    STR_PHONE_NUMBER: 'Numéro de téléphone',
    STR_MANDATORY_INFORMATION: "mentions obligatoires",
    STR_DETAILS_ADDRESS :"Précisions d’accès",
    STR_QUESTION_DETAILS_ADDRESS: "Mauvaise couverture réseau à cette adresse",
    //Article Screen
    STR_TITLE_ARTICLE: "Je propose un produit",
    STR_CURRENT_PRICE: "Tarif conseillé",
    STR_PAYMENT_METHOD: "Moyens de paiement",
    STR_COME_PICK: "A venir récolter",
    STR_TITLE_DATE: "Créneau de collecte",
    STR_TITLE_START: "Début",
    STR_CASH_METHOD: "Espèces",
    STR_CB_METHOD: "CB",
    STR_CHEQUE_METHOD: "Chèque",
	STR_TITLE_PUBLIC: "Publier",
	STR_TITLE_EDIT: "Modifiez",
    STR_UNIT: "Unité",
    STR_TITLE_CERTIFICATE: "Title de certifié",
    STR_PRICE: "Prix",
    STR_CERTIFICATIONS: "Certifications",
    STR_TITLE_IS_CERTIFICATE: "Certification",
    STR_IS_PESTICIDE: "Sans pesticides",
    STR_DESCRIPTION: "Description",
    STR_PRODUCT: "Produit",
    STR_QUANTITY: "Quantités",
    STR_STATUS: "Statut",
    STR_EVALUATION: "Évaluations",
    STR_SIGNOUT: "Déconnexion",
    STR_SIGNOUT_CONFIRM: "Vous voulez vous déconnecter?",
    STR_CANCEL: "Annuler",
    STR_OK: "Oui",
    STR_NO_DATA: "Pas de données",
    STR_CALENDAR: "Calendrier",
    STR_DAY: "Jour",
    STR_EMPTY_TIME: "L'heure de début peut ne pas être vide",
    STR_FREE: "Gratuit",
    STR_ALERT_FREE: "Êtes-vous sûr que le produit est gratuit",
    STR_ADD: 'AJOUTER',
    STR_TITLE_HISTORY: 'Historique De Mes Produits',
    STR_SCHEDULE: 'Programme',
    STR_EMPTY_DAY_OF_WEEK: "Le jour de la semaine ne peut pas être vide lors de la publication sur un calendrier",
    STR_EMPTY_END_TIME: "L'heure de fin ne peut pas être vide",
    STR_EMPTY_QUANTITY: "La quantité ne peut pas être nulle",
    STR_LIMITED_DESCRIPTION: "La description ne peut pas dépasser 500 caractères",
    STR_TAKEAWAY: "Prêt à emporter",
    STR_BRING_YOUR_CONTAINERS: "Apportez vos contenants",
    STR_ALERT_NOT_PROFESSIONAL: "Cette fonction est réservée aux producteurs professionnels",
    STR_BACK: "Retour",
    STR_LYDIA: "Lydia",
    STR_CATEGORY: "Catégorie",
    STR_ALERT_ENDTIME_SMALLER_STARTTIME: "L'heure de fin ne peut pas être inférieure ou égale à l'heure de début",
    STR_ALERT_PAYMENT_METHOD_IS_NULL: "Le mode de paiement ne peut pas être vide",
    STR_COME_PICK_OR_TAKEAWAY: "Veuillez choisir A venir récolter, Prêt à emporter ou Apportez vos contenants",
    STR_NOT_GREATER_5_HOURS: "L'heure de fin ne peut pas être supérieure à 5 heures à partir de l'heure de début",
    STR_CHOOSE_PRODUCT: "Choisissez le produit",
    STR_CHOOSE_CATEGORY: "Choisissez une catégorie",
    STR_DAY: "Journée",
    STR_START_TIME: "Heure de début",
    STR_END_TIME: "Heure de fin",
    STR_ALERT_CREATE_SUCCESS_ON_SCHEDULE: "Votre publication sera automatiquement publiée et annulée dans les délais",
    STR_PLEASE_SEARCH: "Veuillez rechercher",
    STR_TITLE_CHARTER_MAXAREL: "Charte Maxarel",
    STR_TAKE_PHOTO: "Prendre une photo...",
    STR_CHOOSE_IN_LIBRARY: "Choisissez une photo parmi vos photos...",
    STR_ADD_PRODUCT_PHOTO: "Ajouter Une Photo Du Produit",
    STR_UPDATE_PROFILE_PHOTO: "Mettre à jour l'image de profil",
    STR_QUESTION_UPDATE_PROFILE_PHOTO: "Souhaitez-vous utiliser cette image comme avatar ?",
    STR_ID: "Référence",

    //History Article 
    STR_LIEU: 'Lieu',
    STR_TODAY: 'Date',
    STR_TITLE_BY_LIEU: 'Autour de moi',
    STR_TITLE_BY_TODAY: 'Actuellement disponible',
    STR_UNTIL: "jusqu'à",
    STR_NO_PRODUCT_MESSAGE: "Il n'y a aucun produit pour cette catégorie!",
    STR_CHOOSE_DATE_MESSAGE: "Veuillez choisir une date plutôt qu'une date plus récente!",
    STR_CHOOSE_IMAGE_ERROR_MESSAGE: "Sélectionnez l'erreur de photo du produit, réessayez!",
    STR_CHOOSE_PRODUCT_CATEGORY_MESSAGE: "Veuillez choisir les catégories et le produit!",
    STR_REQUEST_API_ERROR: "Une erreur interne s'est produite lors de votre demande!",
    STR_QUICK_POST: "Publication rapide",
    STR_GOOD_EVALUATION: "Plébiscité",
    STR_REMEMBER_PRODUCT_SUCCESS: "Vous recevrez une notification lorsque ce produit sera disponible",
    STR_SEARCH: "Rechercher...",
    STR_SUNDAY: "Dim",
    STR_MONDAY: "Lun",
    STR_TUESDAY: "Mar",
    STR_WEDNESDAY: "Mer",
    STR_THURSDAY: "Jeu",
    STR_FRIDAY: "Ven",
    STR_SATURDAY: "Sam",

    STR_FULL_SUNDAY: "Dimanche",
    STR_FULL_MONDAY: "Lundi",
    STR_FULL_TUESDAY: "Mardi",
    STR_FULL_WEDNESDAY: "Mercredi",
    STR_FULL_THURSDAY: "Jeudi",
    STR_FULL_FRIDAY: "Vendredi",
    STR_FULL_SATURDAY: "Samedi",

    STR_CANNOT_EDIT: "Impossible de modifier car la publication du produit est inactive",
    STR_PLEASER_CHOOSE_PUBLICATION: "Veuillez sélectionner la publication",
    STR_ALERT_EMPTY_DATA: "Vous n'avez pas de publications, choisissez de créer une nouvelle publication",
    STR_CREATE_ARTICLE: "Créer la publications",
    STR_UPDATE_ARTICLE: "Modifier l'heure des publications",
    STR_DELETE_ARTICLE: "Supprimer la publications",

    //Details article
    STR_ARRIVE: "J'arrive !",
    STR_AVAILABLE: "Disponible",
    STR_DETAILS_DU_PRODUIT: "Détails du produit",
    STR_RECOVERY: "Récupération",
    STR_TITLE_MAP: "Plan d’accès",
    STR_ACCEPTED: "acceptés",
    STR_FROM: "de",
    STR_TO: "à",
    STR_TEXT_FOOTER: "Le paiement se fera directement auprès du producteur",

    //Font Family
    FONT_BOLD: 'Calibri-Bold',
    FONT_LIGHT: 'Calibri-Light',
    FONT_REGULAR,
    FONT_ITALIC: 'Calibri-Italic',
    //key google api
    // KEY_GG_API: 'AIzaSyCbC37rKSdjZ325m6RZlC_cA2MW4sf54Fo', // new Maxarel
    // KEY_GG_API: 'AIzaSyCy51PewCeQk0rvFlIA2Wj2FnSZDjM3lgg', // old
    // KEY_GG_API: 'AIzaSyDCrGZXXsyMYRY2Ewmznl0zVMHtpkRWkEc', // current
    KEY_GG_API: "AIzaSyC1T5A0ce0dJVYavhzTWH4w-yJ243KuTTI", //other
    
    //profile
    STR_EDIT_PROFILE: 'Editer le profil',
    STR_SUBMIT: 'Valider',
    STR_NEW_PASSWORD: 'Nouveau mot de passe',
    STR_CONFIRM_PASSWORD: 'Confirmer le mot de passe',
    STR_PASSWORD_INCORRECT: 'Mot de passe incorrect',
    STR_CHANGE_PASSWORD: "Changer le mot de passe",
    STR_NEW_PASSWORD_NOT_MATCH: 'Les nouveaux mots de passe ne correspondent pas',
    STR_SAVE_PROFILE: 'Enregistrer le profil',
    STR_SAVE_PASSWORD: 'Enregistrer le mot de passe',

    // EVALUTION
    STR_ACCUEIL: 'Accueil',
    STR_TITLE_EVALUATION: 'Comment avez-vous trouvé cette expérience?',
    STR_SEND: "Envoyez",
    STR_EMPTY_EVALUATION: "Vous n'avez pas évalué le produit!",
    STR_THANK_CUSTOMER_WHEN_SEND_FEEDBACK: "Merci de nous envoyer vos commentaires",
    STR_SEND_FEEDBACK_SUCCESS: "Évaluation soumise avec succès",

    //location
    STR_DIRECT: "Directions",
    STR_NOT_AVAILABEL: "Non disponible",

    //Maxrel
    STR_CHARTER_MAXAREL: `Bienvenue sur la plateforme Maxarel via l’interface de site web ou l’application mobile. Avant de confirmer votre sélection, veuillez lire attentivement les conditions d’utilisation ci-dessous et le règlement de fonctionnement.

    Le consommateur :
    1.	donne le code de sécurité reçu par SMS, après avoir saisi son numéro de téléphone
    2.	s’engage à se déplacer à partir du moment où il valide son arrivée avec l’icône « J’arrive ! »

Le producteur :
    1.	s’engage à accepter la diffusion de sa localisation sur l’application Maxarel
    2.	s’engage à appliquer le tarif tel qu’il l’a affiché dans son annonce
    3.	s’engage sur la véracité de ses déclarations
    4.	s’engage à accepter de présenter les documents relatifs aux accréditations/labels qu’il annonce posséder
    5.	s’engage à disposer d’un outil de mesure comme une balance pour garantir la fiabilité des poids
    6.	doit être conscient que dans son intérêt il doit proposer des prix correspondant à la qualité des produits qu’il propose
    7.	s’engage à accueillir les consommateurs dans les créneaux qu’il a proposés
    8.	déclare n’utiliser que sa propre production pour toute offre de produit élaboré
    9.	tout produit vendu doit être légal

Toute fonctionnalité nouvelle ou ajoutée à la plateforme est régie par les présentes conditions d’utilisation et nous mettons tout en œuvre pour que vous trouviez entière satisfaction dans l’utilisation des services fournis par Maxarel.`,
    STR_AGREE_CHARTER_MAXAREL: "Je m'engage à respecter la Charte Maxarel",

    //Certificate
    STR_AB: "Agriculture Biologique",
    STR_DE: "Demeter",
    STR_HVE: "HVE",
    STR_LR: "Label Rouge",
    STR_AOC: "AOC",
    STR_AOP: "AOP",
    STR_IGP: "IGP"
}