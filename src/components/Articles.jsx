import { useState, useEffect } from "react";
import { getArticles } from "../utils/api-utility-functions.js";



const Articles = () => {


  
  //define article state
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then(({ articles }) => {
      setArticles(articles);
    });
  }, [articles]);

  return (
    <section className='Articles__grid'>
      <h1 className="Articles__h1">Articles</h1>
      <ul>
        {articles.map((article) => {
          return (
            
            <li className='Articles__card' key={article.article_id}>
              <div className={article.topic === 'coding' ? 'Articles_card__box__topic1' : article.topic === 'cooking' ? 'Articles_card__box__topic2' : 'Articles_card__box__topic3'}>
                <p>{article.topic}</p>
              </div>
              <p className='Articles_card__title'>{article.title}</p>
              <p className='Articles_card__author'>{article.author}</p>
              </li>
            
          );
        })}
      </ul>
    </section>
  );
};

export default Articles;
