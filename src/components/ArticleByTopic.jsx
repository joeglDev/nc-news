import {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticlesByTopic } from "../utils/index.js";

const ArticleByTopic = () => {
    const {slug} = useParams();

    //define article state
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticlesByTopic(slug).then(({ articles }) => {
      setArticles(articles);
    });
  }, [slug]);

  return (
    <section className='Articles__grid'>
      <h1 className="Articles__h1">{slug[0].toUpperCase() + slug.substring(1)} articles</h1>
      <ul>
        {articles.map((article) => {
          return (
            <Link to={`/articles/${article.article_id}`} key={article.article_id}>
            <article className='Articles__card'>
              <div className={article.topic === 'coding' ? 'Articles_card__box__topic1' : article.topic === 'cooking' ? 'Articles_card__box__topic2' : 'Articles_card__box__topic3'}>
                <p>{article.topic}</p>
              </div>
              <header className='Articles_card__title'>{article.title}</header>
              <p className='Articles_card__author'>{article.author}</p>
              </article>
              </Link>
            
          );
        })}
      </ul>
    </section>
  );
  

};

export default ArticleByTopic;