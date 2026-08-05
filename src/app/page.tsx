import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutMeSection from "@/components/AboutMeSection";
import ProjectsSection from "@/components/ProjectsSection";
import ResumeSection from "@/components/ResumeSection";
import BottomBar from "@/components/BottomBar";
import MazalCompanion from "@/components/MazalCompanion";
import { MazalProvider } from "@/context/MazalContext";

export default function Home() {
  return (
    <MazalProvider>
      <div
        id="page-root"
        className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col rounded-3xl bg-white"
      >
        <div id="top" className="flex min-h-screen flex-col">
          <Header />
          <Hero />
        </div>
        <AboutMeSection />
        <ProjectsSection />
        <ResumeSection />
        <BottomBar />
        <MazalCompanion />
      </div>
    </MazalProvider>
  );
}
