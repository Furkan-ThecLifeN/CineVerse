import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./MovieCommentSection.css";

const MovieCommentSection = () => {
  const { user } = useContext();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Yorumları sunucudan çek
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/comments");
        setComments(res.data);
      } catch (err) {
        console.error("Yorumlar alınamadı:", err);
      }
    };
    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    if (!user) return alert("Yorum yapmak için giriş yapmalısınız.");

    try {
      const res = await axios.post("http://localhost:5000/comments", {
        text: comment,
      });
      setComments([res.data, ...comments]);
      setComment("");
    } catch (err) {
      console.error("Yorum gönderilemedi:", err);
    }
  };

  // Diğer fonksiyonlar (handleEdit, handleDelete) aynen kalabilir...

  return (
    <section className="comment-section">
      <h2 className="comment-title">Yorumlar</h2>

      {user ? (
        <form className="comment-form" onSubmit={handleSubmit}>
          <img
            src={user.avatarUrl || "/default-avatar.png"}
            alt="User"
            className="avatar"
          />
          <textarea
            placeholder="Film hakkında düşünceleriniz..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="comment-input"
            rows="3"
          ></textarea>
          <button type="submit" className="comment-button">
            Gönder
          </button>
        </form>
      ) : (
        <p className="login-warning">Yorum yapmak için giriş yapmalısınız.</p>
      )}

      <ul className="comment-list">
        {comments.map((c) => (
          <li key={c._id} className="comment-item">
            <img
              src={c.user.avatarUrl || "/default-avatar.png"}
              alt="User"
              className="avatar"
            />
            <div>
              <p className="comment-user">{c.user.username}</p>
              <p className="comment-text">{c.text}</p>
              {user?.username === c.user.username && (
                <div className="comment-actions">
                  <button
                    onClick={() => {
                    }}
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => {
                    }}
                  >
                    Sil
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieCommentSection;
