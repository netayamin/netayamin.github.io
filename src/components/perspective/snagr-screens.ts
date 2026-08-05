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
  // Example (uncomment when the file exists):
  // {
  //   file: "plan-paris.png",
  //   title: "Plan · Paris Trip",
  //   caption: "One ask, hundreds of live openings, one readable answer.",
  //   anchor: "breaking-the-one-reservation-model",
  //   offset: 60,
  // },
];
