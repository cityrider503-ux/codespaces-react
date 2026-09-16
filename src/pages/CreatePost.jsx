import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

function makeSlug(title) {
  return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function getStoragePath(publicUrl) {
  const marker = '/storage/v1/object/public/post-images/';
  const markerIndex = publicUrl?.indexOf(marker);
  return markerIndex === undefined || markerIndex === -1
    ? null
    : decodeURIComponent(publicUrl.slice(markerIndex + marker.length));
}

const emptyForm = { title: '', slug: '', excerpt: '', content: '', image_url: '', published: true };

export default function CreatePost() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function fetchPost() {
      try {
        const { data, error } = await supabase.from('posts').select('title, slug, excerpt, content, image_url, published').eq('id', id).eq('author_id', user.id).single();
        if (error) throw error;
        setForm(data);
      } catch (error) {
        toast.error(error.message || 'Unable to load this article.');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id, user.id, navigate]);

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value, ...(name === 'title' && !id ? { slug: makeSlug(value) } : {}) }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error('Title and content are required.');
      return;
    }
    setSaving(true);
    let uploadedPath = null;
    const previousImagePath = getStoragePath(form.image_url);
    try {
      let imageUrl = form.image_url;
      if (file) {
        if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
          throw new Error('Choose an image smaller than 5 MB.');
        }
        const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
        const path = `${user.id}/${crypto.randomUUID()}-${safeName}`;
        const { error: uploadError } = await supabase.storage.from('post-images').upload(path, file, { upsert: false, contentType: file.type });
        if (uploadError) throw uploadError;
        uploadedPath = path;
        const { data } = supabase.storage.from('post-images').getPublicUrl(path);
        imageUrl = data.publicUrl;
      }
      const payload = { ...form, title: form.title.trim(), slug: makeSlug(form.slug || form.title), image_url: imageUrl || null, author_id: user.id };
      const request = id ? supabase.from('posts').update(payload).eq('id', id).eq('author_id', user.id).select().single() : supabase.from('posts').insert(payload).select().single();
      const { error } = await request;
      if (error) throw error;
      if (uploadedPath && previousImagePath && previousImagePath !== uploadedPath) {
        await supabase.storage.from('post-images').remove([previousImagePath]);
      }
      toast.success(id ? 'Article updated.' : 'Article published.');
      navigate('/dashboard');
    } catch (error) {
      if (uploadedPath) await supabase.storage.from('post-images').remove([uploadedPath]);
      toast.error(error.message || 'Unable to save the article.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <><SiteHeader /><main className="relative overflow-hidden pb-20"><div className="mx-auto max-w-4xl rounded-[30px] border border-white/20 bg-white/50 p-6"><p className="text-slate-500">Loading article...</p></div></main></>;

  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[350px] bg-[radial-gradient(circle_at_top,_rgba(20,184,166,0.12),_transparent_60%)]" />
        <div className="relative mx-auto max-w-[1500px] px-4 py-12 md:px-6 md:py-16">
          <div className="glass-panel mx-auto max-w-4xl rounded-[30px] border border-white/20 p-6 sm:p-8 md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-700">Editorial desk</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">{id ? 'Edit article' : 'Create an article'}</h1>

            <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block font-semibold text-slate-700">Title</span>
                <input className="w-full rounded-2xl border border-slate-300 bg-white/80 px-4 py-3 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-200" name="title" value={form.title} onChange={updateField} required />
              </label>
              <label className="block">
                <span className="mb-2 block font-semibold text-slate-700">Slug</span>
                <input className="w-full rounded-2xl border border-slate-300 bg-white/80 px-4 py-3 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-200" name="slug" value={form.slug} onChange={updateField} required />
              </label>
              <label className="block">
                <span className="mb-2 block font-semibold text-slate-700">Excerpt</span>
                <textarea className="w-full rounded-2xl border border-slate-300 bg-white/80 px-4 py-3 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-200" name="excerpt" rows="3" value={form.excerpt || ''} onChange={updateField} />
              </label>
              <label className="block">
                <span className="mb-2 block font-semibold text-slate-700">Article content</span>
                <textarea className="w-full rounded-2xl border border-slate-300 bg-white/80 px-4 py-3 outline-none transition focus:border-teal-700 focus:ring-2 focus:ring-teal-200" name="content" rows="16" value={form.content} onChange={updateField} required />
              </label>
              <label className="block">
                <span className="mb-2 block font-semibold text-slate-700">Cover image</span>
                <input className="w-full rounded-2xl border border-slate-300 bg-white/80 px-4 py-3" type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] || null)} />
              </label>
              <label className="flex items-center gap-3 text-slate-700">
                <input type="checkbox" name="published" checked={form.published} onChange={updateField} />
                <span className="font-semibold">Publish immediately</span>
              </label>
              <button className="rounded-full bg-slate-950 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50" type="submit" disabled={saving}>
                {saving ? 'Saving...' : id ? 'Update article' : 'Publish article'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
