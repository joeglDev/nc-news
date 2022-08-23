import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../utils/index.js";

const SingleArticle = () => {
  const { article_id } = useParams();

  const [article, setArticle] = useState([]);
  useEffect(() => {
    getArticle(article_id).then(({ article }) => {
      setArticle(article);
    });
  }, [article_id]);
  const date = new Date(article.created_at);
  const article_date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  
//aria-description tags used in html as label not aesthetic
  return (
    <article>
      <h1>{article.title}</h1>
      <div className="Single__article__header">
        <p aria-description='Article author'>{"Written by: " + article.author}</p>
        <p aria-description='article created date'>{article_date}</p>
        <div className="Single__Article__Stats">
          <p aria-description='number of article likes'>{'Votes: ' + article.votes}</p>
          <p aria-description='number of article comments'>{'note- move to comment button' + article.comment_count}</p>
        </div>
        <div aria-description='article topic'
          className={
            "Single__topic " +
            (article.topic === "coding"
              ? "coding"
              : article.topic === "cooking"
              ? "cooking"
              : "football")
          }
        >
          <p>{article.topic}</p>
        </div>
      </div>
      <div  className="Single__article__body">
        <p aria-description='main article content'>{article.body}</p>
      </div>
    </article>
  );
};

export default SingleArticle;
