import React from "react";
import "../styles/Archive.css";
import ArticleItem from "./ArticleItem";

/**
 * Archive component
 * @param articles
 * @param saveArticle
 * @param clearArticles
 * @param deleteArticleById
 * @param setArticleFromArchive
 * @param setSelectedArticle
 * @returns {Element}
 */
function Archive({
  articles,
  saveArticle,
  clearArticles,
  deleteArticleById,
  setArticleFromArchive,
  setSelectedArticle,
}) {
  return (
    <div className="archive">
      <h3>Saved Articles</h3>

      <div className="saved-articles">
        {/* Displaying the list of saved articles */}
        {articles.map((article) => (
          //The ArticleItem component used to display each article in the archive
          <ArticleItem
            key={article.id}
            article={article}
            setArticleFromArchive={setArticleFromArchive}
            onDelete={deleteArticleById}
            setSelectedArticle={setSelectedArticle}
          />
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
