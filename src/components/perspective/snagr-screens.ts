// Real Snagr screens on the Figma board. Drop simulator screenshots into
// public/snagr/screens/ and register them here: they render in device
// frames, draggable and zoomable, anchored beside their case-study
// section (anchor = slug of an "## " heading in the case study).
export type SnagrScreen = {
  file: string; // filename inside public/snagr/screens/
  title: string; // Figma frame label
  caption?: string;
  anchor: string; // data-md-anchor slug to sit beside
  offset?: number;
};

export const SNAGR_SCREENS: SnagrScreen[] = [
  {
    file: "home.png",
    title: "Home · Plans",
    caption:
      "The real home screen: two plans quietly watching (15 and 26 tables live), and editorial collections ready to become the next plan.",
    anchor: "the-journey-with-snagr",
    offset: 130,
  },
];
