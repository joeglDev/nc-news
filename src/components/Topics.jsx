import { useState, useEffect } from "react";
import { getTopics } from "../utils/index.js";
import {Link} from 'react-router-dom';

const Topics = () => {

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopics(topics);
    });
  }, [topics]);

    return (
        <>
        <h1 className='Articles__h1'>Articles by topic</h1>
        <ul className='Topics_card_container'>
            {topics.map((topic) => {
                return (
                    <Link key={topic.slug} to={`/articles/topics/${topic.slug}`}>
                    <li className='Topics__card' >
                        <h2>{topic.slug}</h2>
                        <span className={topic.slug === 'coding' ? 'Topics__card__span__1' : topic.slug === 'cooking' ? 'Topics__card__span__2' : 'Topics__card__span__3'}></span>
                    </li>
                    </Link>
                )
            })}
        </ul>
        </>
    )
};

export default Topics;