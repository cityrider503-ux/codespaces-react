import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import CoverImage from '../components/CoverImage';
import SiteHeader from '../components/SiteHeader';
import { supabase } from '../lib/supabase';

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error: queryError } = await supabase
          .from('posts')
          .select('*, profiles(full_name, avatar_url)')
          .eq('slug', slug)
          .eq('published', true)
          .maybeSingle();
        if (queryError) throw queryError;
        if (!data) throw new Error('This article could not be found.');
        setPost(data);
      } catch (queryError) {
        setError(queryError.message || 'Unable to load this article.');
        toast.error(queryError.message || 'Unable to load this article.');
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 py-12">
        {loading ? <div className="animate-pulse space-y-6"><div className="h-12 w-3/4 bg-slate-200" /><div className="h-96 bg-slate-200" /></div> : null}
        {error ? <div className="border border-red-200 bg-red-50 p-6 text-red-700"><p>{error}</p><Link className="mt-4 inline-block font-semibold underline" to="/">Back to the home page</Link></div> : null}
        {post ? (
          <article>
            <header className="mb-10">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-teal-700">Teso Post</p>
              <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-slate-950 md:text-6xl">{post.title}</h1>
              <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-600">{post.excerpt}</p>
              <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
                <span>{post.profiles?.full_name || 'Teso Post Editorial'}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.created_at}>{new Intl.DateTimeFormat('en', { dateStyle: 'long' }).format(new Date(post.created_at))}</time>
              </div>
            </header>
            <CoverImage src={post.image_url} alt={post.title} className="mb-10 aspect-[16/8] w-full object-cover" />
            <div className="prose prose-lg max-w-none prose-headings:text-slate-950 prose-a:text-teal-700">
              {post.content.split(/\n+/).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
        ) : null}
      </main>
    </>
  );
}
