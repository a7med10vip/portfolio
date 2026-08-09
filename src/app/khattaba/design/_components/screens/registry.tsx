import type { ComponentType } from "react";
import type { Screen } from "../canvas/canvasLayout";
import ScreenPlaceholder from "./_Placeholder";
import P01Home from "./P01_Home";
import P02About from "./P02_About";
import P15HowItWorks from "./P15_HowItWorks";
import P17Faq from "./P17_Faq";
import P16Contact from "./P16_Contact";
import P12Privacy from "./P12_Privacy";
import P13Terms from "./P13_Terms";
import P14Usage from "./P14_Usage";
import P03aRegisterInfo from "./P03a_RegisterInfo";
import P03bRegisterMan from "./P03b_RegisterPrefs";
import P03bwRegisterWoman from "./P03bw_RegisterWoman";
import { Questionnaire } from "./_auth/Questionnaire";
import P03cRegisterOtp from "./P03c_RegisterOtp";
import P03dPending from "./P03d_Pending";
import P03eAccepted from "./P03e_Accepted";
import P03fRejected from "./P03f_Rejected";
import P04Login from "./P04_Login";
import P05aForgotPhone from "./P05a_ForgotPhone";
import P05bForgotReset from "./P05b_ForgotReset";
import P06aBrowseDefault from "./P06a_BrowseDefault";
import P06bBrowseFilters from "./P06b_BrowseFilters";
import P06cBrowseEmpty from "./P06c_BrowseEmpty";
import P07aProfileWoman from "./P07a_ProfileWoman";
import P07bProfileMan from "./P07b_ProfileMan";
import P08aMyProfile from "./P08a_MyProfile";
import P08bEditProfile from "./P08b_EditProfile";
import P09Requests from "./P09_Requests";
import P10aChatActive from "./P10a_ChatActive";
import P10bChatFiltered from "./P10b_ChatFiltered";
import P10cChatEnded from "./P10c_ChatEnded";
import P11aPayMethod from "./P11a_PayMethod";
import P11bPayCard from "./P11b_PayCard";
import P11cPaySuccess from "./P11c_PaySuccess";
import P11dPayFailed from "./P11d_PayFailed";
import A01Dashboard from "./A01_Dashboard";
import A02aMembersList from "./A02a_MembersList";
import A02bMemberDetails from "./A02b_MemberDetails";
import A03ChatMonitor from "./A03_ChatMonitor";
import A04Payments from "./A04_Payments";
import A05Reports from "./A05_Reports";
import A06BannedWords from "./A06_BannedWords";
import A07Settings from "./A07_Settings";
import A08Content from "./A08_Content";
import A09AuditLog from "./A09_AuditLog";
import AM01BlockModal from "./AM01_BlockModal";
import AM02DeleteModal from "./AM02_DeleteModal";
import AM03PermissionsModal from "./AM03_PermissionsModal";
import M01Splash from "./M01_Splash";
import M02Onboarding1 from "./M02_Onboarding1";
import M03Onboarding2 from "./M03_Onboarding2";
import M04Onboarding3 from "./M04_Onboarding3";
import M05BottomNav from "./M05_BottomNav";
import M06PushNotif from "./M06_PushNotif";
import S01NotFound from "./S01_NotFound";
import S02ServerError from "./S02_ServerError";
import S03Maintenance from "./S03_Maintenance";
import S04ComingSoon from "./S04_ComingSoon";
import P18Wallet from "./P18_Wallet";
import P19Subscription from "./P19_Subscription";
import P20Notifications from "./P20_Notifications";
import P21Agreement from "./P21_Agreement";
import P22ProjectResult from "./P22_ProjectResult";
import P23Pledges from "./P23_Pledges";
import P24AccountFrozen from "./P24_AccountFrozen";
import P25IdUpload from "./P25_IdUpload";
import P26HelpGuide from "./P26_HelpGuide";
import A10EditReview from "./A10_EditReview";
import P27ProfileVisitors from "./P27_ProfileVisitors";
import P28AutoSearch from "./P28_AutoSearch";
import MP00HeroMobile from "./MP00_HeroMobile";
import MP01HomeMobile from "./MP01_HomeMobile";
import MP04LoginMobile from "./MP04_LoginMobile";
import MP03aRegisterMobile from "./MP03a_RegisterMobile";
import MP03cOtpMobile from "./MP03c_OtpMobile";
import MP06BrowseMobile from "./MP06_BrowseMobile";
import MP07ProfileMobile from "./MP07_ProfileMobile";
import MP08aMyProfileMobile from "./MP08a_MyProfileMobile";
import MP09RequestsMobile from "./MP09_RequestsMobile";
import MP10ChatMobile from "./MP10_ChatMobile";
import MP11PayMobile from "./MP11_PayMobile";
import MP18WalletMobile from "./MP18_WalletMobile";
import MP19SubscriptionMobile from "./MP19_SubscriptionMobile";
import MP20NotifsMobile from "./MP20_NotifsMobile";
import MP22ResultMobile from "./MP22_ResultMobile";
import MP05aForgotPhoneMobile from "./MP05a_ForgotPhoneMobile";
import MP05bForgotResetMobile from "./MP05b_ForgotResetMobile";
import { MP03dPendingMobile, MP03eAcceptedMobile, MP03fRejectedMobile } from "./MP03status_Mobile";
import { MP11cPaySuccessMobile, MP11dPayFailedMobile } from "./MP11_PaySuccessFail_Mobile";
import MP21AgreementMobile from "./MP21_AgreementMobile";
import { MP24FrozenMobile, MP27VisitorsMobile, MP28AutoSearchMobile } from "./MP24_27_28_Mobile";
import { MP08bEditMobile, MP25IdUploadMobile, MP06bFiltersMobile, MP11bPayCardMobile } from "./MP_Misc_Mobile";
import MP30HomeMobile from "./MP30_HomeMobile";
import MP31AccountMobile from "./MP31_AccountMobile";
import MP32SettingsMobile from "./MP32_SettingsMobile";
import { MP03bManMobile, MP03bwWomanMobile } from "./MP03b_QuestionnaireMobile";
import { MP41EmptyRequestsMobile, MP42EmptyChatMobile, MP43EmptyNotifsMobile, MP44EmptyWalletMobile } from "./MP_EmptyStates_Mobile";
import { MP45ReportModalMobile, MP46LogoutModalMobile, MP47RequestSentMobile } from "./MP_Modals_Mobile";

