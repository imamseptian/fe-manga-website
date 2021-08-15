import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React from "react";
import { NavLink } from "react-router-dom";
import TimeIcon from "@material-ui/icons/Timelapse";

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
    width: 200,
    // marginRight: 30,
    // marginBottom: 20,
    margin: "10px 15px",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  contentBottom: {
    marginTop: "auto",
  },
  cardTitle: {
    fontWeight: "bold",
    overflow: "hidden",
    height: 50,
    marginBottom: 3,
    color: theme.palette.primary.dark,
  },
  cardSubtitle: {
    color: theme.palette.secondary.dark,
  },
}));

export default function CardSlider({
  title,
  thumbnail,
  type,
  updated_on,
  chapter,
  slug,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <NavLink to={`/detail/${slug}`} style={{ textDecoration: "none" }}>
      <div className="wrapper-item">
        <img src={thumbnail} alt="" className="item-thumbnail" />
        <div style={{ margin: "0 5px" }}>
          <Typography variant="subtitle1" className={clsx(classes.cardTitle)}>
            {title}
          </Typography>
          {type && (
            <Typography
              variant="subtitle2"
              className={clsx(classes.cardSubtitle)}
            >{`${type} ${chapter ? `| ${chapter}` : ""}`}</Typography>
          )}
        </div>
        {updated_on && (
          <div
            style={{
              display: "flex",

              marginTop: 10,
              flex: 1,
            }}
          >
            <IconButton aria-label="updated" className={clsx(classes.expand)}>
              <TimeIcon />
              <Typography variant="subtitle2">{updated_on}</Typography>
            </IconButton>
          </div>
        )}
      </div>
    </NavLink>
  );
}
