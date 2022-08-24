import { useState } from "react";

const Comments = ({ numComments, children }) => {
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
    
      {isClicked && children}
    </section>
  );
};

export default Comments;
