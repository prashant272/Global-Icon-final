import { useState, useEffect } from "react";
import { Edit2, Plus, Trash2, X, Image as ImageIcon } from "lucide-react";
import { getAwardName } from "../utils/brand.js";
import {
    fetchPreviousEditions,
    createPreviousEdition,
    updatePreviousEdition,
    deletePreviousEdition,
} from "../services/api.js";

const inputClass =
    "w-full rounded-lg bg-gradient-to-br from-[#23251c]/60 to-[#141015]/80 border border-[#d4af3790]/50 px-3 py-2 text-sm text-white shadow focus:(outline-none ring-2 ring-[#d4af37]/60) placeholder:text-[#d1c894]/60 font-semibold transition";

export default function AdminEditionsTab({ token }) {
    const [editions, setEditions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const [formData, setFormData] = useState({
        _id: "",
        year: "",
        title: `${getAwardName()} Excellence Awards`,
        editionLabel: "",
        locations: "", // Comma-separated internally
        fullDate: "",
        hero: "",
        youtubeLinks: "", // Comma-separated internally
    });

    const [selectedImages, setSelectedImages] = useState([]); // File objects
    const [existingImages, setExistingImages] = useState([]); // URLs
    const [imagesToRemove, setImagesToRemove] = useState([]); // URLs of existing images to delete

    useEffect(() => {
        loadData();
        // eslint-disable-next-line
    }, [token]);

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await fetchPreviousEditions();
            setEditions(data);
        } catch (err) {
            setError(err.message || "Failed to load editions");
        } finally {
            setLoading(false);
        }
    };

    const openCreateModal = () => {
        setFormData({
            _id: "",
            year: "",
            title: `${getAwardName()} Excellence Awards`,
            editionLabel: "",
            locations: "",
            fullDate: "",
            hero: "",
            youtubeLinks: "",
        });
        setSelectedImages([]);
        setExistingImages([]);
        setImagesToRemove([]);
        setIsModalOpen(true);
        setError("");
    };

    const openEditModal = (edition) => {
        setFormData({
            _id: edition._id,
            year: edition.year,
            title: edition.title || `${getAwardName()} Excellence Awards`,
            editionLabel: edition.editionLabel || "",
            locations: edition.locations ? edition.locations.join(", ") : "",
            fullDate: edition.fullDate || "",
            hero: edition.hero || "",
            youtubeLinks: edition.youtubeLinks ? edition.youtubeLinks.join(", ") : "",
        });
        setSelectedImages([]);
        setExistingImages(edition.images || []);
        setImagesToRemove([]);
        setIsModalOpen(true);
        setError("");
    };

    const handleImageChange = (e) => {
        if (e.target.files) {
            setSelectedImages([...selectedImages, ...Array.from(e.target.files)]);
        }
    };

    const handleRemoveExistingImage = (url) => {
        setExistingImages(existingImages.filter((img) => img !== url));
        setImagesToRemove([...imagesToRemove, url]);
    };

    const handleRemoveNewImage = (index) => {
        setSelectedImages(selectedImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.year) {
            setError("Year is required");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const payload = new FormData();
            payload.append("year", formData.year);
            payload.append("title", formData.title);
            payload.append("editionLabel", formData.editionLabel);
            payload.append("locations", formData.locations);
            payload.append("fullDate", formData.fullDate);
            payload.append("hero", formData.hero);
            payload.append("youtubeLinks", formData.youtubeLinks);

            if (formData._id) {
                payload.append("removeImages", JSON.stringify(imagesToRemove));
            }

            selectedImages.forEach((file) => {
                payload.append("images", file);
            });

            if (formData._id) {
                await updatePreviousEdition(formData._id, payload, token);
            } else {
                await createPreviousEdition(payload, token);
            }

            setIsModalOpen(false);
            loadData();
        } catch (err) {
            setError(err.message || "Failed to save edition");
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteConfirmId) return;
        try {
            setLoading(true);
            await deletePreviousEdition(deleteConfirmId, token);
            setDeleteConfirmId(null);
            loadData();
        } catch (err) {
            setError(err.message || "Failed to delete");
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-[#1a160a]/40 p-4 rounded-2xl border border-[#ffffff0d] backdrop-blur-md">
                <h2 className="text-xl font-black text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#d4af37] flex items-center justify-center shadow-lg">
                        <ImageIcon className="text-black" size={18} />
                    </div>
                    Previous Editions
                </h2>
                <div className="flex gap-4 items-center">
                    {loading && <span className="text-sm text-yellow-300 animate-pulse">Loading...</span>}
                    <button
                        onClick={openCreateModal}
                        className="bg-gradient-to-r from-[#ecd26c] to-[#d49d28] text-[#232012] px-4 py-2 rounded-lg font-bold shadow hover:from-[#fdf0bc] hover:to-[#fae36e] transition flex items-center gap-2"
                    >
                        <Plus size={16} /> New Edition
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-900/30 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl flex items-center gap-3">
                    <span className="font-bold">Error:</span> {error}
                </div>
            )}

            {/* Editions Table */}
            <div className="overflow-x-auto border border-[#eaca5f80] rounded-2xl bg-gradient-to-tr from-[#23201aee] via-[#2b2313cf] to-[#10161aee] shadow-xl shadow-[#d4af3722] backdrop-blur relative">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-gradient-to-r from-[#231e09] to-[#2e2612] text-[#f2eab6]">
                        <tr>
                            <th className="px-6 py-4 font-bold">Year / Label</th>
                            <th className="px-6 py-4 font-bold">Title & Hero</th>
                            <th className="px-6 py-4 font-bold">Locations</th>
                            <th className="px-6 py-4 font-bold">Images</th>
                            <th className="px-6 py-4 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {editions.map((e, idx) => (
                            <tr
                                key={e._id}
                                className={`transition-colors ${idx % 2 === 0 ? "bg-black/20" : "bg-black/10"} hover:bg-[#d4af37]/10`}
                            >
                                <td className="px-6 py-4">
                                    <div className="font-black text-xl text-[#d4af37]">{e.year}</div>
                                    <div className="text-xs text-[#ffeab080] font-bold uppercase tracking-wider">{e.editionLabel || "—"}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-[#fee5af]">{e.title}</div>
                                    <div className="text-xs text-gray-400 max-w-xs truncate" title={e.hero}>{e.hero || "—"}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-xs text-blue-200">{e.locations?.join(", ") || "—"}</div>
                                    <div className="text-[10px] text-gray-500 mt-1">{e.fullDate}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex -space-x-3">
                                        {e.images.slice(0, 3).map((img, i) => (
                                            <img
                                                key={i}
                                                src={img}
                                                alt="Edition Preview"
                                                className="w-10 h-10 rounded-full border-2 border-[#2b2313] object-cover bg-black"
                                            />
                                        ))}
                                        {e.images.length > 3 && (
                                            <div className="w-10 h-10 rounded-full border-2 border-[#2b2313] bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] text-xs font-bold z-10 backdrop-blur-sm">
                                                +{e.images.length - 3}
                                            </div>
                                        )}
                                        {e.images.length === 0 && <span className="text-gray-500 text-xs italic">No images</span>}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => openEditModal(e)}
                                            className="w-8 h-8 flex items-center justify-center border border-[#d4af37]/70 bg-[#2b2512]/70 text-[#d4af37] rounded-full shadow transition hover:bg-gradient-to-tr hover:from-[#fbe399] hover:to-[#ceb655] hover:text-[#221d10]"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => setDeleteConfirmId(e._id)}
                                            className="w-8 h-8 flex items-center justify-center border border-red-400/50 bg-[#231010]/60 text-red-400 rounded-full shadow transition hover:bg-gradient-to-tr hover:from-[#fbad99] hover:to-[#ce5a3a] hover:text-[#321010]"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {editions.length === 0 && !loading && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-gray-400 italic">
                                    No previous editions stored in database. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ================== Modal: Create / Edit ================== */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] backdrop-blur-sm px-4">
                    <div className="bg-gradient-to-tr from-[#2e2b18] via-[#18130e] to-[#18130e] border-2 border-[#eaca5faa] shadow-[0_10px_40px_rgba(212,175,55,0.2)] p-8 rounded-[2rem] max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={28} />
                        </button>
                        <h2 className="text-3xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#ffe78c] to-[#d4af37]">
                            {formData._id ? "Edit Edition" : "Create Previous Edition"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="col-span-1">
                                    <label className="text-xs text-[#f6e589] font-bold tracking-widest uppercase mb-1 block">Year *</label>
                                    <input
                                        type="number"
                                        required
                                        className={inputClass}
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                    />
                                </div>
                                <div className="col-span-1">
                                    <label className="text-xs text-[#f6e589] font-bold tracking-widest uppercase mb-1 block">Edition Label</label>
                                    <input
                                        className={inputClass}
                                        placeholder="e.g. 13th Edition"
                                        value={formData.editionLabel}
                                        onChange={(e) => setFormData({ ...formData, editionLabel: e.target.value })}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-xs text-[#f6e589] font-bold tracking-widest uppercase mb-1 block">Title</label>
                                    <input
                                        className={inputClass}
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-[#f6e589] font-bold tracking-widest uppercase mb-1 block">Locations (Comma separated)</label>
                                    <input
                                        className={inputClass}
                                        placeholder="Dubai, London"
                                        value={formData.locations}
                                        onChange={(e) => setFormData({ ...formData, locations: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-[#f6e589] font-bold tracking-widest uppercase mb-1 block">Full Date Label</label>
                                    <input
                                        className={inputClass}
                                        placeholder="e.g. May 2025"
                                        value={formData.fullDate}
                                        onChange={(e) => setFormData({ ...formData, fullDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs text-[#f6e589] font-bold tracking-widest uppercase mb-1 block">YouTube Video Links (Comma separated)</label>
                                <input
                                    className={inputClass}
                                    placeholder="e.g. https://youtube.com/watch?v=1, https://youtube.com/watch?v=2"
                                    value={formData.youtubeLinks}
                                    onChange={(e) => setFormData({ ...formData, youtubeLinks: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="text-xs text-[#f6e589] font-bold tracking-widest uppercase mb-1 block">Hero Headline / Description</label>
                                <textarea
                                    className={`${inputClass} min-h-[80px]`}
                                    value={formData.hero}
                                    onChange={(e) => setFormData({ ...formData, hero: e.target.value })}
                                />
                            </div>

                            <div className="border border-[#d4af37]/20 p-4 rounded-xl bg-black/20">
                                <label className="text-xs text-[#f6e589] font-bold tracking-widest uppercase mb-3 block">Gallery Images</label>

                                {/* Existing Images (from Cloudinary) */}
                                {existingImages.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-[10px] text-gray-400 mb-2 uppercase tracking-wider">Current Images</p>
                                        <div className="flex flex-wrap gap-3">
                                            {existingImages.map((url, idx) => (
                                                <div key={idx} className="relative group rounded-lg overflow-hidden border border-[#d4af37]/30">
                                                    <img src={url} alt="existing" className="w-20 h-20 object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveExistingImage(url)}
                                                        className="absolute inset-0 bg-red-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 className="text-white" size={20} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* New Images */}
                                <div>
                                    <p className="text-[10px] text-gray-400 mb-2 uppercase tracking-wider">Add New Images</p>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#d4af37] file:text-black hover:file:bg-[#ffe78c] transition"
                                    />
                                    {selectedImages.length > 0 && (
                                        <div className="flex flex-wrap gap-3 mt-4">
                                            {selectedImages.map((file, idx) => (
                                                <div key={idx} className="relative group rounded-lg overflow-hidden border border-blue-400/30">
                                                    <img src={URL.createObjectURL(file)} alt="preview" className="w-20 h-20 object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveNewImage(idx)}
                                                        className="absolute inset-0 bg-red-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 className="text-white" size={20} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-[#d4af37]/20">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2 border border-white/20 text-white rounded-xl shadow hover:bg-white/10 transition font-bold"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-gradient-to-r from-[#ecd26c] to-[#d49d28] text-black px-8 py-2 rounded-xl font-black shadow-lg hover:from-[#fdf0bc] hover:to-[#fae36e] transition disabled:opacity-50"
                                >
                                    {loading ? "Saving..." : "Save Edition"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteConfirmId && (
                <div className="fixed inset-0 bg-[#13110aee] backdrop-blur-[1.5px] flex items-center justify-center z-[9999]">
                    <div className="bg-gradient-to-br from-[#292112f6] to-[#18130e] border border-[#edcc68be] shadow-2xl rounded-2xl max-w-md w-full min-h-[220px] flex flex-col justify-between py-10 px-8 gap-2">
                        <h2 className="text-2xl font-semibold mb-2 text-[#fae36f] flex gap-2 items-center">
                            <Trash2 className="text-red-400" size={26} /> Delete Edition?
                        </h2>
                        <p className="text-base text-[#ffe8a7] mb-4">
                            This action cannot be undone and will delete all associated images from the S3 server.<br />
                            Are you sure?
                        </p>
                        <div className="flex justify-end gap-5 mt-4">
                            <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="bg-gradient-to-r from-[#793717] to-[#161614] border border-[#dbbe4fad] text-[#ffe9a1] px-5 py-2 rounded-lg font-semibold hover:bg-[#edca8aec] shadow"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-gradient-to-tr from-[#f43e2c] to-[#7a1b0a] text-[#ffebd2] px-8 py-2 rounded-lg font-extrabold shadow-md hover:from-[#d42121] hover:to-[#772014] flex items-center gap-2"
                            >
                                {loading ? "Deleting..." : "Delete Edition"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
