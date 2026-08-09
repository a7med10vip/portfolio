import SystemShell from "./_components/SystemShell";
import BrandSection from "./_sections/Brand";
import ColorsSection from "./_sections/Colors";
import TypographySection from "./_sections/Typography";
import SpacingSection from "./_sections/Spacing";
import RadiusSection from "./_sections/Radius";
import ShadowsSection from "./_sections/Shadows";
import ButtonsSection from "./_sections/Buttons";
import InputsSection from "./_sections/Inputs";
import CardsSection from "./_sections/Cards";
import BadgesSection from "./_sections/Badges";
import NavigationSection from "./_sections/Navigation";
import FeedbackSection from "./_sections/Feedback";
import IconsSection from "./_sections/Icons";
import ChatSection from "./_sections/Chat";
import DataTableSection from "./_sections/DataTable";
import FormAdvancedSection from "./_sections/FormAdvanced";
import OverlaysSection from "./_sections/Overlays";
import AvatarsSection from "./_sections/Avatars";
import PaymentSection from "./_sections/Payment";
import ChatExtrasSection from "./_sections/ChatExtras";
import ChartsSection from "./_sections/Charts";
import SaudiCulturalSection from "./_sections/SaudiCultural";
import MatchingSection from "./_sections/Matching";
import FormsSmartSection from "./_sections/FormsSmart";
import NotificationsActivitySection from "./_sections/NotificationsActivity";
import GuidelinesSection from "./_sections/Guidelines";

export default function KhattabaDesignSystemPage() {
  return (
    <SystemShell>
      {/* Foundations */}
      <BrandSection />
      <ColorsSection />
      <TypographySection />
      <SpacingSection />
      <RadiusSection />
      <ShadowsSection />

      {/* Components */}
      <ButtonsSection />
      <InputsSection />
      <CardsSection />
      <BadgesSection />
      <NavigationSection />
      <FeedbackSection />
      <IconsSection />
      <ChatSection />

      {/* Advanced */}
      <DataTableSection />
      <FormAdvancedSection />
      <OverlaysSection />
      <AvatarsSection />
      <PaymentSection />

      {/* Specialized */}
      <ChatExtrasSection />
      <ChartsSection />
      <SaudiCulturalSection />
      <MatchingSection />
      <FormsSmartSection />
      <NotificationsActivitySection />

      {/* Reference */}
      <GuidelinesSection />
    </SystemShell>
  );
}
