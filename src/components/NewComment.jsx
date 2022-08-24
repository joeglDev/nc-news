import { postComment } from "../utils";
import { useState } from "react";

const NewComment = ({ setNumComments, article_id, numComments }) => {
  //const newComment = { username: "hiroji", body: "merp!" }
  //might need id to

  const [newComment, setNewComment] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  const [postFailed, setPostFailed] = useState(false);
  const [emptyBody, setEmptyBody] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setIsSending(true);

    //UPDATE THIS OBJECT WITH USER WHEN ADDED
    const newComment = { username: "Test-user", body: commentBody };

    //handle empty comment body
    if (commentBody === "") {
      setEmptyBody(true);
      setIsSending(false);
    } else {
      setEmptyBody(false);
      postComment(article_id, newComment)
        .then((res) => {
          setNewComment(res);
          setNumComments(numComments + 1);
          setPostFailed(false);
          setIsSending(false);
        })
        .catch(() => {
          setIsSending(false);
          setPostFailed(true);
        });
    }
  };
  {
    if (isSending === true) {
      return (
        <div class="lds-facebook"><div></div><div></div><div></div></div>
      );
    }
  }
  //if newComment is assigned to state optimistically render newComment
  {
    if (newComment.length !== 0) {
      const { comment_id, body, author, created_at, votes } =
        newComment.comment;

      //format date for readability
      const date = new Date(created_at);
      const commentDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

      return (
        <>
          <form className="submit__comment__form">
            <div className="submit__comment__form__div">
              <label htmlFor="comment-body">Enter comment here:</label>
              <input
                htmlFor="comment-body"
                type="text"
                value={commentBody}
                onChange={(event) => setCommentBody(event.target.value)}
                className={emptyBody === true ? "input__fail" : ""}
              ></input>
            </div>
            <button
              className={
                "post__comment__button " +
                (postFailed === true || emptyBody === true
                  ? "postFailed"
                  : "postOk")
              }
              onClick={onSubmit}
            >
              {emptyBody === true ? "Please enter comment text." : ""}
              {postFailed === true
                ? "Sorry something went wrong. Please try again"
                : emptyBody === true
                ? ""
                : "Post Comment"}
            </button>
          </form>

          <ul>
            <article className="Comment__card" key={comment_id}>
              <p>{body}</p>

              <div className="comment__stats">
                <p>{author}</p>
                <p>{commentDate}</p>
              </div>

              <p className="comments__votes">{votes}</p>
            </article>
          </ul>
        </>
      );
    }
  }

  //else no newComment so display form only
  return (
    <>
      <form className="submit__comment__form">
        <div className="submit__comment__form__div">
          <label htmlFor="comment-body">Enter comment here:</label>
          <input
            htmlFor="comment-body"
            type="text"
            value={commentBody}
            onChange={(event) => setCommentBody(event.target.value)}
            className={emptyBody === true ? "input__fail" : ""}
          ></input>
        </div>
        <button
          className={
            "post__comment__button " +
            (postFailed === true || emptyBody === true
              ? "postFailed"
              : "postOk")
          }
          onClick={onSubmit}
        >
          {emptyBody === true ? "Please enter comment text." : ""}
          {postFailed === true
            ? "Sorry something went wrong. Please try again"
            : emptyBody === true
            ? ""
            : "Post Comment"}
        </button>
      </form>
    </>
  );
};

export default NewComment;
