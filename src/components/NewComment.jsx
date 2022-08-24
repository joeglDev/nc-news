import { postComment } from "../utils";
import { useState } from "react";

const NewComment = ({article_id }) => {
  //const newComment = { username: "hiroji", body: "merp!" }
  //might need id to

  const [newComment, setNewComment] = useState([]);

  const onSubmit = (event) => {
    event.preventDefault();
    const newComment = { username: 'Hiroji', body: "HIYA" };

    postComment(article_id, newComment).then((res) => {
      setNewComment(res);
    });
  };

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
          <form>
            <button onClick={onSubmit}>Post Comment</button>
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
      <form>
        <button onClick={onSubmit}>Post Comment</button>
      </form>
    </>
  );
};

export default NewComment;
