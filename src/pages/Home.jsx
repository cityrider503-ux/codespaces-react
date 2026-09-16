import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error: queryError } = await supabase
          .from('posts')
          .select('id, title, slug, excerpt, content, image_url, created_at, author_id, profiles(full_name)')
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
    fetchPosts();
  }, []);

  const featured = posts[0];

  return (
    <>
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-20 md:pt-28">
          <div className="max-w-3xl animate-rise-in">
            <p className="eyebrow text-teal-700">Independent reporting <span className="ml-3 text-slate-400">/</span> Teso, Kenya</p>
            <h1 className="font-display mt-5 text-5xl font-bold leading-[0.95] tracking-tight text-slate-950 md:text-8xl">Stories with a <em className="text-teal-700">point of view.</em></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">A sharper look at the people, places, and decisions shaping life around us.</p>
          </div>
          <div className="mt-12 flex items-center gap-4 border-y border-slate-200 py-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500"><span className="inline-block h-2 w-2 rounded-full bg-amber-400" /> The latest from the desk <span className="ml-auto hidden text-slate-400 sm:inline">Read slowly. Think deeply.</span></div>
        </section>
        <section className="mx-auto max-w-6xl px-6 pb-8">
        {error ? <p className="border border-red-200 bg-red-50 p-4 text-red-700">{error}</p> : null}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2"><ArticleSkeleton /><ArticleSkeleton /></div>
        ) : !error && !featured ? (
          <p className="border border-dashed border-slate-300 p-12 text-center text-slate-600">No published articles yet.</p>
        ) : (
          <>
            <Link to={`/post/${featured.slug}`} className="group grid gap-8 border-y border-slate-200 py-8 md:grid-cols-[1.3fr_1fr]">
              <CoverImage src={featured.image_url} alt={featured.title} className="image-zoom aspect-[16/10] w-full object-cover" />
              <div className="flex flex-col justify-center">
                <p className="mb-4 text-sm text-slate-500">{formatDate(featured.created_at)}</p>
                <h2 className="font-display text-4xl font-bold leading-tight text-slate-950 md:text-5xl">{featured.title}</h2>
                <p className="mt-5 text-lg leading-8 text-slate-600">{featured.excerpt || featured.content.slice(0, 180)}</p>
                <span className="mt-8 inline-flex items-center gap-2 font-bold text-teal-700">Read featured story <ArrowRight size={18} /></span>
              </div>
            </Link>
            <section className="grid gap-x-8 gap-y-12 py-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.slice(1).map((post, index) => (
                <article className="animate-rise-in" style={{ animationDelay: `${index * 90}ms` }} key={post.id}>
                  <Link to={`/post/${post.slug}`} className="group">
                    <CoverImage src={post.image_url} alt={post.title} className="image-zoom aspect-[4/3] w-full object-cover" />
                    <p className="mt-5 text-sm text-slate-500">{formatDate(post.created_at)}</p>
                    <h2 className="font-display mt-2 text-2xl font-bold leading-tight text-slate-950">{post.title}</h2>
                    <p className="mt-3 line-clamp-3 text-slate-600">{post.excerpt || post.content.slice(0, 140)}</p>
                  </Link>
                </article>
              ))}
            </section>
          </>
        )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
