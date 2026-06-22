import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchBlogBySlug } from "../services/api.js";
import { Calendar, User, ArrowLeft, BookOpen, Share2 } from "lucide-react";

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await fetchBlogBySlug(slug);
        setBlog(data);
      } catch (err) {
        setError("Blog not found or has been removed.");
      } finally {
        setLoading(false);
      }
    };
    loadBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0503] flex items-center justify-center pt-20">
        <div className="w-12 h-12 border-4 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#0a0503] flex flex-col items-center justify-center pt-20 px-6 text-center">
        <BookOpen size={48} className="text-[#d4af37]/30 mb-6" />
        <h2 className="text-3xl font-black text-white mb-4">Blog Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md">{error || "The article you are looking for does not exist."}</p>
        <Link to="/blogs" className="px-6 py-3 bg-white/5 border border-white/10 rounded-full font-bold text-white hover:bg-white/10 transition flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0503] text-white pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto animate-fade-in-up">
        {/* Breadcrumb */}
        <Link to="/blogs" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#d4af37] transition font-semibold text-sm mb-8 uppercase tracking-widest">
          <ArrowLeft size={16} /> All Articles
        </Link>

        {/* Header */}
        <header className="mb-10 text-center">
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {blog.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e9d781] via-[#fee19a] to-[#dac24a] mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-gray-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <User size={16} className="text-[#d4af37]" />
              <span className="text-white">{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#d4af37]" />
              {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </div>
            <button 
              onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Link copied!"); }}
              className="flex items-center gap-2 hover:text-[#d4af37] transition ml-auto md:ml-0"
            >
              <Share2 size={16} /> Share
            </button>
          </div>
        </header>

        {/* Featured Image */}
        {blog.image && (
          <div className="w-full aspect-[21/9] md:aspect-[2.5/1] rounded-3xl overflow-hidden mb-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Content */}
        <div 
          className="prose prose-invert prose-lg max-w-none prose-headings:text-[#f3e5ab] prose-headings:font-black prose-a:text-[#d4af37] hover:prose-a:text-[#f3e5ab] prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        
        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white transition font-bold text-sm uppercase tracking-widest">
            <ArrowLeft size={16} /> Previous
          </button>
        </div>
      </div>
    </div>
  );
}
