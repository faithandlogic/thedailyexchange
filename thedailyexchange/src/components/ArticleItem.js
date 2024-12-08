import React from "react";
import { IoCloseCircle } from "react-icons/io5";

/**
 * ArticleItem component
 * @param article
 * @param setArticleFromArchive
 * @param onDelete
 * @param setSelectedArticle
 * @returns {Element}
 */
const ArticleItem = ({
  article,
  setArticleFromArchive,
  onDelete,
  setSelectedArticle,
}) => {
  return (
    <div
      key={article.id}
      className="saved-article"
      onClick={() => {
        setArticleFromArchive(article);
        setSelectedArticle(article);
      }}
    >
      <p>
        <strong>Title:</strong> {article.title}
      </p>
      <p>
        <strong>Date:</strong> {article.date}
      </p>
      <p>{article.content.substring(0, 30)}...</p>
      {/* The delete icon */}
      <IoCloseCircle
        size={20}
        className="article-delete"
        onClick={() => {
          onDelete(article.id);
        }}
      />
    </div>
  );
};

export default ArticleItem;
