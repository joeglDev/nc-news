export const getArticles = () => {
  return fetch(
    "https://northcoders-backend-project-jg.herokuapp.com/api/articles"
  ).then((data) => {
    return data.json();
  });
};
