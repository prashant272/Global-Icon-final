import { useState, useEffect } from "react";
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from "../services/api.js";
import { Edit2, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminBlogsTab({ token }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    imageFile: null,
    author: "Admin",
    isActive: true,
  });

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const data = await fetchBlogs({ admin: true });
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, imageFile: e.target.files[0] }));
    }
  };

  const handleOpenForm = (blog = null) => {
    if (blog) {
      setIsEditing(true);
      setEditingId(blog._id);
      setFormData({
        title: blog.title || "",
        content: blog.content || "",
        image: blog.image || "",
        imageFile: null,
        author: blog.author || "Admin",
        isActive: blog.isActive !== undefined ? blog.isActive : true,
      });
    } else {
      setIsEditing(false);
      setEditingId(null);
      setFormData({
        title: "",
        content: "",
        image: "",
        imageFile: null,
        author: "Admin",
        isActive: true,
      });
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("content", formData.content);
      fd.append("author", formData.author);
      fd.append("isActive", formData.isActive);
      if (formData.imageFile) {
        fd.append("imageFile", formData.imageFile);
      } else if (formData.image) {
        fd.append("image", formData.image);
      }

      if (isEditing) {
        await updateBlog(editingId, fd, token);
        toast.success("Blog updated successfully");
      } else {
        await createBlog(fd, token);
        toast.success("Blog created successfully");
      }
      handleCloseForm();
      loadBlogs();
    } catch (err) {
      toast.error(err.message || "Failed to save blog");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id, token);
        toast.success("Blog deleted successfully");
        loadBlogs();
      } catch (err) {
        toast.error(err.message || "Failed to delete blog");
      }
    }
  };

  const inputClass =
    "w-full rounded-lg bg-gradient-to-br from-[#23251c]/60 to-[#141015]/80 border border-[#d4af3790]/50 px-3 py-2 text-sm text-white shadow focus:(outline-none ring-2 ring-[#d4af37]/60) placeholder:text-[#d1c894]/60 transition";

  if (loading && blogs.length === 0) {
    return <div className="text-center py-10 text-gray-400">Loading blogs...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-400">{error}</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e9d781] via-[#fee19a] to-[#dac24a]">
            Blog Management
          </h2>
          <p className="text-gray-400 text-sm mt-1">Manage your website blogs</p>
        </div>
        <button
          onClick={() => handleOpenForm()}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/30 transition"
        >
          <Plus size={18} />
          Create Blog
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-[#1a160a] border border-[#d4af37]/30 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-8">
            <div className="bg-gradient-to-r from-[#2a2411] to-[#1a160a] px-6 py-4 border-b border-[#d4af37]/20 flex justify-between items-center sticky top-0 z-10">
              <h3 className="text-lg font-bold text-[#f3e5ab]">
                {isEditing ? "Edit Blog" : "Create New Blog"}
              </h3>
              <button
                onClick={handleCloseForm}
                className="text-gray-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-[#d4af37]/70 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className={inputClass}
                  placeholder="Enter blog title"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#d4af37]/70 mb-1">Featured Image</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#d4af37]/20 file:text-[#d4af37] hover:file:bg-[#d4af37]/30 cursor-pointer"
                  />
                  {formData.imageFile ? (
                    <span className="text-xs text-green-400">New file selected: {formData.imageFile.name}</span>
                  ) : formData.image ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Current:</span>
                      <img src={formData.image} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-[#d4af37]/30" />
                    </div>
                  ) : null}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#d4af37]/70 mb-1">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Author Name"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-[#d4af37]/70 mb-1">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={8}
                  className={inputClass}
                  placeholder="Write your blog content here... (HTML supported)"
                ></textarea>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  id="isActive"
                  className="w-4 h-4 rounded border-[#d4af37]/50 bg-[#1a160a] text-[#d4af37] focus:ring-[#d4af37]/50"
                />
                <label htmlFor="isActive" className="text-sm font-semibold text-gray-300">
                  Publish (Visible to public)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#d4af37]/20">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2 rounded-lg font-bold text-gray-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/30 transition"
                >
                  {isEditing ? "Save Changes" : "Create Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-gradient-to-br from-[#1a160a] to-[#2a2411] border border-[#d4af37]/30 rounded-xl overflow-hidden shadow-lg flex flex-col">
            {blog.image ? (
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover border-b border-[#d4af37]/20" />
            ) : (
              <div className="w-full h-48 bg-[#100d05] flex items-center justify-center border-b border-[#d4af37]/20 text-[#d4af37]/30">
                <ImageIcon size={48} />
              </div>
            )}
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-[#f3e5ab] line-clamp-2 leading-tight">
                  {blog.title}
                </h3>
                <span className={`text-[10px] uppercase font-black px-2 py-1 rounded-full whitespace-nowrap ml-2 ${blog.isActive ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                  {blog.isActive ? "Active" : "Draft"}
                </span>
              </div>
              
              <p className="text-gray-400 text-xs mb-4 line-clamp-3 flex-1">
                {blog.content.replace(/<[^>]*>?/gm, '')}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-[#d4af37]/10">
                <span>By {blog.author}</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleOpenForm(blog)}
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 hover:bg-[#d4af37]/20 transition font-bold text-xs"
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition font-bold text-xs"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {blogs.length === 0 && !loading && (
          <div className="col-span-full text-center py-12 border border-dashed border-[#d4af37]/30 rounded-xl bg-[#1a160a]/50">
            <p className="text-gray-400 mb-4">No blogs found.</p>
            <button
              onClick={() => handleOpenForm()}
              className="px-4 py-2 bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 font-bold rounded-lg hover:bg-[#d4af37]/30 transition"
            >
              Create your first blog
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
