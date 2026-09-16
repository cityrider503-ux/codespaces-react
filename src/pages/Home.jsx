import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import CoverImage from '../components/CoverImage';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { supabase } from '../lib/supabase';

function ArticleSkeleton() {
  return <div className="animate-pulse space-y-4"><div className="h-52 bg-slate-200" /><div className="h-6 w-3/4 bg-slate-200" /><div className="h-4 w-full bg-slate-200" /></div>;
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value));
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSlide, setActiveSlide] = useState(0);
  const [heroWordIndex, setHeroWordIndex] = useState(0);

  const rotatingWords = ['point', 'context', 'clarity', 'truth', 'voice'];

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error: queryError } = await supabase
          .from('posts')
          .select('id, title, slug, excerpt, content, image_url, created_at, author_id, profiles(full_name), category_id, categories(name, slug)')
          .eq('published', true)
          .order('created_at', { ascending: false });
        if (queryError) throw queryError;
        setPosts(data || []);
      } catch (queryError) {
        setError(queryError.message || 'Unable to load articles.');
        toast.error(queryError.message || 'Unable to load articles.');
      } finally {
        setLoading(false);
      }
    }

    async function fetchCategories() {
      try {
        const { data, error: queryError } = await supabase
          .from('categories')
          .select('id, name, slug')
          .order('name', { ascending: true });
        if (queryError) throw queryError;
        setCategories(data || []);
      } catch (queryError) {
        console.error(queryError);
      }
    }

    fetchPosts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setHeroWordIndex((current) => {
        let next = current;
        while (next === current) {
          next = Math.floor(Math.random() * rotatingWords.length);
        }
        return next;
      });
    }, 2800);

    return () => window.clearInterval(intervalId);
  }, [rotatingWords.length]);

  useEffect(() => {
    if (posts.length < 2) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % Math.min(posts.length, 4));
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [posts.length]);

  const heroPosts = posts.slice(0, Math.min(posts.length, 4));
  const activeHero = heroPosts[activeSlide] ?? posts[0];
  const leftSidebarPosts = posts.slice(0, 3);
  const rightSidebarPosts = posts.slice(1, 5);
  const topicPills = categories.length
    ? categories.map((category) => ({ ...category, label: category.name }))
    : [
        { id: 'politics', slug: 'politics', name: 'Politics' },
        { id: 'education', slug: 'education', name: 'Education' },
        { id: 'culture', slug: 'culture', name: 'Culture' },
        { id: 'business', slug: 'business', name: 'Business' },
        { id: 'environment', slug: 'environment', name: 'Environment' },
        { id: 'community', slug: 'community', name: 'Community' },
      ];
  const tickerPosts = posts.length ? [...posts, ...posts].slice(0, 14) : [];

  const goToSlide = (index) => setActiveSlide(index);
  const moveSlide = (direction) => {
    if (!heroPosts.length) return;
    setActiveSlide((current) => {
      const total = heroPosts.length;
      return direction === 'next' ? (current + 1) % total : (current - 1 + total) % total;
    });
  };

  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.18),_transparent_52%)]" />

        <section className="relative mx-auto max-w-[1500px] px-4 pb-10 pt-12 md:px-6 md:pt-16">
          <div className="masthead-shell">
            <div className="max-w-3xl animate-rise-in">
              <p className="eyebrow text-teal-700">Independent reporting <span className="ml-3 text-slate-400">/</span> Teso; Uganda, kenya, South Sudan, Ethiopia</p>
              <h1 className="mt-5 font-display text-5xl font-bold leading-[0.95] tracking-tight text-slate-950 md:text-7xl xl:text-[5.5rem]">
                Stories with a {' '}
                <span key={heroWordIndex} className="hero-word text-teal-700">{rotatingWords[heroWordIndex]}</span>
                <br />
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">A sharper look at the people, places, and decisions shaping life around us.</p>
            </div>
          </div>

          <div className="news-ticker mt-10">
            <div className="news-ticker__label">The latest from the desk</div>
            <div className="news-ticker__viewport" aria-live="polite">
              <div className="news-ticker__track">
                {tickerPosts.map((post, index) => (
                  <div className="news-ticker__item" key={`${post.id}-${index}`}>
                    <span className="news-ticker__dot" aria-hidden="true" />
                    <span>{post.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="news-ticker__tagline">Read slowly. Think deeply.</div>
          </div>
        </section>

        <section className="relative mx-auto max-w-[1500px] px-4 pb-8 md:px-6">
          {error ? <p className="mb-8 border border-red-200 bg-red-50 p-4 text-red-700">{error}</p> : null}

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2"><ArticleSkeleton /><ArticleSkeleton /></div>
          ) : !error && !activeHero ? (
            <p className="border border-dashed border-slate-300 p-12 text-center text-slate-600">No published articles yet.</p>
          ) : (
            <div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)_300px] xl:items-stretch">
              <aside className="flex h-full flex-col gap-6">
                <div className="topics-panel glass-card h-full rounded-[28px] border border-white/20 p-4 sm:p-5">
                  <p className="eyebrow text-teal-700">Topics</p>
                  <div className="mt-4 flex flex-col gap-3">
                    {topicPills.map((topic) => (
                      <Link key={topic.slug} to={`/category/${topic.slug}`} className="topic-link">
                        {topic.name.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="glass-card h-full rounded-[24px] border border-white/20 p-4">
                  <p className="eyebrow text-teal-700">Most read</p>
                  <div className="mt-4 space-y-4">
                    {leftSidebarPosts.map((post, index) => (
                      <Link key={post.id} to={`/post/${post.slug}`} className="group block border-b border-slate-200/80 pb-3 last:border-b-0 last:pb-0">
                        <div className="flex items-start gap-3">
                          <span className="mt-1 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">0{index + 1}</span>
                          <div>
                            <h4 className="text-sm font-semibold leading-6 text-slate-800 group-hover:text-teal-700">{post.title}</h4>
                            <p className="mt-1 text-xs text-slate-500">{formatDate(post.created_at)}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>

              <div className="glass-panel h-full overflow-hidden rounded-[30px] border border-white/40 px-4 py-4 sm:px-5 md:px-6 md:py-6">
                <div className="relative overflow-hidden rounded-[24px] border border-white/20 bg-slate-900">
                  <CoverImage src={activeHero.image_url} alt={activeHero.title} className="hero-image h-[420px] w-full object-cover md:h-[520px]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/20 to-transparent" />

                  <div key={activeHero.id} className="hero-copy absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <p className="eyebrow text-white/80">Latest dispatch</p>
                    <h2 className="mt-3 max-w-xl font-display text-3xl font-bold leading-[1.02] text-white md:text-5xl">{activeHero.title}</h2>
                    <p className="mt-4 max-w-xl text-base leading-7 text-slate-100/80 md:text-lg">{activeHero.excerpt || activeHero.content.slice(0, 180)}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <Link to={`/post/${activeHero.slug}`} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-teal-100">
                        Read feature
                        <ArrowRight size={16} />
                      </Link>
                      <span className="text-sm font-medium text-slate-100/80">{formatDate(activeHero.created_at)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-200/80 pt-4">
                  <div>
                    <p className="eyebrow text-teal-700">Fresh from the desk</p>
                    <span className="text-sm font-semibold text-slate-600">{activeSlide + 1} / {heroPosts.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => moveSlide('prev')} className="glass-icon" aria-label="Previous story">
                      <ChevronLeft size={16} />
                    </button>
                    <button type="button" onClick={() => moveSlide('next')} className="glass-icon" aria-label="Next story">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {heroPosts.map((post, index) => (
                    <button
                      key={post.id}
                      type="button"
                      onClick={() => goToSlide(index)}
                      className={`flex h-full flex-col justify-between rounded-[20px] border p-4 text-left transition-all duration-300 ${
                        index === activeSlide
                          ? 'border-teal-400 bg-white/70 shadow-[0_16px_40px_rgba(20,184,166,0.12)]'
                          : 'border-white/10 bg-slate-900/10 hover:border-white/25 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                        <span>{formatDate(post.created_at)}</span>
                        <span className="inline-flex h-2 w-2 rounded-full bg-teal-500" aria-hidden="true" />
                      </div>
                      <p className={`mt-2 text-base font-semibold leading-6 ${index === activeSlide ? 'text-slate-900' : 'text-slate-700'}`}>
                        {post.title}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <aside className="flex h-full flex-col gap-6">
                <div className="glass-card h-full rounded-[24px] border border-white/20 p-4">
                  <p className="eyebrow text-teal-700">Editor’s note</p>
                  <p className="mt-4 text-sm leading-7 text-slate-700">
                    We report with context, not hype—tracking how local stories move across the lives of families, markets, and institutions.
                  </p>
                </div>

                <div className="glass-card h-full rounded-[24px] border border-white/20 p-4">
                  <p className="eyebrow text-teal-700">Trending now</p>
                  <div className="mt-4 space-y-4">
                    {rightSidebarPosts.map((post) => (
                      <Link key={post.id} to={`/post/${post.slug}`} className="group block rounded-2xl border border-slate-200/80 bg-white/30 p-3 transition hover:border-teal-200 hover:bg-white/60">
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">{formatDate(post.created_at)}</p>
                        <h4 className="mt-2 text-sm font-semibold leading-6 text-slate-800 group-hover:text-teal-700">{post.title}</h4>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="glass-card h-full rounded-[24px] border border-white/20 p-4">
                  <p className="eyebrow text-teal-700">Newsletter</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">Get the briefing before the morning heat rises.</p>
                  <button type="button" className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Join the list
                  </button>
                </div>
              </aside>
            </div>
          )}

          <section className="pt-12">
            <div className="editorial-rule mb-8 flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow text-teal-700">More reporting</p>
                <h3 className="mt-2 font-display text-3xl text-slate-950 md:text-4xl">Latest stories</h3>
              </div>
            </div>

            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(1).map((post, index) => (
                <article className="story-card animate-rise-in" style={{ animationDelay: `${index * 90}ms` }} key={post.id}>
                  <Link to={`/post/${post.slug}`} className="group block">
                    <div className="glass-card overflow-hidden rounded-[22px] border border-white/20 p-2">
                      <CoverImage src={post.image_url} alt={post.title} className="image-zoom aspect-[4/3] w-full rounded-[16px] object-cover" />
                    </div>
                    <p className="mt-5 text-sm text-slate-500">{formatDate(post.created_at)}</p>
                    <h2 className="font-display mt-2 text-2xl font-bold leading-tight text-slate-950">{post.title}</h2>
                    <p className="mt-3 line-clamp-3 text-slate-600">{post.excerpt || post.content.slice(0, 140)}</p>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
