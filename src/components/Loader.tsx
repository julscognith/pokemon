import { Grid, withStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";

const styles = {
 root: {
  marginTop: "50px",
  width: "100%",
 },
};

class Loader extends React.Component {
 render() {
  const { classes } = this.props as any;

  return (
   <Grid
    container
    spacing={1}
    className={classes.root}
   >
    {[...Array(6)].map((d, i) => (
     <Grid
      item
      md={2}
      sm={4}
      xs={12}
      key={i}
     >
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
     </Grid>
    ))}
   </Grid>
  );
 }
}

export default withStyles(styles)(Loader);
