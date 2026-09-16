import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

export default function About() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[450px] bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.14),_transparent_56%)]" />
        <div className="relative mx-auto max-w-[1500px] px-4 py-12 md:px-6 md:py-20">
          <div className="glass-panel mx-auto max-w-5xl rounded-[30px] border border-white/20 p-6 sm:p-8 md:p-12">
            <p className="eyebrow text-teal-700">Our newsroom</p>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-none text-slate-950 md:text-7xl">Curious about where we live.</h1>
            <div className="mt-14 grid gap-10 border-t border-slate-200/80 pt-10 md:grid-cols-[1fr_1.4fr]">
              <p className="font-display text-3xl leading-tight text-slate-950">
                Teso Post is an independent publication for people who want more context, not more noise.
              </p>
              <div className="space-y-5 leading-8 text-slate-600">
                <p>
                  We report on the communities, choices, and ideas shaping Teso and beyond. Our work starts with listening closely and asking better questions.
                </p>
                <p>
                  We believe local stories deserve ambition: clear writing, careful facts, and room for nuance. No shouting. No shortcuts. Just journalism with a point of view.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}