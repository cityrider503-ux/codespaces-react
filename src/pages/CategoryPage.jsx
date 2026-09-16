import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CoverImage from '../components/CoverImage';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import { supabase } from '../lib/supabase';

function formatDate(value) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(value));
}

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryPage() {
      try {
        const { data: categoryData, error: categoryError } = await supabase
          .from('categories')
          .select('id, name, slug')
          .eq('slug', slug)
          .maybeSingle();

        if (categoryError) throw categoryError;
        if (!categoryData) {
          setCategory(null);
          setPosts([]);
          return;
        }

        setCategory(categoryData);

        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select('id, title, slug, excerpt, content, image_url, created_at, category_id')
          .eq('published', true)
          .eq('category_id', categoryData.id)
          .order('created_at', { ascending: false });

        if (postError) throw postError;
        setPosts(postData || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryPage();
  }, [slug]);

  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.12),_transparent_60%)]" />
        <div className="relative mx-auto max-w-[1500px] px-4 py-12 md:px-6 md:py-16">
          <div className="glass-panel mx-auto max-w-6xl rounded-[30px] border border-white/20 p-6 sm:p-8 md:p-10">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-teal-700">
              <ArrowLeft size={16} /> Back to home
            </Link>

            {loading ? (
              <p className="mt-8 text-slate-500">Loading stories...</p>
            ) : category ? (
              <>
                <div className="mt-8 flex items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
                  <div>
                    <p className="eyebrow text-teal-700">Topics</p>
                    <h1 className="mt-3 font-display text-5xl font-bold text-slate-950 md:text-6xl">{category.name}</h1>
                  </div>
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    {posts.length} {posts.length === 1 ? 'story' : 'stories'}
                  </span>
                </div>

                {posts.length ? (
                  <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {posts.map((post) => (
                      <article key={post.id} className="group">
                        <Link to={`/post/${post.slug}`} className="block">
                          <div className="glass-card overflow-hidden rounded-[22px] border border-white/20 p-2">
                            <CoverImage src={post.image_url} alt={post.title} className="image-zoom aspect-[4/3] w-full rounded-[16px] object-cover" />
                          </div>
                          <p className="mt-5 text-sm text-slate-500">{formatDate(post.created_at)}</p>
                          <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-slate-950 group-hover:text-teal-700">
                            {post.title}
                          </h2>
                          <p className="mt-3 line-clamp-3 text-slate-600">{post.excerpt || post.content.slice(0, 140)}</p>
                        </Link>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="mt-10 rounded-[24px] border border-dashed border-slate-300 bg-white/30 p-10 text-center text-slate-600">
                    No stories have been published in this category yet.
                  </div>
                )}
              </>
            ) : (
              <div className="mt-8 rounded-[24px] border border-dashed border-slate-300 bg-white/30 p-10 text-center text-slate-600">
                This category could not be found.
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
