import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getArticlesByTopic } from "../utils/index.js";

const ArticleByTopic = (topic) => {
    const {slug} = useParams();

    //define article state
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticlesByTopic(slug).then(({ articles }) => {
        console.log(articles)
      setArticles(articles);
    });
  }, [slug]);

  return (
    <section className='Articles__grid'>
      <h1 className="Articles__h1">Articles</h1>
      <ul>
        {articles.map((article) => {
          return (
            
            <article className='Articles__card' key={article.article_id}>
              <div className={article.topic === 'coding' ? 'Articles_card__box__topic1' : article.topic === 'cooking' ? 'Articles_card__box__topic2' : 'Articles_card__box__topic3'}>
                <p>{article.topic}</p>
              </div>
              <header className='Articles_card__title'>{article.title}</header>
              <p className='Articles_card__author'>{article.author}</p>
              </article>
            
          );
        })}
      </ul>
    </section>
  );
  

};

export default ArticleByTopic;