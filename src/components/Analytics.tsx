// Google Analytics 4. Set the measurement ID below (G-XXXXXXXXXX) and
// every page view, referrer, and navigation (including our pushState
// project routes, via GA4 enhanced measurement) gets tracked.
const GA_ID = ""; // <- paste the G-XXXXXXXXXX measurement ID here

export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
        }}
      />
    </>
  );
}
