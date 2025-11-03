import React, { useMemo, useState } from "react";
import Navbar from "../Navbar/navbar";
import "./home.css";

const defaultComplaints = [
  {
    id: 1,
    title: "Hostel washroom needs cleaning",
    description: "The washroom on 2nd floor Block A is dirty since morning.",
    category: "Maintenance",
    status: "Open",
    authorName: "Priya Sharma",
  },
  {
    id: 2,
    title: "Street light not working",
    description: "Street light near canteen pathway is out.",
    category: "Infrastructure",
    status: "Open",
    authorName: "Rohan Mehta",
  },
  {
    id: 3,
    title: "Mess food quality issue",
    description: "Rice undercooked since two days. Please check vendor.",
    category: "Other",
    status: "Open",
    authorName: "Aman Gupta",
  },
  {
    id: 4,
    title: "Library AC not working",
    description: "First floor reading room is too hot in the afternoon.",
    category: "Infrastructure",
    status: "In Progress",
    authorName: "Neha Verma",
  },
  {
    id: 5,
    title: "Water cooler leakage",
    description: "Leak near Block C corridor causing slippery floor.",
    category: "Maintenance",
    status: "Open",
    authorName: "Karan Singh",
  },
  {
    id: 6,
    title: "Hostel Wi‑Fi downtime",
    description: "Frequent disconnects after 10pm. Affects online classes.",
    category: "Security",
    status: "Open",
    authorName: "Ishita Rao",
  },
];

const Home = () => {
  const [complaints, setComplaints] = useState(
    defaultComplaints.map(c => ({ ...c, upvotedBy: [], comments: [] }))
  );
  const [form, setForm] = useState({ title: "", description: "", category: "Maintenance" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", category: "Maintenance", status: "Open" });
  const [commentInputs, setCommentInputs] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");

  const currentUser = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }, []);

  const handleCreate = async () => {
    if (!form.title.trim() || !form.description.trim()) return;
    setCreateError("");
    const authorName = currentUser?.name || "Anonymous";
    const defaultAuthorId = process.env.REACT_APP_DEFAULT_AUTHOR_ID || "000000000000000000000001";
    const authorId = (currentUser && currentUser._id) || defaultAuthorId;
    try {
      setIsCreating(true);
      const res = await fetch("https://surgeless-mckenzie-moodier.ngrok-free.dev/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title.trim(),
          content: form.description.trim(),
          author: authorId,
          authorName,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Failed to create complaint");
      }
      const data = await res.json();
      const next = {
        id: complaints.length ? Math.max(...complaints.map(c => c.id)) + 1 : 1,
        title: data?.title || form.title.trim(),
        description: data?.content || form.description.trim(),
        category: form.category,
        status: "Open",
        upvotedBy: [],
        comments: [],
        authorName: data?.authorName || authorName,
        remoteId: data?._id,
        createdAt: data?.createdAt,
      };
      setComplaints([next, ...complaints]);
      setForm({ title: "", description: "", category: "Maintenance" });
    } catch (err) {
      setCreateError(err?.message || "Something went wrong");
    } finally {
      setIsCreating(false);
    }
  };

  const startEdit = (id) => {
    const found = complaints.find(c => c.id === id);
    if (!found) return;
    setEditingId(id);
    setEditForm({
      title: found.title,
      description: found.description,
      category: found.category,
      status: found.status,
    });
  };

  const saveEdit = () => {
    if (!editingId) return;
    setComplaints(complaints.map(c => c.id === editingId ? { ...c, ...editForm } : c));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this complaint?");
    if (confirmDelete) setComplaints(complaints.filter(c => c.id !== id));
  };

  const handleUpvote = (id) => {
    if (!currentUser) {
      alert("Please log in to upvote.");
      return;
    }
    setComplaints(complaints.map(c => {
      if (c.id !== id) return c;
      const already = c.upvotedBy?.includes(currentUser.id);
      if (already) return c;
      return { ...c, upvotedBy: [...(c.upvotedBy || []), currentUser.id] };
    }));
  };

  const handleAddComment = (id) => {
    if (!currentUser) {
      alert("Please log in to comment.");
      return;
    }
    const text = (commentInputs[id] || "").trim();
    if (!text) return;
    setComplaints(complaints.map(c => {
      if (c.id !== id) return c;
      const newComment = {
        id: (c.comments?.length || 0) + 1,
        userId: currentUser.id,
        userName: currentUser.name,
        text,
        createdAt: new Date().toISOString(),
      };
      return { ...c, comments: [...(c.comments || []), newComment] };
    }));
    setCommentInputs({ ...commentInputs, [id]: "" });
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        <h1 className="retro-heading">🧾 Complaints Board</h1>
        <p className="retro-sub">Create, view, edit, and delete complaints</p>

        <div className="create-post">
          <input
            className="cw-input"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            placeholder="Describe the complaint..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="cw-row">
            <select
              className="cw-select"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option>Maintenance</option>
              <option>Infrastructure</option>
              <option>Security</option>
              <option>Other</option>
            </select>
            <button onClick={handleCreate} disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Complaint"}
            </button>
          </div>
          {createError ? (
            <p className="error-text" style={{ color: "#e11d48", marginTop: 8 }}>{createError}</p>
          ) : null}
        </div>

        <div className="posts-section">
          {complaints.map((c) => (
            <div key={c.id} className="post-card">
              {editingId === c.id ? (
                <>
                  <div className="post-header">
                    <input
                      className="cw-input"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    />
                    <select
                      className="cw-select"
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    >
                      <option>Maintenance</option>
                      <option>Infrastructure</option>
                      <option>Security</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <textarea
                    className="cw-textarea"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  />
                  <div className="post-actions">
                    <select
                      className="cw-select"
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                    <button onClick={saveEdit}>Publish Changes</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="post-header">
                    <span className="post-user">{c.title}</span>
                    <span className="post-category">{c.category} · {c.status}</span>
                  </div>
                  <div className="post-meta">
                    <span>By {c.authorName || "Anonymous"}{c.createdAt ? ` · ${new Date(c.createdAt).toLocaleString()}` : ""}</span>
                  </div>
                  <p className="post-content">{c.description}</p>
                  <div className="post-actions">
                    <button onClick={() => handleUpvote(c.id)} disabled={currentUser ? c.upvotedBy?.includes(currentUser.id) : false}>
                      ⬆ {c.upvotedBy?.length || 0}
                    </button>
                    <button onClick={() => startEdit(c.id)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(c.id)}>Delete</button>
                  </div>
                  <div className="comments">
                    <div className="comments-list">
                      {(c.comments || []).map(cm => (
                        <div key={cm.id} className="comment-item">
                          <span className="comment-meta">{cm.userName}</span>
                          <p className="comment-text">{cm.text}</p>
                        </div>
                      ))}
                      {(!c.comments || c.comments.length === 0) && (
                        <p className="comment-empty">No comments yet.</p>
                      )}
                    </div>
                    <div className="comment-form">
                      <input
                        className="cw-input"
                        placeholder="Write a comment..."
                        value={commentInputs[c.id] || ""}
                        onChange={(e) => setCommentInputs({ ...commentInputs, [c.id]: e.target.value })}
                      />
                      <button onClick={() => handleAddComment(c.id)}>Comment</button>
                      <button className="chat-btn" disabled title="Chat coming soon">💬 Chat with owner</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;