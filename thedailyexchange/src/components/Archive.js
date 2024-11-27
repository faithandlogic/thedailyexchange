import React from 'react';
import '../styles/Archive.css';

function Archive({ articles, saveArticle, clearArticles, setArticleFromArchive }) {
  return (
    <div className="archive">
      <div className="saved-articles">
        <h3>Saved Articles</h3>
        {articles.map(article => (
          <div
            key={article.id}
            className="saved-article"
            onClick={() => setArticleFromArchive(article)}
          >
            <p><strong>Title:</strong> {article.title}</p>
            <p><strong>Date:</strong> {article.date}</p>
            <p>{article.content.substring(0, 30)}...</p>
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
