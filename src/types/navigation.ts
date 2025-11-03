export type RootStackParamList = {
  // Auth
  Login: undefined;
  Registration: undefined;
  PhoneLogin: undefined;
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  
  // Partner
  PartnerChoice: undefined;
  PartnerPhoneLogin: undefined;
  PartnerRegistration: undefined;
  
  // Main
  Main: undefined;
  Activities: undefined;
  Bookings: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}