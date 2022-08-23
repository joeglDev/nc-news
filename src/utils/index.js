export const getArticles = () => {
  return fetch(
    "https://northcoders-backend-project-jg.herokuapp.com/api/articles"
  ).then((data) => {
    return data.json();
  });
};

export const getArticle = (article_id) => {
  return fetch(
    `https://northcoders-backend-project-jg.herokuapp.com/api/articles/${article_id}`
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

export const patchLike = (article_id, request) => {
  return fetch(`https://northcoders-backend-project-jg.herokuapp.com/api/articles/${article_id}`, {
   method: "PATCH",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify(request),
 }).then((response) => {
   return response.json();
 });
 };

