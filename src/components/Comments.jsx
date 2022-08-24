import { useState } from "react";
import NewComment from "./NewComment";


const Comments = ({ numComments, children, article_id }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <section>
        <button
          aria-description="button showing comment count. Click to show/hide comments."
          onClick={handleClick}
          className={
            "Comments__show__button " +
            (isClicked === true ? "clicked" : "not__clicked")
          }
        >
          Comments {numComments}
        </button>
        <NewComment article_id={article_id}></NewComment>
      {isClicked && children}
    </section>
  );
};

export default Comments;
