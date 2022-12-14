import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getArticle,
  patchLike,
  getComments,
  deleteComment,
} from "../utils/index.js";
import Comments from "./Comments.jsx";
import ErrorHandling from "./errors/ErrorHandling.jsx";

const currentUser = "Testing";

//note as comment like is held in state is deleted on refresh
//error handling could be more subtle

const SingleArticle = () => {
  const { article_id } = useParams();

  //error handling
  const [error, setError] = useState(false);

  //get article data
  const [article, setArticle] = useState([]);
  useEffect(() => {
    getArticle(article_id).then((data) => {
      //error handling if topic not found
      if (data.status) {
        setError(data.msg);
      } else {
        setError(false);
        const article = data.article;
        setArticle(article);
      }
    });
  }, [article_id, error]);

  //get article comments and setNumberComment state for prop drilling to new comment
  //enables numComments to be optimistically rendered
  const [comments, setComments] = useState([]);
  const [numComments, setNumComments] = useState(0);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (error) {
    } else {
      getComments(article_id).then(({ comments }) => {
        setComments(comments);
        setNumComments(article.comment_count);
      });
    }
  }, [article_id, article.comment_count, error]);

  //process date for user
  const date = new Date(article.created_at);
  const article_date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  //handle like button click
  const [isActive, setIsActive] = useState(false);
  const [likes, setLikes] = useState(0);
  const [err, setErr] = useState(null);

  const handleClick = () => {
    //OPTIMISTIC RENDERING OF LIKES
    if (isActive === false) {
      setLikes((likes) => likes + 1);
    } else if (isActive === true) {
      setLikes((likes) => likes - 1);
    }
    setIsActive(!isActive);

    //UPDATE DATABASE
    const request = isActive === false ? { inc_votes: 1 } : { inc_votes: -1 };
    patchLike(article_id, request)
      .then(() => {
        setErr(null);
      })
      .catch((err) => {
        console.log(err);
        setIsActive(false);
        setLikes(0);
        //reset optimistic render of likes
        setErr("Something went wrong, please refresh and try again.");
      });
  };

  const handleDeleteComment = (comment_id) => {
    setIsSending(true);
    //delete comment from database
    deleteComment(comment_id)
      .then((res) => {
        if (res) {
          setIsSending(false);
          setNumComments(numComments - 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isSending === true) {
    return (
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  //error handling
  if (error) {
    return <ErrorHandling error={error}></ErrorHandling>;
  }

  //err handling
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
          <button
            onClick={handleClick}
            aria-description="click to like article. Displays total number of article likes"
            className={
              "like__button " +
              (isActive === true ? "clicked" : "not__clicked") +
              (err ? " like__button__error" : "")
            }
          >
            Like &ensp; {likes + article.votes}
            <p
              className={
                err ? "Single__article_error" : "Single__article__no_error"
              }
            >
              {err}
            </p>
          </button>
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
      <Comments
        setNumComments={setNumComments}
        numComments={numComments}
        article_id={article_id}
      >
        <ul>
          {comments.map(({ comment_id, author, body, created_at, votes }) => {
            //adds a comment delete button only if matches current user
            const deleteButton = () => {
              return author === currentUser ? (
                <button
                  className="delete__comment__button"
                  onClick={() => handleDeleteComment(comment_id)}
                >
                  Delete comment
                </button>
              ) : (
                ""
              );
            };

            const date = new Date(created_at);
            const commentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            return (
              <article className="Comment__card" key={comment_id}>
                <p>{body}</p>

                <div className="comment__stats">
                  <p>{author}</p>
                  <p>{commentDate}</p>
                </div>
                <p className="comments__votes">{votes}</p>
                {deleteButton()}
              </article>
            );
          })}
        </ul>
      </Comments>
    </article>
  );
};

export default SingleArticle;
