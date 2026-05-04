import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { RealResults } from "@/components/sections/RealResults";
import { TheLeak } from "@/components/sections/TheLeak";
import { MeetTheTeam } from "@/components/sections/MeetTheTeam";
import { WhyAiauraWins } from "@/components/sections/WhyAiauraWins";
import { HowYouGoLive } from "@/components/sections/HowYouGoLive";
import { Integrations } from "@/components/sections/Integrations";
import { QuestionsYouCanNotAnswer } from "@/components/sections/QuestionsYouCanNotAnswer";
import { TrackEverywhere } from "@/components/sections/TrackEverywhere";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <RealResults />
      <TheLeak />
      <MeetTheTeam />
      <WhyAiauraWins />
      <HowYouGoLive />
      <Integrations />
      <QuestionsYouCanNotAnswer />
      <TrackEverywhere />
      <Footer />
    </main>
  );
}










