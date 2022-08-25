export const getArticles = (sortBy, order) => {
  return fetch(
    `https://northcoders-backend-project-jg.herokuapp.com/api/articles?sort_by=${sortBy}&order=${order}`
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

export const getArticlesByTopic = (topic, sort_by, order) => {
  return fetch(
    `https://northcoders-backend-project-jg.herokuapp.com/api/articles?sort_by=${sort_by}&order=${order}&topic=${topic}`
  ).then((data) => {
    return data.json();
  });
};

export const patchLike = (article_id, request) => {
  return fetch(
    `https://northcoders-backend-project-jg.herokuapp.com/api/articles/${article_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  ).then((response) => {
    return response.json();
  });
};

export const getComments = (article_id) => {
  return fetch(
    `https://northcoders-backend-project-jg.herokuapp.com/api/articles/${article_id}/comments`
  ).then((data) => {
    return data.json();
  });
};

export const postComment = (article_id, request) => {
  return fetch(
    `https://northcoders-backend-project-jg.herokuapp.com/api/articles/${article_id}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }
  ).then((response) => {
    return response.json();
  });
};

export const deleteComment = (comment_id) => {
  return fetch(
    `https://northcoders-backend-project-jg.herokuapp.com/api/comments/${comment_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(() => {
    return true
  }).catch((err) => {
    return err
  })
};


