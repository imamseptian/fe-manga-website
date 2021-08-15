import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import { useHistory, NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  chapterItem: {
    border: "1px solid black",
    padding: "5px 10px",
    borderRadius: 5,
    boxShadow: "1px 3px 1px #9E9E9E",
    marginBottom: 10,
    cursor: "pointer",
    "&:hover": {
      // background: "#f00",
      opacity: 0.7,
    },
  },
}));

const ChapterItem = ({ chapter, title, slug }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleChapterClick = () => {
    history.push(`/read/${slug}`);
  };
  return (
    <NavLink to={`/read/${slug}`} style={{ textDecoration: "none" }}>
      <div className={clsx(classes.chapterItem)}>
        <Typography variant="subtitle1">{chapter}</Typography>
        {/* <Typography variant="subtitle2">Everlasting Ending</Typography> */}
      </div>
    </NavLink>
  );
};

export default ChapterItem;
