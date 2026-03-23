import { useEffect, useMemo, useState } from "react";
import {
  fetchAdminNominations,
  updateNominationStatus,
  updateNomination,
  deleteNomination,
} from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { ShieldCheck, Edit2, Trash2, Eye, Crown, BarChart3 } from "lucide-react";
import { getAwardName } from "../utils/brand.js";

import AdminEditionsTab from "../components/AdminEditionsTab.jsx";
import AdminUpcomingAwardsTab from "../components/AdminUpcomingAwardsTab.jsx";

/* ------------------ Constants ------------------ */
const goldGrad =
  "linear-gradient(90deg,#e9d781 0%,#dac24a 29.69%,#fee19a 70%,#bc9830 100%)";

const STATUS_OPTIONS = [
  { value: "nominated", label: "Nomination Received" },
  { value: "evaluation", label: "Under Evaluation" },
  { value: "in_progress", label: "In Progress (Shortlisted for user)" },
  { value: "selected", label: "Selected (Winner)" },
  { value: "rejected", label: "Rejected" },
];

const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All" },
  ...STATUS_OPTIONS,
];

const PARTICIPATION_TYPE_FILTER_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "nominated as award", label: "Award Nomination" },
  { value: "attend as speaker", label: "Speaker" },
  { value: "attend as exhibitor", label: "Exhibitor" },
  { value: "attend as sponsor", label: "Sponsor" },
];

const FIELD_FILTER_OPTIONS = [
  { value: "all", label: "All Fields" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Education", label: "Education" },
  { value: "Real Estate & Infrastructure", label: "Real Estate" },
  { value: "Hospitality & Tourism", label: "Hospitality" },
  { value: "Manufacturing & Industrial", label: "Manufacturing" },
  { value: "Beauty & Wellness", label: "Beauty" },
  { value: "Technology & Digital Transformation", label: "Technology" },
  { value: "Finance & Banking", label: "Finance" },
  { value: "Sustainability & Environment", label: "Sustainability" },
  { value: "Public & Government Sector", label: "Public sector" },
  { value: "Media, Culture & Sports", label: "Media & Sports" },
];

const LOCATION_FILTER_OPTIONS = [
  { value: "all", label: "All Locations" },
  { value: "New Delhi", label: "New Delhi" },
  { value: "Dubai", label: "Dubai" },
];

/* ------------------ Detail Item Helper ------------------ */
function DetailItem({ label, value, badge, isLink, isEmail, isWarning }) {
  if (!value && value !== 0) value = "—";

  return (
    <div className="space-y-1">
      <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest block">{label}</label>
      {badge ? (
        <span className="inline-block bg-[#d4af37]/10 text-[#fae36f] border border-[#d4af37]/30 px-3 py-1 rounded-full text-xs font-bold leading-none">
          {value}
        </span>
      ) : isEmail ? (
        <a href={`mailto:${value}`} className="text-blue-300 hover:text-blue-100 transition-colors block text-sm font-medium underline underline-offset-4 decoration-blue-500/30">
          {value}
        </a>
      ) : isLink ? (
        <a href={value.startsWith('http') ? value : `https://${value}`} target="_blank" rel="noopener noreferrer" className="text-[#fae36f] hover:text-[#fff] transition-colors block text-sm font-medium truncate">
          {value}
        </a>
      ) : (
        <p className={`text-sm font-semibold tracking-tight ${isWarning ? 'text-[#f6e58d]' : 'text-gray-200'}`}>
          {value}
        </p>
      )}
    </div>
  );
}

/* ------------------ Status Badge ------------------ */
function StatusBadge({ status }) {
  const normalized = status || "nominated";
  const adminLabel =
    STATUS_OPTIONS.find((s) => s.value === normalized)?.label ||
    "Nomination Received";

  const colorClasses = {
    nominated:
      "bg-gradient-to-r from-[#393d63] to-[#5263a6] text-blue-50 border-blue-400/60 shadow shadow-blue-800/40",
    evaluation:
      "bg-gradient-to-r from-[#a38e65] to-[#ffe69d] text-yellow-800 border-yellow-400/60 shadow shadow-yellow-900/20",
    in_progress:
      "bg-gradient-to-r from-[#4d7330] to-[#bafa6b] text-lime-900 border-lime-400/60 shadow shadow-lime-800/20",
    selected:
      "bg-gradient-to-r from-[#155449] to-[#4eecbe] text-emerald-50 border-emerald-400/70 shadow shadow-emerald-800/20",
    rejected:
      "bg-gradient-to-r from-[#512a23] to-[#a04534] text-red-50 border-red-400/60 shadow shadow-red-800/30",
  }[normalized];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.3 text-[11px] font-semibold uppercase tracking-wide backdrop-blur-sm ${colorClasses}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {adminLabel}
    </span>
  );
}

const PAYMENT_STATUS_OPTIONS = [
  { value: "not_paid", label: "Not Paid" },
  { value: "initial_paid", label: "Initial Payment" },
  { value: "paid", label: "Paid (Completed)" },
  { value: "not_interested", label: "Not Interested" },
];

