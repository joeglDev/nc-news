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

  //process date for user
  const date = new Date(article.created_at);
  const article_date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  //handle like button click
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive)
  };

  //aria-description tags used in html as label not aesthetic
  return (
    <article>
      <h1>{article.title}</h1>
      <div className="Single__article__header">
        <p aria-description="Article author">
          {"Written by: " + article.author}
        </p>
        <p aria-description="article created date">{article_date}</p>
        <div className="Single__Article__Stats">
          <button onClick={handleClick} aria-description="click to like article. Displays total number of article likes" className={'like__button ' + (isActive === true ? 'clicked' : 'not__clicked') }>Like &ensp; &ensp;{article.votes}</button>
          <p aria-description="number of article comments">
            {"note- move to comment button" + article.comment_count}
          </p>
        </div>
        <div
          aria-description="article topic"
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
      <div className="Single__article__body">
        <p aria-description="main article content">{article.body}</p>
      </div>
    </article>
  );
};

export default SingleArticle;
