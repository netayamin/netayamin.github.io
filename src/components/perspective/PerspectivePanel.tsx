"use client";

import DesignerMode from "./DesignerMode";
import DeveloperMode from "./DeveloperMode";
import SnagrDesigner from "./SnagrDesigner";
import SnagrDeveloper from "./SnagrDeveloper";
import { usePage } from "@/context/PageContext";

// The stage: a static half/half split — text lens (Xcode/MD) on the left,
// design lens (Figma canvas) on the right. Both layers span the full stage
// and scroll together; the Figma layer is clipped to the right half.
export default function PerspectivePanel() {
  const { page } = usePage();

  const [Designer, Developer] =
    page === "snagr"
      ? [SnagrDesigner, SnagrDeveloper]
      : [DesignerMode, DeveloperMode];

  return (
    <div className="relative h-full min-w-0 flex-1 overflow-hidden">
      <div className="absolute inset-0 overflow-x-hidden overflow-y-auto">
        <div className="relative min-h-full">
          <Developer />
          <div className="absolute inset-0" style={{ clipPath: "inset(0 0 0 50%)" }}>
            <Designer />
          </div>
        </div>
      </div>
    </div>
  );
}
