import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { getArticlesByTopic } from "../utils/index.js";
import ErrorHandling from "./errors/ErrorHandling.jsx";

const ArticleByTopic = () => {
  const { slug } = useParams();
  //alter url
  const [searchParams, setSearchParams] = useSearchParams();

  //define article state
  const [articles, setArticles] = useState([]);
  //define filter states
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");
  //error handling
  const [error, setError] = useState(false);

  useEffect(() => {
    getArticlesByTopic(slug, "created_at", "desc").then((data) => {
      //error handling if topic not found
      if (data.status === 404) {
        setError(data.msg);
      } else {
        setError(false);
        const articles = data.articles;
        setArticles(articles);
      }
    });
  }, [slug]);

  //filter call for articles
  const handleFormSubmit = (event) => {
    event.preventDefault();

    //set new url
    setSearchParams({ sort_by: sortBy, order: order });

    getArticlesByTopic(slug, sortBy, order).then(({ articles }) => {
      setArticles(articles);
    });
  };
  //error handling
  if (error) {
    return <ErrorHandling error={error}></ErrorHandling>;
  }

  return (
    <section className="Articles__grid">
      <h1 className="Articles__h1">
        {slug[0].toUpperCase() + slug.substring(1)} articles
      </h1>
      <form className="articles__filter__form" onSubmit={handleFormSubmit}>
        <label className="articles__filter__form__element" htmlFor="sort_by">
          Sort by:{" "}
        </label>
        <select
          className="articles__filter__form__element"
          id="sort_by"
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="created_at">Date</option>
          <option value="title">Title</option>
          <option value="votes">Number of votes</option>
        </select>
        <label className="articles__filter__form__element" htmlFor="order">
          Sort order:{" "}
        </label>
        <select
          className="articles__filter__form__element"
          id="order"
          onChange={(event) => setOrder(event.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
        <button className="articles__filter__form__element" type="submit">
          Filter Articles
        </button>
      </form>
      <ul>
        {articles.map((article) => {
          return (
            <Link
              to={`/articles/${article.article_id}`}
              key={article.article_id}
            >
              <article className="Articles__card">
                <div
                  className={
                    article.topic === "coding"
                      ? "Articles_card__box__topic1"
                      : article.topic === "cooking"
                      ? "Articles_card__box__topic2"
                      : "Articles_card__box__topic3"
                  }
                >
                  <p>{article.topic}</p>
                </div>
                <header className="Articles_card__title">
                  {article.title}
                </header>
                <p className="Articles_card__author">{article.author}</p>
              </article>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default ArticleByTopic;
