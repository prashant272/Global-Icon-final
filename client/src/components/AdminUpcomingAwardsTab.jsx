import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { fetchUpcomingAwards, deleteUpcomingAward, getBaseUrl } from "../services/api.js";

const emptyForm = {
  title: "",
  date: "",
  location: "",
  desc: "",
  bannerFiles: [],
  bannerPreviews: [],
  guestFiles: [],
  guestPreviews: [],
  link: "",
  isActive: true,
  winners: [], // [{ name: "", file: null, preview: "" }]
};

export default function AdminUpcomingAwardsTab() {
  const { token } = useAuth();
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [editingAward, setEditingAward] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = () => {
    setLoading(true);
    fetchUpcomingAwards()
      .then(setAwards)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "banners" && type === "file") {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
      setForm((f) => ({
        ...f,
        bannerFiles: [...(f.bannerFiles || []), ...newFiles],
        bannerPreviews: [...(f.bannerPreviews || []), ...newPreviews],
      }));
    } else if (name === "guestImages" && type === "file") {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
      setForm((f) => ({
        ...f,
        guestFiles: [...(f.guestFiles || []), ...newFiles],
        guestPreviews: [...(f.guestPreviews || []), ...newPreviews],
      }));
    } else {
      setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    }
  };

  const handleWinnerChange = (idx, field, value) => {
    setForm((f) => {
      const newWinners = [...(f.winners || [])];
      if (field === "file") {
        const file = value;
        newWinners[idx] = { 
          ...newWinners[idx], 
          file, 
          preview: URL.createObjectURL(file) 
        };
      } else {
        newWinners[idx] = { ...newWinners[idx], [field]: value };
      }
      return { ...f, winners: newWinners };
    });
  };

  const addWinnerRow = () => {
    setForm((f) => ({
      ...f,
      winners: [...(f.winners || []), { name: "", file: null, preview: "" }],
    }));
  };

  const removeWinnerRow = (idx) => {
    setForm((f) => ({
      ...f,
      winners: (f.winners || []).filter((_, i) => i !== idx),
    }));
  };

  const removeBannerPreview = (idx) => {
    setForm((f) => ({
      ...f,
      bannerFiles: f.bannerFiles.filter((_, i) => i !== idx),
      bannerPreviews: f.bannerPreviews.filter((_, i) => i !== idx),
    }));
  };

  const removeExistingBanner = async (url) => {
    if (!editingId) return;
    try {
      await fetch(`${getBaseUrl()}/api/upcoming-awards/${editingId}/banner`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      setEditingAward((prev) => ({
        ...prev,
        banners: (prev.banners || []).filter((u) => u !== url),
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const removeGuestPreview = (idx) => {
    setForm((f) => ({
      ...f,
      guestFiles: f.guestFiles.filter((_, i) => i !== idx),
      guestPreviews: f.guestPreviews.filter((_, i) => i !== idx),
    }));
  };

  const removeExistingGuestImage = async (url) => {
    if (!editingId) return;
    try {
      await fetch(`${getBaseUrl()}/api/upcoming-awards/${editingId}/guest-image`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      setEditingAward((prev) => ({
        ...prev,
        guestImages: (prev.guestImages || []).filter((u) => u !== url),
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const removeExistingWinner = async (winnerId) => {
    if (!editingId) return;
    try {
      await fetch(`${getBaseUrl()}/api/upcoming-awards/${editingId}/winner/${winnerId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingAward((prev) => ({
        ...prev,
        previousWinners: (prev.previousWinners || []).filter((w) => w._id !== winnerId),
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (award) => {
    setEditingId(award._id);
    setEditingAward(award);
    setForm({
      title: award.title || "",
      date: award.date || "",
      location: award.location || "",
      desc: award.desc || "",
      bannerFiles: [],
      bannerPreviews: [],
      guestFiles: [],
      guestPreviews: [],
      link: award.link || "",
      isActive: award.isActive !== false,
      winners: [], 
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingAward(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return setError("Title is required");
    setSaving(true);
    setError("");
    try {
      const apiBase = getBaseUrl();
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("date", form.date);
      fd.append("location", form.location);
      fd.append("desc", form.desc);
      fd.append("link", form.link);
      fd.append("isActive", form.isActive);
      form.bannerFiles.forEach((f) => fd.append("banners", f));
      form.guestFiles.forEach((f) => fd.append("guestImages", f));

      // Handle winners
      const winnersMetadata = (form.winners || [])
        .filter(w => w.name && w.file)
        .map((w, idx) => ({ name: w.name, tempId: idx }));
      
      if (winnersMetadata.length > 0) {
        fd.append("winnersMetadata", JSON.stringify(winnersMetadata));
        (form.winners || []).forEach(w => {
          if (w.file) fd.append("winnerImages", w.file);
        });
      }

      const url = editingId
        ? `${apiBase}/api/upcoming-awards/${editingId}`
        : `${apiBase}/api/upcoming-awards`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Request failed");
      }
      const saved = await res.json();
      if (editingId) {
        setAwards((prev) => prev.map((a) => (a._id === editingId ? saved : a)));
        setSuccess("Award updated!");
      } else {
        setAwards((prev) => [saved, ...prev]);
        setSuccess("Award added!");
      }
      handleCancel();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
      setTimeout(() => setSuccess(""), 3000);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUpcomingAward(deleteId, token);
      setAwards((prev) => prev.filter((a) => a._id !== deleteId));
      setDeleteId(null);
      setSuccess("Award deleted.");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const inputCls = "w-full rounded-lg bg-[#1a160a]/80 border border-[#d4af37]/30 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 transition";

  return (
    <div className="space-y-8">
      {/* ===== FORM ===== */}
      <div className="bg-gradient-to-br from-[#1e180a]/90 to-[#2a2010]/80 border border-[#d4af37]/20 rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-black text-[#fae36f] mb-5 flex items-center gap-2">
          🏆 {editingId ? "Edit Upcoming Award" : "Add Upcoming Award"}
        </h2>

        {error && <p className="mb-4 text-red-400 text-sm font-semibold bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">{error}</p>}
        {success && <p className="mb-4 text-green-400 text-sm font-semibold bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">{success}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block mb-1">Title *</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Global Healthcare Awards 2026" className={inputCls} required />
          </div>

          {/* Date */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block mb-1">Date</label>
            <input name="date" value={form.date} onChange={handleChange} placeholder="e.g. 26 April 2026" className={inputCls} />
          </div>

          {/* Location */}
          <div>
            <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block mb-1">Location</label>
            <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. New Delhi, India" className={inputCls} />
          </div>

          {/* Website Link */}
          <div className="md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block mb-1">Website / Registration Link</label>
            <input name="link" value={form.link} onChange={handleChange} placeholder="https://..." className={inputCls} />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block mb-1">Description</label>
            <textarea name="desc" value={form.desc} onChange={handleChange} rows={4} placeholder="Award description..." className={inputCls + " resize-none"} />
          </div>

          {/* Banner Images */}
          <div className="md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block mb-2">Banner Images (Slider)</label>
            
            {/* Existing banners */}
            {editingAward?.banners?.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-3">
                {editingAward.banners.map((url, i) => (
                  <div key={i} className="relative group">
                    <img src={url} alt={`banner-${i}`} className="w-24 h-16 object-cover rounded-lg border border-[#d4af37]/30" />
                    <button type="button" onClick={() => removeExistingBanner(url)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg">✕</button>
                  </div>
                ))}
              </div>
            )}

            {/* New banner previews */}
            {(form.bannerPreviews || []).length > 0 && (
              <div className="flex flex-wrap gap-3 mb-3">
                {form.bannerPreviews.map((url, i) => (
                  <div key={i} className="relative group">
                    <img src={url} alt={`new-banner-${i}`} className="w-24 h-16 object-cover rounded-lg border border-green-500/40" />
                    <button type="button" onClick={() => removeBannerPreview(i)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg">✕</button>
                    <span className="absolute bottom-0 left-0 right-0 text-center text-[8px] bg-green-500 text-white rounded-b-lg font-bold">New</span>
                  </div>
                ))}
              </div>
            )}

            <input type="file" name="banners" accept="image/*" multiple onChange={handleChange}
              className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#d4af37]/20 file:text-[#fae36f] file:font-bold hover:file:bg-[#d4af37]/40 cursor-pointer" />
            <p className="text-[10px] text-gray-500 mt-1">Upload event banners (max 10MB each). First image will be used as thumbnail.</p>
          </div>

          {/* Chief Guest Photos */}
          <div className="md:col-span-2">
            <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold block mb-2">Chief Guest / Speaker Photos</label>

            {/* Existing guest images (edit mode) */}
            {editingAward?.guestImages?.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-3">
                {editingAward.guestImages.map((url, i) => (
                  <div key={i} className="relative group">
                    <img src={url} alt={`guest-${i}`} className="w-20 h-20 object-cover rounded-xl border border-[#d4af37]/30" />
                    <button type="button" onClick={() => removeExistingGuestImage(url)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition">✕</button>
                  </div>
                ))}
              </div>
            )}

            {/* New guest image previews */}
            {(form.guestPreviews || []).length > 0 && (
              <div className="flex flex-wrap gap-3 mb-3">
                {form.guestPreviews.map((url, i) => (
                  <div key={i} className="relative group">
                    <img src={url} alt={`new-guest-${i}`} className="w-20 h-20 object-cover rounded-xl border border-green-500/40" />
                    <button type="button" onClick={() => removeGuestPreview(i)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition">✕</button>
                    <span className="absolute bottom-0 left-0 right-0 text-center text-[8px] bg-green-500 text-white rounded-b-xl">New</span>
                  </div>
                ))}
              </div>
            )}

            <input type="file" name="guestImages" accept="image/*" multiple onChange={handleChange}
              className="w-full text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#d4af37]/20 file:text-[#fae36f] file:font-bold hover:file:bg-[#d4af37]/40 cursor-pointer" />
            <p className="text-[10px] text-gray-500 mt-1">Select multiple photos (max 20, 10MB each)</p>
          </div>

          {/* Previous Winners */}
          <div className="md:col-span-2 border-t border-[#d4af37]/10 pt-4 mt-2">
            <div className="flex justify-between items-center mb-4">
              <label className="text-[10px] uppercase tracking-widest text-[#d4af37] font-bold">Previous Winners Section</label>
              <button type="button" onClick={addWinnerRow} className="text-[10px] font-black bg-[#d4af37]/20 text-[#fae36f] px-3 py-1 rounded-full hover:bg-[#d4af37]/30 border border-[#d4af37]/30 transition">+ ADD WINNER</button>
            </div>

            {/* Existing Winners */}
            {editingAward?.previousWinners?.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {editingAward.previousWinners.map((w) => (
                  <div key={w._id} className="relative group bg-black/20 p-2 rounded-xl border border-[#d4af37]/10">
                    <img src={w.image} alt={w.name} className="w-full aspect-square object-cover rounded-lg mb-2" />
                    <p className="text-[10px] font-bold text-white truncate text-center">{w.name}</p>
                    <button type="button" onClick={() => removeExistingWinner(w._id)}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg">✕</button>
                  </div>
                ))}
              </div>
            )}

            {/* New Winner Rows */}
            <div className="space-y-3">
              {(form.winners || []).map((w, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-3 p-3 rounded-xl bg-black/20 border border-green-500/20">
                  <div className="flex-1">
                    <input 
                      placeholder="Winner Name (e.g. John Doe)"
                      value={w.name}
                      onChange={(e) => handleWinnerChange(idx, "name", e.target.value)}
                      className={inputCls}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    {w.preview && <img src={w.preview} className="w-10 h-10 rounded-lg object-cover border border-[#d4af37]/30" />}
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleWinnerChange(idx, "file", e.target.files[0])}
                      className="text-[10px] text-gray-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-[#d4af37]/20 file:text-[#fae36f] file:font-bold hover:file:bg-[#d4af37]/40 cursor-pointer"
                    />
                    <button type="button" onClick={() => removeWinnerRow(idx)} className="text-red-400 hover:text-red-500">✕</button>
                  </div>
                </div>
              ))}
              {(form.winners || []).length === 0 && !editingAward?.previousWinners?.length && (
                <p className="text-center py-4 text-xs text-gray-500 italic">No previous winners added yet.</p>
              )}
            </div>
          </div>

          {/* Active toggle */}
          <div className="flex items-center gap-2">
            <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} id="isActive" className="w-4 h-4 accent-[#d4af37]" />
            <label htmlFor="isActive" className="text-sm text-[#fae36f] font-semibold">Active (show in navbar)</label>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="flex-1 bg-gradient-to-r from-[#ffeec3] via-[#d4af37] to-[#a28533] text-black font-black py-2.5 rounded-xl hover:brightness-110 transition disabled:opacity-60">
              {saving ? "Saving..." : editingId ? "Update Award" : "Add Award"}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel}
                className="px-6 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ===== AWARDS LIST ===== */}
      <div className="bg-gradient-to-br from-[#1e180a]/90 to-[#2a2010]/80 border border-[#d4af37]/20 rounded-2xl overflow-hidden shadow-xl">
        <div className="px-6 py-4 border-b border-[#d4af37]/10">
          <h3 className="text-base font-black text-[#fae36f]">All Upcoming Awards ({awards.length})</h3>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : awards.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-semibold">No upcoming awards yet.</div>
        ) : (
          <div className="divide-y divide-[#d4af37]/10">
            {awards.map((award) => (
              <div key={award._id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition">
                {award.banners?.[0] && (
                  <img src={award.banners[0]} alt={award.title} className="w-16 h-12 object-cover rounded-lg border border-[#d4af37]/20 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-black text-white text-sm truncate">{award.title}</p>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${award.isActive ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
                      {award.isActive ? "Active" : "Hidden"}
                    </span>
                  </div>
                  <p className="text-xs text-[#d4af37] mt-0.5">{award.date}{award.location ? ` · ${award.location}` : ""}</p>
                  {award.guestImages?.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {award.guestImages.slice(0, 5).map((u, i) => (
                        <img key={i} src={u} className="w-6 h-6 rounded-full object-cover border border-[#d4af37]/30" />
                      ))}
                      {award.guestImages.length > 5 && <span className="text-[10px] text-gray-400 self-center">+{award.guestImages.length - 5}</span>}
                    </div>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleEdit(award)}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#d4af37]/20 text-[#fae36f] hover:bg-[#d4af37]/40 transition border border-[#d4af37]/30">
                    Edit
                  </button>
                  <button onClick={() => setDeleteId(award._id)}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/25 transition border border-red-500/20">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-[#1e180a] border border-red-500/30 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-black text-white mb-2">Delete Award?</h3>
            <p className="text-sm text-gray-400 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-black py-2 rounded-xl transition">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 bg-white/10 text-white font-bold py-2 rounded-xl hover:bg-white/20 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