type ScreenComponent = ComponentType<{ screen: Screen }>;

/* Registry maps each screen code to its component.
 * Replace `undefined` with a real component as each screen is designed. */
const registry: Record<string, ScreenComponent | undefined> = {
  // Marketing (8)
  P01: P01Home, P02: P02About, P15: P15HowItWorks, P17: P17Faq,
  P16: P16Contact, P12: P12Privacy, P13: P13Terms, P14: P14Usage,

  // Auth (10)
  P03a: P03aRegisterInfo, P03b: P03bRegisterMan, P03bw: P03bwRegisterWoman,
  // استبيان مُقسَّم على صفحات (man: P03b·2·3·4 / woman: P03bw·2·3·4)
  P03b2: () => <Questionnaire gender="man" stepIndex={1} />,
  P03b3: () => <Questionnaire gender="man" stepIndex={2} />,
  P03b4: () => <Questionnaire gender="man" stepIndex={3} />,
  P03bw2: () => <Questionnaire gender="woman" stepIndex={1} />,
  P03bw3: () => <Questionnaire gender="woman" stepIndex={2} />,
  P03bw4: () => <Questionnaire gender="woman" stepIndex={3} />,
  P03c: P03cRegisterOtp, P03d: P03dPending,
  P03e: P03eAccepted, P03f: P03fRejected,
  P04:  P04Login,
  P05a: P05aForgotPhone, P05b: P05bForgotReset,

  // Core (15)
  P06a: P06aBrowseDefault, P06b: P06bBrowseFilters, P06c: P06cBrowseEmpty,
  P07a: P07aProfileWoman, P07b: P07bProfileMan,
  P08a: P08aMyProfile, P08b: P08bEditProfile,
  P09:  P09Requests,
  P10a: P10aChatActive, P10b: P10bChatFiltered, P10c: P10cChatEnded,
  P11a: P11aPayMethod, P11b: P11bPayCard, P11c: P11cPaySuccess, P11d: P11dPayFailed,
  P18: P18Wallet, P19: P19Subscription, P20: P20Notifications, P21: P21Agreement, P22: P22ProjectResult,
  P23: P23Pledges, P24: P24AccountFrozen, P25: P25IdUpload, P26: P26HelpGuide,
  P27: P27ProfileVisitors, P28: P28AutoSearch,
  A10: A10EditReview,

  // Admin (13)
  A01:  A01Dashboard, A02a: A02aMembersList, A02b: A02bMemberDetails,
  A03:  A03ChatMonitor, A04:  A04Payments, A05:  A05Reports,
  A06:  A06BannedWords, A07:  A07Settings, A08:  A08Content, A09: A09AuditLog,
  AM01: AM01BlockModal, AM02: AM02DeleteModal, AM03: AM03PermissionsModal,

  // Mobile (6)
  M01: M01Splash, M02: M02Onboarding1, M03: M03Onboarding2,
  M04: M04Onboarding3, M05: M05BottomNav, M06: M06PushNotif,

  // Mobile App (mobile versions of web screens)
  MP00: MP00HeroMobile,
  MP01: MP01HomeMobile, MP04: MP04LoginMobile, MP03a: MP03aRegisterMobile, MP03c: MP03cOtpMobile,
  MP06: MP06BrowseMobile, MP07: MP07ProfileMobile, MP08a: MP08aMyProfileMobile, MP09: MP09RequestsMobile,
  MP10: MP10ChatMobile, MP11: MP11PayMobile, MP18: MP18WalletMobile, MP19: MP19SubscriptionMobile,
  MP20: MP20NotifsMobile, MP22: MP22ResultMobile,
  MP05a: MP05aForgotPhoneMobile, MP05b: MP05bForgotResetMobile,
  MP03d: MP03dPendingMobile, MP03e: MP03eAcceptedMobile, MP03f: MP03fRejectedMobile,
  MP11c: MP11cPaySuccessMobile, MP11d: MP11dPayFailedMobile,
  MP21: MP21AgreementMobile, MP24: MP24FrozenMobile, MP27: MP27VisitorsMobile, MP28: MP28AutoSearchMobile,
  MP08b: MP08bEditMobile, MP25: MP25IdUploadMobile, MP06b: MP06bFiltersMobile, MP11b: MP11bPayCardMobile,
  MP30: MP30HomeMobile, MP31: MP31AccountMobile, MP32: MP32SettingsMobile,
  MP03b: MP03bManMobile, MP03bw: MP03bwWomanMobile,
  MP41: MP41EmptyRequestsMobile, MP42: MP42EmptyChatMobile, MP43: MP43EmptyNotifsMobile, MP44: MP44EmptyWalletMobile,
  MP45: MP45ReportModalMobile, MP46: MP46LogoutModalMobile, MP47: MP47RequestSentMobile,

  // System (4)
  S01: S01NotFound, S02: S02ServerError, S03: S03Maintenance, S04: S04ComingSoon,
};

export function renderScreen(screen: Screen) {
  const Custom = registry[screen.code];
  if (Custom) return <Custom screen={screen} />;
  return (
    <ScreenPlaceholder
      code={screen.code}
      title={screen.title}
      description={screen.description}
      kind={screen.kind}
    />
  );
}