/* ================== MAIN COMPONENT ================== */
export default function AdminDashboard() {
  const { token } = useAuth();

  const [nominations, setNominations] = useState([]);
  const [filteredNominations, setFilteredNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");
  const [fieldFilter, setFieldFilter] = useState("all");
  const [participationTypeFilter, setParticipationTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState(null);

  const [editingNomination, setEditingNomination] = useState(null);
  const [viewingNomination, setViewingNomination] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const [activeTab, setActiveTab] = useState("nominations");

  /* ------------------ Load Data ------------------ */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAdminNominations(token);
        setNominations(data);
      } catch (err) {
        setError(err.message || "Failed to load nominations");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  /* ------------------ Filter ------------------ */
  useEffect(() => {
    let filtered = [...nominations];

    if (statusFilter !== "all") {
      filtered = filtered.filter((n) => (n.status || "nominated") === statusFilter);
    }

    if (fieldFilter !== "all") {
      filtered = filtered.filter((n) => n.field === fieldFilter);
    }

    if (participationTypeFilter !== "all") {
      filtered = filtered.filter((n) => n.participationType === participationTypeFilter);
    }

    if (locationFilter !== "all") {
      filtered = filtered.filter((n) =>
        Array.isArray(n.preferredLocation) && n.preferredLocation.includes(locationFilter)
      );
    }

    setFilteredNominations(filtered);
  }, [nominations, statusFilter, fieldFilter, participationTypeFilter, locationFilter]);

  const paymentSummary = useMemo(() => {
    const summary = {
      total: nominations.length,
      not_paid: 0,
      initial_paid: 0,
      paid: 0,
      not_interested: 0,
    };
    nominations.forEach((n) => {
      const key = n.paymentStatus || "not_paid";
      if (summary[key] != null) summary[key] += 1;
    });
    return summary;
  }, [nominations]);

  const dailyStats = useMemo(() => {
    const statsMap = {};
    nominations.forEach((n) => {
      const dateStr = new Date(n.createdAt).toLocaleDateString("en-GB"); // DD/MM/YYYY
      if (!statsMap[dateStr]) {
        statsMap[dateStr] = {
          date: dateStr,
          total: 0,
          paid: 0,
          initial_paid: 0,
          not_paid: 0,
          rawDate: new Date(n.createdAt), // For sorting
        };
      }
      statsMap[dateStr].total += 1;
      const pStatus = n.paymentStatus || "not_paid";
      if (statsMap[dateStr][pStatus] != null) {
        statsMap[dateStr][pStatus] += 1;
      }
    });

    // Sort by date descending
    return Object.values(statsMap).sort((a, b) => b.rawDate - a.rawDate);
  }, [nominations]);

  /* ------------------ Status Change ------------------ */
  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);
      const updated = await updateNominationStatus(id, status, token);
      setNominations((prev) =>
        prev.map((n) => (n._id === id ? { ...n, ...updated } : n))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  /* ------------------ Edit ------------------ */
  const handleEdit = (n) => {
    setEditingNomination(n);
    setEditForm({ ...n });
  };

  const handleSaveEdit = async () => {
    try {
      setUpdatingId(editingNomination._id);
      const updated = await updateNomination(
        editingNomination._id,
        editForm,
        token
      );
      setNominations((prev) =>
        prev.map((n) => (n._id === updated._id ? updated : n))
      );
      setEditingNomination(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  /* ------------------ Delete ------------------ */
  const handleDelete = async () => {
    try {
      setUpdatingId(deleteConfirmId);
      await deleteNomination(deleteConfirmId, token);
      setNominations((prev) =>
        prev.filter((n) => n._id !== deleteConfirmId)
      );
      setDeleteConfirmId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const inputClass =
    "w-full rounded-lg bg-gradient-to-br from-[#23251c]/60 to-[#141015]/80 border border-[#d4af3790]/50 px-3 py-2 text-sm text-white shadow focus:(outline-none ring-2 ring-[#d4af37]/60) placeholder:text-[#d1c894]/60 font-semibold transition";

  /* ================== HELPERS ================== */
  const renderNominationsTable = () => (
    <div className="overflow-x-auto max-h-[90vh] border border-[#eaca5f80] rounded-2xl bg-gradient-to-tr from-[#23201aee] via-[#2b2313cf] to-[#10161aee] shadow-xl shadow-[#d4af3722] backdrop-blur relative">
      <table className="min-w-[1600px] w-full text-xs border-separate border-spacing-0">
        <thead className="sticky top-0 z-40">
          <tr className="bg-gradient-to-r from-[#231e09] to-[#2e2612] text-[#f2eab6] border-0">
            <th className="px-4 py-3 text-left bg-inherit">Award</th>
            <th className="px-4 py-3 text-left">Participation</th>
            <th className="px-4 py-3 text-left">Field</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Mobile</th>
            <th className="px-4 py-3 text-left">Nominee</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Payment</th>
            <th className="px-4 py-3 text-left">Amount</th>
            <th className="px-4 py-3 text-left">Org Head</th>
            <th className="px-4 py-3 text-left">Contact</th>
            <th className="px-4 py-3 text-left">Business</th>
            <th className="px-4 py-3 text-left">Address</th>
            <th className="px-4 py-3 text-left">Remarks</th>
            <th className="px-4 py-3 text-left">Admin Remark</th>
            <th className="px-4 py-3 text-left">Submitted By</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 sticky right-0 bg-[#18130e] text-[#fae36f] z-20 w-[110px] rounded-tr-2xl shadow-xl">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredNominations.map((n, idx) => (
            <tr
              key={n._id}
              className={`transition border-t border-[#eaca5f22] h-[72px] ${idx % 2 === 0
                ? "bg-gradient-to-r from-[#14100a]/60 to-[#2a271ed9]"
                : "bg-gradient-to-r from-[#211c12be] to-[#35341be6]"
                }`}
            >
              <td className="px-4 py-4 font-bold text-[#ffb400] whitespace-nowrap">
                {n.awardName || getAwardName()}
              </td>
              <td className="px-4 py-4 font-semibold text-[#fee5af]">
                {n.participationType === "nominated as award" ? "🏆 Award" :
                  n.participationType === "attend as speaker" ? "🎤 Speaker" :
                    n.participationType === "attend as exhibitor" ? "🎪 Exhibitor" :
                      n.participationType === "attend as sponsor" ? "💎 Sponsor" : n.participationType}
              </td>
              <td className="px-4 py-4 font-semibold text-blue-300">
                {n.field || <span className="text-gray-500">—</span>}
              </td>
              <td className="px-4 py-4">
                {n.participationType === "nominated as award" ? (
                  <>
                    <div className="font-semibold text-yellow-300">{n.assignedCategory || n.category}</div>
                    <div className="text-[10px] text-gray-400 opacity-70">{n.subCategory}</div>
                  </>
                ) : (
                  <span className="text-gray-500 italic">N/A</span>
                )}
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-col gap-0.5">
                  {[n.mobile, n.contactMobile, n.orgHeadMobile].filter(Boolean).map((phone, i) => (
                    <span key={i} className="text-[#a4fbd2] font-mono text-[11px] whitespace-nowrap">
                      {phone}
                    </span>
                  ))}
                  {![n.mobile, n.contactMobile, n.orgHeadMobile].some(Boolean) && (
                    <span className="text-gray-500">—</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="font-semibold text-lg text-[#d4af37]">{n.nomineeName}</div>
                <div className="text-gray-300 text-[11px] font-mono">
                  {n.organization}
                </div>
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={n.status} />
                <select
                  value={n.status || "nominated"}
                  onChange={(e) => handleStatusChange(n._id, e.target.value)}
                  className="mt-1 w-full rounded bg-[#282313]/60 border border-[#fae36f80] px-1 py-1 text-[11px] text-[#d4af37]"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-4">
                <select
                  value={n.paymentStatus || "not_paid"}
                  onChange={(e) =>
                    setNominations((prev) =>
                      prev.map((row) =>
                        row._id === n._id
                          ? { ...row, paymentStatus: e.target.value }
                          : row
                      )
                    )
                  }
                  onBlur={() =>
                    updateNomination(n._id, { paymentStatus: n.paymentStatus }, token)
                  }
                  className="w-full rounded bg-[#282313]/60 border border-[#fae36f80] px-1 py-1 text-[11px] text-[#d6ae37]"
                >
                  {PAYMENT_STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-4 text-[11px] text-[#e3cd96] font-semibold">
                {n.amount || <span className="text-gray-400 italic">—</span>}
              </td>
              <td className="px-4 py-4 text-[11px]">
                {n.orgHeadName}
                <br />
                <span className="text-gray-400">{n.orgHeadEmail}</span>
              </td>
              <td className="px-4 py-4 text-[11px]">
                {n.contactName}
                <br />
                <span className="text-gray-400">{n.contactEmail}</span>
              </td>
              <td className="px-4 py-4 text-[11px]">
                <span className="font-semibold">Website:</span>{" "}
                {n.website || "-"}
                <br />
                <span className="font-semibold">Turnover:</span>{" "}
                {n.turnover || "-"}
              </td>
              <td className="px-4 py-4 text-[11px]">
                {n.city}, {n.state}
              </td>
              <td className="px-4 py-4 max-w-xs">
                <div className="line-clamp-3">{n.remarks}</div>
              </td>
              <td className="px-4 py-4 max-w-xs text-[11px]">
                <div className="line-clamp-3">
                  {n.adminRemark || <span className="text-gray-500">—</span>}
                </div>
              </td>
              <td className="px-4 py-4 text-[11px]">
                {n.user?.email}
              </td>
              <td className="px-4 py-4 text-[11px] whitespace-nowrap">
                {new Date(n.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-4 sticky right-0 bg-gradient-to-l from-[#18130e] to-[#1f1810ac] z-20 shadow-lg rounded-tr-xl rounded-br-xl">
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewingNomination(n)}
                    className="w-8 h-8 flex items-center justify-center border border-[#eaca5f]/50 bg-[#1e1a0d]/60 text-[#fae36f] rounded-full shadow transition hover:bg-gradient-to-tr hover:from-[#fbe399] hover:to-[#ceb655] hover:text-[#221d10]"
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  {n.pdfUrl && (
                    <a
                      href={n.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center border border-blue-400/50 bg-[#101b23]/60 text-blue-400 rounded-full shadow transition hover:bg-gradient-to-tr hover:from-[#99c8fb] hover:to-[#3a86ce] hover:text-[#101b23]"
                      title="View PDF"
                    >
                      <span className="text-sm font-bold">PDF</span>
                    </a>
                  )}
                  <button
                    onClick={() => handleEdit(n)}
                    className="w-8 h-8 flex items-center justify-center border border-[#d4af37]/70 bg-[#2b2512]/70 text-[#d4af37] rounded-full shadow transition hover:bg-gradient-to-tr hover:from-[#fbe399] hover:to-[#ceb655] hover:text-[#221d10]"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(n._id)}
                    className="w-8 h-8 flex items-center justify-center border border-red-400/50 bg-[#231010]/60 text-red-400 rounded-full shadow transition hover:bg-gradient-to-tr hover:from-[#fbad99] hover:to-[#ce5a3a] hover:text-[#321010]"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="absolute pointer-events-none left-0 top-0 h-full w-8 z-30 bg-gradient-to-r from-[#13110a] via-[#18130e00] to-transparent" />
      <div className="absolute pointer-events-none right-0 top-0 h-full w-8 z-30 bg-gradient-to-l from-[#13110a] via-[#18130e00] to-transparent" />
    </div>
  );

  const renderStatusTab = () => (
    <div className="overflow-x-auto max-h-[90vh] border border-[#eaca5f80] rounded-2xl bg-gradient-to-tr from-[#2b2313cf] via-[#23201aee] to-[#10161aee] shadow-xl shadow-[#d4af3722] backdrop-blur relative">
      <table className="min-w-[1100px] w-full text-xs border-separate border-spacing-0">
        <thead className="sticky top-0 z-40">
          <tr className="bg-gradient-to-r from-[#231e09] to-[#2e2612] text-[#f2eab6]">
            <th className="px-4 py-3 text-left rounded-tl-2xl bg-inherit">Award</th>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Mobile</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Nomination Status (User View)</th>
            <th className="px-4 py-3 text-left">Payment Status</th>
            <th className="px-4 py-3 text-left">Amount</th>
            <th className="px-4 py-3 text-left rounded-tr-2xl">Remark</th>
          </tr>
        </thead>
        <tbody>
          {nominations.map((n, idx) => {
            const userLabel =
              n.status === "in_progress"
                ? "Shortlisted"
                : STATUS_OPTIONS.find((s) => s.value === n.status)?.label ||
                "Nomination Received";
            return (
              <tr
                key={n._id}
                className={`border-t border-[#eaca5f22] h-[60px] ${idx % 2 === 0
                  ? "bg-gradient-to-r from-[#18130a]/60 to-[#352a1eae]"
                  : "bg-gradient-to-r from-[#242108be] to-[#352a1eda]"
                  }`}
              >
                <td className="px-4 py-3 font-bold text-[#ffb400]">
                  {n.awardName || getAwardName()}
                </td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-lg text-[#eed99b]">{n.nomineeName}</div>
                </td>
                <td className="px-4 py-3 text-[11px]">
                  {n.contactMobile || n.orgHeadMobile || "—"}
                </td>
                <td className="px-4 py-3 text-[11px]">
                  {n.user?.email || n.contactEmail || "—"}
                </td>
                <td className="px-4 py-3 text-[11px]">{userLabel}</td>
                <td className="px-4 py-3 text-[11px]">
                  {PAYMENT_STATUS_OPTIONS.find(
                    (s) => s.value === (n.paymentStatus || "not_paid")
                  )?.label || "Not Paid"}
                </td>
                <td className="px-4 py-3 text-[11px]">
                  {n.amount || "—"}
                </td>
                <td className="px-4 py-3 text-[11px]">
                  {n.adminRemark || "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="absolute pointer-events-none left-0 top-0 h-full w-8 z-30 bg-gradient-to-r from-[#13110a] via-[#18130e00] to-transparent" />
      <div className="absolute pointer-events-none right-0 top-0 h-full w-8 z-30 bg-gradient-to-l from-[#13110a] via-[#18130e00] to-transparent" />
    </div>
  );

  const renderUsersTab = () => {
    const byUser = new Map();
    nominations.forEach((n) => {
      if (!n.user?.email) return;
      const key = n.user.email;
      const existing = byUser.get(key) || {
        email: n.user.email,
        count: 0,
        latestStatus: n.status,
        latestAt: n.createdAt,
      };
      existing.count += 1;
      if (!existing.latestAt || new Date(n.createdAt) > new Date(existing.latestAt)) {
        existing.latestAt = n.createdAt;
        existing.latestStatus = n.status;
      }
      byUser.set(key, existing);
    });
    const rows = Array.from(byUser.values());

    return (
      <div className="overflow-x-auto max-h-[90vh] border border-[#eaca5f80] rounded-2xl bg-gradient-to-tr from-[#23201aee] via-[#2b2313cf] to-[#10161aee] shadow-xl shadow-[#d4af3722] backdrop-blur relative">
        <table className="min-w-[800px] w-full text-xs border-separate border-spacing-0">
          <thead className="sticky top-0 z-40">
            <tr className="bg-gradient-to-r from-[#231e09] to-[#2e2612] text-[#f2eab6]">
              <th className="px-4 py-3 text-left rounded-tl-2xl bg-inherit">Email</th>
              <th className="px-4 py-3 text-left">Total Nominations</th>
              <th className="px-4 py-3 text-left">Latest Status</th>
              <th className="px-4 py-3 text-left rounded-tr-2xl">Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.email}
                className={`border-t border-[#eaca5f22] h-[52px] ${idx % 2 === 0
                  ? "bg-gradient-to-r from-[#202012]/60 to-[#392b1eae]"
                  : "bg-gradient-to-r from-[#23201abe] to-[#463a1eda]"
                  }`}
              >
                <td className="px-4 py-3 font-semibold text-[#fee5af]">{row.email}</td>
                <td className="px-4 py-3">{row.count}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.latestStatus} />
                </td>
                <td className="px-4 py-3 text-[11px]">
                  {row.latestAt ? new Date(row.latestAt).toLocaleString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="absolute pointer-events-none left-0 top-0 h-full w-8 z-30 bg-gradient-to-r from-[#13110a] via-[#18130e00] to-transparent" />
        <div className="absolute pointer-events-none right-0 top-0 h-full w-8 z-30 bg-gradient-to-l from-[#13110a] via-[#18130e00] to-transparent" />
      </div>
    );
  };

  const renderAnalyticsTab = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-[#1a160a]/80 to-[#2a2313]/60 border border-[#d4af37]/30 p-6 rounded-[1.5rem] shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#d4af37]/70 mb-2">Total Registrations</p>
          <div className="flex items-end justify-between">
            <h4 className="text-5xl font-black text-white">{paymentSummary.total}</h4>
            <BarChart3 className="text-[#d4af37]/20 w-12 h-12" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1a160a]/80 to-[#2a2313]/60 border border-green-500/20 p-6 rounded-[1.5rem] shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-400/70 mb-2">Total Paid</p>
          <div className="flex items-end justify-between">
            <h4 className="text-5xl font-black text-white">{paymentSummary.paid}</h4>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <span className="text-green-400 font-black text-xl">₹</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1a160a]/80 to-[#2a2313]/60 border border-blue-500/20 p-6 rounded-[1.5rem] shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400/70 mb-2">Initial Payments</p>
          <div className="flex items-end justify-between">
            <h4 className="text-5xl font-black text-white">{paymentSummary.initial_paid}</h4>
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <span className="text-blue-400 font-black text-xl">P</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1a160a]/80 to-[#2a2313]/60 border border-red-500/20 p-6 rounded-[1.5rem] shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400/70 mb-2">Pending / Not Paid</p>
          <div className="flex items-end justify-between">
            <h4 className="text-5xl font-black text-white">{paymentSummary.not_paid}</h4>
            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <span className="text-red-400 font-black text-xl">!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Date-wise Report Table */}
      <div className="bg-gradient-to-tr from-[#1a160a]/80 via-[#23201a]/60 to-[#10161a]/80 border border-[#d4af37]/20 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-xl font-black text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#d4af37] flex items-center justify-center shadow-lg">
              <BarChart3 className="text-black" size={18} />
            </div>
            Daily Registration Report
          </h3>
          <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.3em] bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/20">
            Real-time Updates
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
                <th className="px-8 py-4">Registration Date</th>
                <th className="px-8 py-4">Daily Total</th>
                <th className="px-8 py-4">Paid</th>
                <th className="px-8 py-4">Partial Paid</th>
                <th className="px-8 py-4">Pending</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {dailyStats.length > 0 ? (
                dailyStats.map((stat, idx) => (
                  <tr
                    key={stat.date}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-8 py-5">
                      <span className="text-[#fae36f] font-black tracking-tighter text-lg">{stat.date}</span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-white">{stat.total}</span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Registrations</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      {stat.paid > 0 ? (
                        <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center w-fit gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          {stat.paid} Paid
                        </span>
                      ) : (
                        <span className="text-gray-600 font-bold text-xs">0 Paid</span>
                      )}
                    </td>
                    <td className="px-8 py-5">
                      {stat.initial_paid > 0 ? (
                        <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center w-fit gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          {stat.initial_paid} Partial
                        </span>
                      ) : (
                        <span className="text-gray-600 font-bold text-xs">0 Partial</span>
                      )}
                    </td>
                    <td className="px-8 py-5">
                      {stat.not_paid > 0 ? (
                        <span className="bg-red-500/10 text-red-300 border border-red-500/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center w-fit gap-2 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          {stat.not_paid} Pending
                        </span>
                      ) : (
                        <span className="text-gray-600 font-bold text-xs">0 Pending</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-gray-500">
                      <BarChart3 size={48} className="opacity-20" />
                      <p className="font-bold text-sm uppercase tracking-[0.2em]">No analytics data available yet</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAdminsTab = () => (
    <div className="border border-[#eaca5f80] rounded-2xl bg-gradient-to-tr from-[#23201aee] to-[#18130e] p-8 text-md text-[#e9e5ca] shadow-xl shadow-[#d4af3722] backdrop-blur-[3px]">
      <h2 className="text-2xl font-semibold mb-3 text-[#ffe9a1] flex items-center gap-2">
        <ShieldCheck className="inline text-[#ffe36d]" size={22} /> Admin Section
      </h2>
      <p className="mb-2 text-[#e9e3be]">
        Access administrative controls and oversee the nomination lifecycle.
      </p>
      <ul className="list-disc list-inside space-y-1 text-[13px] text-[#c4b889]">
        <li>
          <span className="font-semibold text-[#e1c36a]">Nominations</span>: View and filter all incoming submissions.
        </li>
        <li>
          <span className="font-semibold text-[#e1c36a]">Status</span>: Track payment and evaluation progress.
        </li>
      </ul>
    </div>
  );

  /* ================== UI ================== */
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#18130d] via-[#241b0a] to-[#11161c] text-white flex flex-col">
      {/* Top golden bar - optional, keeping as accent */}
      <div
        className="h-2 shadow-lg z-30 relative"
        style={{
          background: goldGrad,
          boxShadow: "0 3px 24px 6px #bb970f44, 0 1px 0 0 #d3b94f55",
        }}
      />

      <div className="flex flex-1">
        {/* Sidebar - Fixed to the left side */}
        <aside className="w-72 shrink-0 bg-[#16120b] border-r border-[#edd14830] shadow-2xl z-20 sticky top-0 h-screen overflow-y-auto custom-scrollbar">
          <div className="p-6 space-y-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-[#fbe376]" size={28} />
              <span className="font-bold text-xl tracking-wider gradient-text bg-gradient-to-r from-[#d2c44c] to-[#eddb92] bg-clip-text text-transparent">
                Admin Panel
              </span>
            </div>

            <div className="text-[13px] text-[#e8e2c7] space-y-2 bg-[#262002]/40 p-4 rounded-xl border border-[#edd14820]">
              <div className="flex justify-between">
                <span>Total Nominations</span>
                <span className="text-[#dbbe4f] font-bold">
                  {paymentSummary.total}
                </span>
              </div>
              <div className="h-px bg-[#edd14830] my-1" />
              <div className="flex justify-between opacity-80">
                <span>Completed</span>
                <span>{paymentSummary.paid}</span>
              </div>
              <div className="flex justify-between opacity-80">
                <span>Pending</span>
                <span>{paymentSummary.not_paid}</span>
              </div>
            </div>

            <nav className="space-y-2 font-medium">
              {[
                { id: "nominations", label: "Nominations", icon: "🏆" },
                { id: "editions", label: "Previous Editions", icon: "🖼️" },
                { id: "upcoming", label: "Upcoming Awards", icon: "⭐" },
                { id: "status", label: "Status & Payment", icon: "💸" },
                { id: "analytics", label: "Daily Analytics", icon: "📊" },
                { id: "users", label: "Registered Users", icon: "👤" },
                { id: "admins", label: "Admin Settings", icon: "🛡️" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-semibold tracking-wide flex items-center gap-3 ${activeTab === tab.id
                    ? "bg-gradient-to-r from-[#ffe9a1] to-[#d4af37] text-black shadow-lg translate-x-1"
                    : "text-[#fbe6b8] hover:bg-[#ffffff0d] hover:text-[#ffe090]"
                    }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main content - Scrollable */}
        <div className="flex-1 min-w-0 bg-[#0f0c08]/50 p-6 md:p-10">
          <header className="mb-10">
            <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#ffe78c] via-[#c09a21] to-[#fae36e] bg-clip-text text-transparent drop-shadow-sm tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-[#eddfae] text-lg font-medium opacity-80">
              Manage nominations and user pipeline
            </p>
          </header>

          {activeTab !== "editions" && activeTab !== "upcoming" && (
            <div className="flex flex-wrap items-center gap-4 mb-8 bg-[#1a160a]/40 p-4 rounded-2xl border border-[#ffffff0d] backdrop-blur-md">
              <span className="text-[#c7ba7e] font-semibold text-sm uppercase tracking-wider">
                Filter Status:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#272316] border border-[#edd14850] rounded-lg px-4 py-2 text-[#fbe376] text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition shadow-inner"
              >
                {STATUS_FILTER_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>

              <span className="text-[#c7ba7e] font-semibold text-sm uppercase tracking-wider ml-2">
                Type:
              </span>
              <select
                value={participationTypeFilter}
                onChange={(e) => setParticipationTypeFilter(e.target.value)}
                className="bg-[#272316] border border-[#edd14850] rounded-lg px-4 py-2 text-[#fbe376] text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition shadow-inner"
              >
                {PARTICIPATION_TYPE_FILTER_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>

              <span className="text-[#c7ba7e] font-semibold text-sm uppercase tracking-wider ml-2">
                Location:
              </span>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="bg-[#272316] border border-[#edd14850] rounded-lg px-4 py-2 text-[#fbe376] text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition shadow-inner"
              >
                {LOCATION_FILTER_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>

              <span className="text-[#c7ba7e] font-semibold text-sm uppercase tracking-wider ml-2">
                Field:
              </span>
              <select
                value={fieldFilter}
                onChange={(e) => setFieldFilter(e.target.value)}
                className="bg-[#272316] border border-[#edd14850] rounded-lg px-4 py-2 text-[#fbe376] text-sm focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition shadow-inner"
              >
                {FIELD_FILTER_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <span className="text-xs text-[#ffd975] font-mono bg-[#d4af37]/10 px-3 py-1 rounded-full border border-[#d4af37]/20">
                {filteredNominations.length} records
              </span>
              {error && (
                <span className="ml-auto text-sm text-red-400 bg-red-900/20 px-3 py-1 rounded border border-red-500/30">
                  Error: {error}
                </span>
              )}
              {loading && (
                <span className="ml-auto text-sm flex items-center gap-2 text-yellow-300">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                  Loading data...
                </span>
              )}
            </div>
          )}

          <div className="w-full">
            {activeTab === "nominations" && renderNominationsTable()}
            {activeTab === "editions" && <AdminEditionsTab token={token} />}
            {activeTab === "upcoming" && <AdminUpcomingAwardsTab />}
            {activeTab === "status" && renderStatusTab()}
            {activeTab === "analytics" && renderAnalyticsTab()}
            {activeTab === "users" && renderUsersTab()}
            {activeTab === "admins" && renderAdminsTab()}
          </div>
        </div>
      </div>

      {/* ================== VIEW DETAILS MODAL ================== */}
      {viewingNomination && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] backdrop-blur-md">
          <div className="bg-gradient-to-tr from-[#2a261a] via-[#181310] to-[#12161a] border-2 border-[#d4af37]/60 shadow-[0_0_50px_rgba(212,175,55,0.3)] p-8 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar relative">

            {/* Close Button */}
            <button
              onClick={() => setViewingNomination(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-[#fae36f] transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8a6d1a] flex items-center justify-center shadow-lg">
                <Crown className="text-black" size={24} />
              </div>
              <div>
                <h2 className="text-3xl font-black text-white tracking-tight">Nomination Profile</h2>
                <p className="text-[#d4af37] font-bold text-sm tracking-[0.2em] uppercase">{viewingNomination.awardName || getAwardName()}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Main Info Column */}
              <div className="md:col-span-2 space-y-6">
                <section className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-4">Core Identification</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <DetailItem label="Nominee Name" value={viewingNomination.nomineeName} />
                    <DetailItem label="Organization" value={viewingNomination.organization} />
                    <DetailItem label="Field (Classification)" value={viewingNomination.field} badge />
                    <DetailItem label="Participation Role" value={viewingNomination.participationType} />
                    <DetailItem label="Category" value={viewingNomination.category} />
                    <DetailItem label="Assigned Category" value={viewingNomination.assignedCategory} isWarning />
                  </div>
                </section>

                <section className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-4">Contact & Business Details</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <DetailItem label="Org Head" value={`${viewingNomination.orgHeadName} (${viewingNomination.orgHeadDesignation || 'N/A'})`} />
                    <DetailItem label="Org Head Mobile" value={viewingNomination.orgHeadMobile} />
                    <DetailItem label="Org Head Email" value={viewingNomination.orgHeadEmail} isEmail />
                    <DetailItem label="Point of Contact" value={`${viewingNomination.contactName} (${viewingNomination.contactDesignation || 'N/A'})`} />
                    <DetailItem label="Contact Mobile" value={viewingNomination.contactMobile} />
                    <DetailItem label="Contact Email" value={viewingNomination.contactEmail} isEmail />
                    <DetailItem label="Annual Turnover" value={viewingNomination.turnover} />
                  </div>
                </section>

                <section className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-4">Social Media Presence</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem label="Website" value={viewingNomination.website} isLink />
                    <DetailItem label="Facebook" value={viewingNomination.facebook} isLink />
                    <DetailItem label="Instagram" value={viewingNomination.instagram} isLink />
                    <DetailItem label="YouTube" value={viewingNomination.youtube} isLink />
                  </div>
                </section>

                <section className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-4">Location & Address</h3>
                  <div className="text-lg text-white font-medium">
                    {viewingNomination.street}, {viewingNomination.city}, {viewingNomination.state} - {viewingNomination.zip}
                  </div>
                  <div className="mt-2 text-sm text-gray-400">Preferred Presentation: <span className="text-[#fae36f] font-bold">{viewingNomination.preferredLocation}</span></div>
                </section>
              </div>

              {/* Sidebar Info Column */}
              <div className="space-y-6">
                <section className="bg-[#d4af37]/5 rounded-2xl p-6 border border-[#d4af37]/20">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#d4af37] mb-4">Status & Payment</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] uppercase font-black text-gray-500 block mb-1">Nomination Status</label>
                      <StatusBadge status={viewingNomination.status} />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-black text-gray-500 block mb-1">Payment Status</label>
                      <span className={`text-sm font-bold ${viewingNomination.paymentStatus === 'paid' ? 'text-green-400' : 'text-orange-400'}`}>
                        {PAYMENT_STATUS_OPTIONS.find(s => s.value === viewingNomination.paymentStatus)?.label || 'Pending'}
                      </span>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-black text-gray-500 block mb-1">Agreed Amount</label>
                      <span className="text-2xl font-black text-white">{viewingNomination.amount || 'N/A'}</span>
                    </div>
                    {viewingNomination.pdfUrl && (
                      <div className="pt-2">
                        <label className="text-[10px] uppercase font-black text-gray-500 block mb-2">Support Document</label>
                        <a
                          href={viewingNomination.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/30 px-4 py-2 rounded-xl text-[#fae36f] hover:bg-[#d4af37]/30 transition"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          <span className="text-xs font-black uppercase">View/Download PDF</span>
                        </a>
                      </div>
                    )}
                  </div>
                </section>

                <section className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Submission Intel</h3>
                  <div className="space-y-3">
                    <DetailItem label="Submitted On" value={new Date(viewingNomination.createdAt).toLocaleString()} />
                    <DetailItem label="Registered User" value={viewingNomination.user?.email} isEmail />
                  </div>
                </section>

                <section className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Remarks</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] uppercase font-black text-gray-500 block mb-1">User Remarks</label>
                      <p className="text-sm text-gray-300 italic">"{viewingNomination.remarks || 'No remarks provided'}"</p>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-black text-[#d4af37] block mb-1">Admin Internal Remark</label>
                      <p className="text-sm text-[#fae36f] font-semibold">{viewingNomination.adminRemark || '—'}</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setViewingNomination(null)}
                className="bg-gradient-to-r from-[#d4af37] to-[#8a6d1a] text-black px-12 py-3 rounded-xl font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-transform"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================== EDIT MODAL ================== */}
      {editingNomination && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] backdrop-blur-sm">
          <div className="bg-gradient-to-tr from-[#2e2b18] via-[#18130e] to-[#18130e] border-2 border-[#eaca5faa] shadow-2xl shadow-[#d4af3780] p-8 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">

            {/* Close Button */}
            <button
              onClick={() => setEditingNomination(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-[#fae36f] transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <h2 className="text-2xl font-bold mb-4 text-[#ffe6a3]">Edit Nomination Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-xs text-[#f6e589] font-semibold">Award Name (Summit/Event)</label>
                <input
                  className={inputClass}
                  value={editForm.awardName || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, awardName: e.target.value })
                  }
                  placeholder="e.g. India Excellence Awards 2026"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Nominee Name</label>
                <input
                  className={inputClass}
                  value={editForm.nomineeName || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, nomineeName: e.target.value })
                  }
                  placeholder="Enter nominee name"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Award Classification (Field)</label>
                <select
                  className={inputClass}
                  value={editForm.field || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, field: e.target.value })
                  }
                >
                  <option value="">Select Field</option>
                  {FIELD_FILTER_OPTIONS.filter(o => o.value !== "all").map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Organization</label>
                <input
                  className={inputClass}
                  value={editForm.organization || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, organization: e.target.value })
                  }
                  placeholder="Organization name"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Participation Type</label>
                <input
                  className={inputClass}
                  value={editForm.participationType || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      participationType: e.target.value,
                    })
                  }
                  placeholder="Type"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">
                  Category (User Selected)
                </label>
                <input
                  className={inputClass}
                  value={editForm.category || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                  placeholder="Category"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Sub-Category</label>
                <input
                  className={inputClass}
                  value={editForm.subCategory || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, subCategory: e.target.value })
                  }
                  placeholder="Sub-Category"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Other Sub-Category (if any)</label>
                <input
                  className={inputClass}
                  value={editForm.otherSubCategory || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, otherSubCategory: e.target.value })
                  }
                  placeholder="Other Sub-Category"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Preferred Event Location</label>
                <select
                  className={inputClass}
                  value={editForm.preferredLocation || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, preferredLocation: e.target.value })
                  }
                >
                  <option value="">Select Location</option>
                  {LOCATION_FILTER_OPTIONS.filter(o => o.value !== "all").map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">
                  Assigned Category (Admin Final)
                </label>
                <input
                  className={inputClass}
                  value={editForm.assignedCategory || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      assignedCategory: e.target.value,
                    })
                  }
                  placeholder="Assigned Category"
                />
              </div>
              <div>
                <label className="text-xs text-[#f6e589] font-semibold">Agreed Amount</label>
                <input
                  className={inputClass}
                  placeholder="e.g. ₹25,000"
                  value={editForm.amount || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, amount: e.target.value })
                  }
                />
              </div>
              <div className="md:col-span-2 h-px bg-[#d4af37]/20 my-2" />

              <div>
                <label className="text-xs text-[#f6e589] font-semibold font-black tracking-widest uppercase mb-1 block opacity-80">Org Head Details</label>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-gray-500 font-bold uppercase">Name</label>
                    <input
                      className={inputClass}
                      value={editForm.orgHeadName || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, orgHeadName: e.target.value })
                      }
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 font-bold uppercase">Designation</label>
                    <input
                      className={inputClass}
                      value={editForm.orgHeadDesignation || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, orgHeadDesignation: e.target.value })
                      }
                      placeholder="Designation"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 font-bold uppercase">Email</label>
                    <input
                      className={inputClass}
                      value={editForm.orgHeadEmail || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, orgHeadEmail: e.target.value })
                      }
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 font-bold uppercase">Mobile</label>
                    <input
                      className={inputClass}
                      value={editForm.orgHeadMobile || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, orgHeadMobile: e.target.value })
                      }
                      placeholder="Mobile"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs text-[#f6e589] font-semibold font-black tracking-widest uppercase mb-1 block opacity-80">Primary Contact Details</label>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] text-gray-500 font-bold uppercase">Name</label>
                    <input
                      className={inputClass}
                      value={editForm.contactName || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, contactName: e.target.value })
                      }
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 font-bold uppercase">Designation</label>
                    <input
                      className={inputClass}
                      value={editForm.contactDesignation || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, contactDesignation: e.target.value })
                      }
                      placeholder="Designation"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 font-bold uppercase">Email</label>
                    <input
                      className={inputClass}
                      value={editForm.contactEmail || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, contactEmail: e.target.value })
                      }
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500 font-bold uppercase">Mobile</label>
                    <input
                      className={inputClass}
                      value={editForm.contactMobile || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, contactMobile: e.target.value })
                      }
                      placeholder="Mobile"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 h-px bg-[#d4af37]/20 my-2" />

              <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <label className="text-xs text-[#f6e589] font-semibold">Street Address</label>
                  <input
                    className={inputClass}
                    value={editForm.street || ""}
                    onChange={(e) => setEditForm({ ...editForm, street: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs text-[#f6e589] font-semibold">City</label>
                  <input
                    className={inputClass}
                    value={editForm.city || ""}
                    onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs text-[#f6e589] font-semibold">State</label>
                  <input
                    className={inputClass}
                    value={editForm.state || ""}
                    onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-xs text-[#f6e589] font-semibold">Zip Code</label>
                  <input
                    className={inputClass}
                    value={editForm.zip || ""}
                    onChange={(e) => setEditForm({ ...editForm, zip: e.target.value })}
                  />
                </div>
              </div>

              <div className="md:col-span-2 h-px bg-[#d4af37]/20 my-2" />

              <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs text-blue-200 font-semibold italic">Website</label>
                  <input
                    className={inputClass}
                    value={editForm.website || ""}
                    onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="text-xs text-blue-400 font-semibold italic">Facebook</label>
                  <input
                    className={inputClass}
                    value={editForm.facebook || ""}
                    onChange={(e) => setEditForm({ ...editForm, facebook: e.target.value })}
                    placeholder="Profile URL"
                  />
                </div>
                <div>
                  <label className="text-xs text-pink-400 font-semibold italic">Instagram</label>
                  <input
                    className={inputClass}
                    value={editForm.instagram || ""}
                    onChange={(e) => setEditForm({ ...editForm, instagram: e.target.value })}
                    placeholder="Profile URL"
                  />
                </div>
                <div>
                  <label className="text-xs text-red-500 font-semibold italic">YouTube</label>
                  <input
                    className={inputClass}
                    value={editForm.youtube || ""}
                    onChange={(e) => setEditForm({ ...editForm, youtube: e.target.value })}
                    placeholder="Channel URL"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs text-[#f6e589] font-semibold">
                  Public Remarks (User also sees)
                </label>
                <textarea
                  className={`${inputClass} min-h-[70px]`}
                  value={editForm.remarks || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, remarks: e.target.value })
                  }
                  placeholder="Remark for user (visible)"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-[#f6e589] font-semibold">
                  Admin Remark (Internal only)
                </label>
                <textarea
                  className={`${inputClass} min-h-[70px]`}
                  value={editForm.adminRemark || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, adminRemark: e.target.value })
                  }
                  placeholder="Only for admin view"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setEditingNomination(null)}
                className="px-5 py-2.5 text-md font-medium text-[#f4e3a6] bg-gradient-to-r from-[#19140b]/80 to-[#0e0b08]/70 border border-[#bba44b80] rounded-lg shadow hover:bg-[#191400]/80 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-gradient-to-r from-[#ecd26c] to-[#d49d28] text-[#232012] border border-[#d4af37a8] px-8 py-2.5 rounded-lg text-md font-extrabold shadow-lg tracking-wider hover:from-[#fdf0bc] hover:to-[#fae36e] transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================== DELETE MODAL ================== */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-[#13110aee] backdrop-blur-[1.5px] flex items-center justify-center z-[9999]">
          <div className="bg-gradient-to-br from-[#292112f6] to-[#18130e] border border-[#edcc68be] shadow-2xl rounded-2xl max-w-md w-full min-h-[220px] flex flex-col justify-between py-10 px-8 gap-2">
            <h2 className="text-2xl font-semibold mb-2 text-[#fae36f] flex gap-2 items-center">
              <Trash2 className="text-red-400" size={26} /> Delete Nomination?
            </h2>
            <p className="text-base text-[#ffe8a7] mb-4">
              This action cannot be undone.<br />
              Are you sure you want to delete this nomination?
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
                className="bg-gradient-to-tr from-[#f43e2c] to-[#7a1b0a] text-[#ffebd2] px-8 py-2 rounded-lg font-extrabold shadow-md hover:from-[#d42121] hover:to-[#772014]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
