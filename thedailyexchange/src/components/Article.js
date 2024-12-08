import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../styles/Article.css';

/**
 * Article component
 * @param title
 * @param content
 * @returns {Element}
 */
function Article({ title, content }) {
  return (
    <article className="article-container">
      <h1 className="article-title">{title}</h1> 
      <div className="article-text">
        {/* Using ReactMarkdown to render the content */}
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </article>
  );
}

export default Article;
