import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Comment ({ movieId, user, onLoginClick }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Yorumları getir
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/comments/${movieId}`
        );
        setComments(res.data);
      } catch (error) {
        console.error("Yorumları alırken hata:", error);
      }
    };
    fetchComments();
  }, [movieId]);

  // Yeni yorum ekle
  const handleAddComment = async () => {
    if (!user) {
      onLoginClick();
      return;
    }
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/comments/${movieId}`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setComments((prev) => [...prev, res.data]);
      setNewComment("");
    } catch (error) {
      console.error("Yorum eklerken hata:", error);
    }
  };

  // Düzenlemeye başla
  const startEdit = (comment) => {
    setEditingId(comment._id);
    setEditingText(comment.text);
  };

  // Düzenlemeyi kaydet
  const saveEdit = async () => {
    if (!editingText.trim()) return;

    try {
      const res = await axios.put(
        `http://localhost:5000/comments/${editingId}`,
        { text: editingText },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setComments((prev) =>
        prev.map((c) => (c._id === editingId ? res.data : c))
      );
      setEditingId(null);
      setEditingText("");
    } catch (error) {
      console.error("Yorum güncellerken hata:", error);
    }
  };

  // Düzenlemeyi iptal et
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  // Yorum sil
  const deleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/comments/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Yorum silerken hata:", error);
    }
  };

  return (
    <div className="comment-section">
      <h3>Yorumlar</h3>
      {comments.length === 0 && <p>Henüz yorum yok.</p>}
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-item">
            <strong>{comment.username || "Anonim"}</strong>:
            {editingId === comment._id ? (
              <>
                <textarea
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={saveEdit}>Kaydet</button>
                <button onClick={cancelEdit}>İptal</button>
              </>
            ) : (
              <p>{comment.text}</p>
            )}
            {user &&
              comment.userId === user.id &&
              editingId !== comment._id && (
                <>
                  <button onClick={() => startEdit(comment)}>Düzenle</button>
                  <button onClick={() => deleteComment(comment._id)}>
                    Sil
                  </button>
                </>
              )}
          </div>
        ))}
      </div>

      {user ? (
        <div className="comment-add">
          <textarea
            placeholder="Yorumunuzu yazın..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleAddComment}>Yorum Ekle</button>
        </div>
      ) : (
        <p>
          Yorum yapmak için{" "}
          <button onClick={onLoginClick} className="login-button">
            giriş yapın
          </button>
          .
        </p>
      )}
    </div>
  );
}
