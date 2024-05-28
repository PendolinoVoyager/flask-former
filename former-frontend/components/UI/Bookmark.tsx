import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as fasBookmark } from "@fortawesome/free-solid-svg-icons";
import { useAppContext } from "@/stores/appContext";

const BookmarkIcon = ({ id }: { id: string }) => {
  const { isBookmarked, addBookmark, removeBookmark } = useAppContext();

  const handleToggleBookmark = () => {
    if (isBookmarked(id)) removeBookmark(id);
    else addBookmark(id);
  };

  return (
    <div onClick={handleToggleBookmark} className="pop-on-click bookmark">
      <FontAwesomeIcon
        color={isBookmarked(id) ? "red" : "black"}
        icon={fasBookmark}
      />
    </div>
  );
};

export default BookmarkIcon;
