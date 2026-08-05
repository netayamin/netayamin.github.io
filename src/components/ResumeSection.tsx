export default function ResumeSection() {
  return (
    <section id="resume" className="border-t border-neutral-200 px-6 py-20 md:px-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-neutral-900">Resume</h2>
        </div>

        <a
          href="#"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900"
        >
          View resume
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
