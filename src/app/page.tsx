import Header from "@/components/Header";
import FigmaSidebar from "@/components/FigmaSidebar";
import MobileGate from "@/components/MobileGate";
import PerspectivePanel from "@/components/perspective/PerspectivePanel";
import { PageProvider } from "@/context/PageContext";

export default function Home() {
  return (
    <PageProvider>
      <MobileGate />
      <div className="hidden h-dvh flex-col overflow-hidden lg:flex">
        <Header />
        <div className="flex min-h-0 flex-1">
          <FigmaSidebar />
          <PerspectivePanel />
        </div>
      </div>
    </PageProvider>
  );
}
