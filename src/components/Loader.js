import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "fixed",
    top: "50%",
    // left: "50%",
    left: `calc(50% - 35px)`,
    // width: `calc(100% - ${drawerWidth}px)`,
  },
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <CircularProgress /> */}
      <CircularProgress color="primary" size={70} />
    </div>
  );
}
