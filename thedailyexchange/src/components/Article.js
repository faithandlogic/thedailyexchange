import React from 'react';
import '../styles/Article.css'; // Importing the CSS file for styling

function Article({ title, content }) {
  return (
    <article className="article-container">
      <h1 className="article-title">{title}</h1>
      <p className="article-text"> {content}      </p>
    </article>
  );
}

export default Article;
