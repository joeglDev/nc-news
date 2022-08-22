export const getArticles = () => {
  return fetch(
    "https://northcoders-backend-project-jg.herokuapp.com/api/articles"
  ).then((data) => {
    return data.json();
  });
};

export const getTopics = () => {
  return fetch(
    "https://northcoders-backend-project-jg.herokuapp.com/api/topics"
  ).then((data) => {
    return data.json();
  });
};

export const getArticlesByTopic = (topic) => {
  return fetch(
    `https://northcoders-backend-project-jg.herokuapp.com/api/articles?topic=${topic}`
  ).then((data) => {
    return data.json();
  });
};


