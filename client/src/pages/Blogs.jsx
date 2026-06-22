import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../services/api.js";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs();
        setBlogs(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0503] text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-black uppercase tracking-widest mb-4">
            <BookOpen size={14} />
            Latest Updates
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e9d781] via-[#fee19a] to-[#dac24a] mb-4">
            Our Blog
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Stay updated with the latest news, insights, and stories from our community.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-[#d4af37]/30 border-t-[#d4af37] rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-400">{error}</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 text-gray-400 border border-white/5 rounded-2xl bg-white/[0.02]">
            No blogs published yet. Check back later!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <Link
                to={`/blogs/${blog.slug}`}
                key={blog._id}
                className="group bg-gradient-to-br from-[#1a160a] to-[#2a2411] border border-[#d4af37]/30 rounded-2xl overflow-hidden hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] hover:border-[#d4af37]/60 transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {blog.image ? (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-[#100d05] flex items-center justify-center border-b border-[#d4af37]/20 text-[#d4af37]/20 group-hover:bg-[#151108] transition-colors">
                    <BookOpen size={48} />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-[#d4af37]">
                      <Calendar size={14} />
                      {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User size={14} />
                      {blog.author}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-[#f3e5ab] mb-3 line-clamp-2 leading-snug group-hover:text-white transition-colors">
                    {blog.title}
                  </h2>
                  
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                    {blog.content.replace(/<[^>]*>?/gm, '')}
                  </p>
                  
                  <div className="flex items-center gap-2 text-[#d4af37] font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                    Read Article <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
