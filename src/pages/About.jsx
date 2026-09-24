import { ArrowUpRight, Info, Mail } from 'lucide-react';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import CoverImage from '../components/CoverImage';

const teamMembers = [
  {
    name: 'Jane Aoro',
    role: 'Editor-in-Chief',
    bio: 'Guiding the newsroom and setting the editorial standard for independent reporting.',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQH-kPwI3s1tXw/profile-displayphoto-scale_400_400/B4DZwjwZKaJkAg-/0/1770126417208?e=1792022400&v=beta&t=xsRgRPqf9gezpubwRSR_rDKBg1NOA-ZCAdiyKtuoGz4',
  },
  {
    name: 'Peter Ochieng',
    role: 'Managing Editor',
    bio: 'Turning ambitious reporting ideas into clear, useful stories for our readers.',
    image: 'https://media.licdn.com/dms/image/v2/C4D03AQG_5DllvmK4Dg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1654428862204?e=1792022400&v=beta&t=698jA3XWn0Nv-EqVbUJWFagDbSw6zhwNJl6UCoBfz6Q',
  },
  {
    name: 'Agnes Akello',
    role: 'News Editor',
    bio: 'Leading our daily coverage with curiosity, care, and a strong local lens.',
    image: 'https://media.licdn.com/dms/image/v2/D5603AQF5r_IsIOdLSg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1684515053484?e=1792022400&v=beta&t=pLMCGQT0hDgKRqICmmnH7am8AZXioTtaxu5xzlxMMOE',
  },
  {
    name: 'Daniel Okello',
    role: 'Digital Editor',
    bio: 'Building thoughtful digital experiences around the journalism we publish.',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQEHP9-rgwaURA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1714045437950?e=1792022400&v=beta&t=pDCgFtD0rWrkpge_rAxKWhVU9UTFolOekU6Tx2QJRJw',
  },
  {
    name: 'Okello Obadiah',
    role: 'Chief Technology Officer',
    bio: 'Keeping our newsroom connected, resilient, and ready for what comes next.',
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQHmisCN9N5Trw/profile-displayphoto-shrink_400_400/B4EZwFu4V8GsAk-/0/1769622702806?e=1792022400&v=beta&t=8GR3gcj_8dnLa95oF8Im0MowZqLFrgBFEEYHKqCPnwk',
  },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com', Icon: ArrowUpRight },
  { label: 'Twitter', href: 'https://twitter.com', Icon: Info },
  { label: 'Instagram', href: 'https://www.instagram.com', Icon: Mail },
];

export default function About() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[450px] bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.14),_transparent_56%)]" />
        <div className="relative mx-auto max-w-[1500px] px-4 py-12 md:px-6 md:py-20">
          <div className="mx-auto grid max-w-5xl gap-6">
            <section className="glass-card rounded-[30px] border border-white/20 p-6 sm:p-8 md:p-12">
            <p className="eyebrow text-teal-700">About Us</p>
            <h1 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-none text-slate-950 md:text-7xl">
              Teso Post
            </h1>

            <div className="mt-10 grid gap-10 border-t border-slate-200/80 pt-10 md:grid-cols-[1fr_1.4fr]">
              <p className="font-display text-3xl leading-tight text-slate-950">
                Teso Post is the leading English-language digital news platform for Teso and the wider East African story, delivering trusted reporting to readers who want clarity, context, and credible journalism.
              </p>

              <div className="space-y-5 leading-8 text-slate-600">
                <p>
                  Founded with a passion for independent reporting, Teso Post serves communities with timely, fact-based journalism and a commitment to telling stories that matter. We cover politics, business, culture, development, and the daily realities shaping local life.
                </p>
                <p>
                  Our newsroom is built for readers who value nuance, accountability, and strong editorial standards. We believe journalism should inform, challenge, and connect communities across the political spectrum without sensationalism or shortcuts.
                </p>
              </div>
            </div>
            </section>

            <section className="glass-card rounded-[30px] border border-white/20 p-6 sm:p-8 md:p-12">
              <h2 className="font-display text-3xl font-bold text-slate-950">Our editorial mission</h2>
              <div className="mt-6 space-y-5 leading-8 text-slate-600">
                <p>
                Teso Post is dedicated to covering the people, ideas, and institutions shaping Teso and beyond. We report with honesty, rigor, and a deep respect for the communities we serve.
                </p>
                <p>
                From community stories to national affairs, our work is grounded in ethical reporting, strong local knowledge, and a belief that informed citizens are essential to a healthy society.
                </p>
              </div>
            </section>

            <section className="glass-card rounded-[30px] border border-white/20 p-6 sm:p-8 md:p-10">
              <div className="text-center">
                <p className="eyebrow text-teal-700">The people behind the reporting</p>
                <h2 className="mt-3 font-display text-4xl font-bold text-slate-950">Meet our team</h2>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member) => (
                  <article key={member.name} className="flex flex-col items-center rounded-2xl border border-slate-200/80 bg-white/60 px-5 py-6 text-center shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                    <CoverImage
                      src={member.image}
                      alt={member.name}
                      className="h-24 w-24 rounded-full object-cover ring-4 ring-teal-100/80"
                    />
                    <h3 className="mt-5 font-display text-2xl font-bold text-slate-950">{member.name}</h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-teal-700">{member.role}</p>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{member.bio}</p>
                    <div className="mt-5 flex items-center gap-2">
                      {socialLinks.map(({ label, href, Icon }) => (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${member.name} on ${label}`}
                          title={`${member.name} on ${label}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                        >
                          <Icon size={14} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="glass-card rounded-[30px] border border-white/20 p-6 sm:p-8 md:p-10">
              <h2 className="font-display text-3xl font-bold text-slate-950">Contact</h2>
              <ul className="mt-6 grid gap-3 border-t border-slate-200/80 pt-6 text-slate-600 sm:grid-cols-3">
                  <li>
                    <span className="font-semibold text-slate-900">Email:</span>{' '}
                    <a href="mailto:hello@tesopost.com" className="text-teal-700 hover:underline">
                      hello@tesopost.com
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">Phone:</span>{' '}
                    <a href="tel:+256743761718" className="text-teal-700 hover:underline">
                      +256743761718
                    </a>
                  </li>
                  <li>
                    <span className="font-semibold text-slate-900">Location:</span> Teso, Uganda
                  </li>
              </ul>
            </section>

            <section className="glass-card rounded-[30px] border border-white/20 p-6 text-sm leading-7 text-slate-500 sm:p-8">
              <p>
                All materials copyright 2024–2026 Teso Post. No part of this publication may be reproduced in any form without prior written permission and approval from the editorial team.
              </p>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}