// Zoom controls retired: the canvas itself zooms naturally (pinch or
// Cmd/Ctrl + scroll in FigmaCanvas). Kept as a passthrough so frame
// call sites stay unchanged.
export default function ZoomFrame({
  children,
}: {
  children: React.ReactNode;
  label?: string;
  scale?: number;
}) {
  return <div className="relative">{children}</div>;
}
