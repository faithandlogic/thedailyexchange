import React from "react";
import "../styles/Archive.css";

function Archive({ articles, saveArticle, clearArticles, setArticleFromArchive, deleteArticle }) {
  return (
    <div className="archive">
      <h3>Saved Articles</h3>

      <div className="saved-articles">
        {articles.map(article => (
          <div 
            key={article.id} 
            className="saved-article"
            onClick={() => setArticleFromArchive(article)} // Call setArticleFromArchive when an article is clicked
          >
            <p><strong>Title:</strong> {article.title}</p>
            <p><strong>Date:</strong> {article.date}</p>
            <p>{article.content.substring(0, 30)}...</p>
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering `setArticleFromArchive` when clicking delete.
                deleteArticle(article.id); // Use the deleteArticle function passed from App.js
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="archive-actions">
        <button className="save-button" onClick={saveArticle}>
          Save Current Article
        </button>
        <button className="clear-button" onClick={clearArticles}>
          Clear All Articles
        </button>
      </div>
    </div>
  );
}

export default Archive;
