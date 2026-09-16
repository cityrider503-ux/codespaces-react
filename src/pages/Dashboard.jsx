import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FilePlus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

function getStoragePath(publicUrl) {
  const marker = '/storage/v1/object/public/post-images/';
  const markerIndex = publicUrl?.indexOf(marker);
  return markerIndex === undefined || markerIndex === -1
    ? null
    : decodeURIComponent(publicUrl.slice(markerIndex + marker.length));
}

export default function Dashboard() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchPosts() {
    try {
      const { data, error } = await supabase.from('posts').select('id, title, slug, published, created_at, image_url').eq('author_id', user.id).order('created_at', { ascending: false });
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      toast.error(error.message || 'Unable to load your articles.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchPosts(); }, [user.id]);

  async function deletePost(id) {
    if (!window.confirm('Delete this article permanently?')) return;
    try {
      const { error } = await supabase.from('posts').delete().eq('id', id).eq('author_id', user.id);
      if (error) throw error;
      const post = posts.find((currentPost) => currentPost.id === id);
      const imagePath = getStoragePath(post?.image_url);
      if (imagePath) await supabase.storage.from('post-images').remove([imagePath]);
      setPosts((current) => current.filter((post) => post.id !== id));
      toast.success('Article deleted.');
    } catch (error) {
      toast.error(error.message || 'Unable to delete the article.');
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.12),_transparent_56%)]" />
        <div className="relative mx-auto max-w-[1500px] px-4 py-12 md:px-6 md:py-16">
          <div className="glass-panel rounded-[30px] border border-white/20 p-6 sm:p-8 md:p-10">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">Author workspace</p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">Your articles</h1>
              </div>
              <Link className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800" to="/create-post">
                <FilePlus size={18} /> New article
              </Link>
            </div>

            {loading ? (
              <p className="text-slate-500">Loading your articles...</p>
            ) : posts.length === 0 ? (
              <p className="border border-dashed border-slate-300 p-12 text-center text-slate-600">You have not written an article yet.</p>
            ) : (
              <div className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/60">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50/80 text-slate-500">
                      <tr>
                        <th className="px-5 py-4 font-semibold">Title</th>
                        <th className="px-5 py-4 font-semibold">Status</th>
                        <th className="px-5 py-4 font-semibold">Created</th>
                        <th className="px-5 py-4 text-right font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post) => (
                        <tr className="border-b border-slate-100 last:border-0" key={post.id}>
                          <td className="px-5 py-4 font-semibold text-slate-900">{post.title}</td>
                          <td className="px-5 py-4 text-slate-600">{post.published ? 'Published' : 'Draft'}</td>
                          <td className="px-5 py-4 text-slate-600">{new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(post.created_at))}</td>
                          <td className="px-5 py-4">
                            <div className="flex justify-end gap-4">
                              <Link aria-label={`Edit ${post.title}`} title="Edit article" to={`/create-post/${post.id}`}><Pencil size={18} /></Link>
                              <button aria-label={`Delete ${post.title}`} title="Delete article" type="button" onClick={() => deletePost(post.id)}><Trash2 size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
