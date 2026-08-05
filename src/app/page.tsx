import Header from "@/components/Header";
import IntroColumn from "@/components/IntroColumn";
import PerspectivePanel from "@/components/perspective/PerspectivePanel";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col lg:h-dvh lg:overflow-hidden">
      <Header />
      <main className="grid flex-1 gap-10 px-8 pb-7 pt-2 lg:min-h-0 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:px-12">
        <IntroColumn />
        <PerspectivePanel />
      </main>
    </div>
  );
}
