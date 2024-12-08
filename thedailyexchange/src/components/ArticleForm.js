import "../styles/ArticleForm.css";
import { useState } from "react";

/**
 * ArticleForm component
 * @param savedArticles
 * @param setSavedArticles
 * @param article
 * @returns {JSX.Element}
 */
const ArticleForm = ({ savedArticles, setSavedArticles, article }) => {
  // State to store article title, default value is the original article title
  const [articleTitle, setArticleTitle] = useState(article.title);

  // Function to save the article title change
  const onSaveArticleChange = () => {
    const updatedArticles = savedArticles?.map((savedArticle) => {
      if (savedArticle.id !== article.id) {
        return savedArticle;
      }
      return {
        ...savedArticle,
        title: articleTitle,
      };
    });
    setSavedArticles(updatedArticles);
    localStorage.setItem("articles", JSON.stringify(updatedArticles));
  };

  return (
    <div className="article-form-container">
      Editing {article.title}
      <input
        className="article-form-input"
        type="text"
        value={articleTitle}
        onChange={(e) => setArticleTitle(e.target.value)}
      />
      <button
        className="article-form-button"
        onClick={() => {
          onSaveArticleChange();
        }}
      >
        Save
      </button>
    </div>
  );
};

export default ArticleForm;
