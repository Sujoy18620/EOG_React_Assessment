import React from 'react';
import { Grid } from '@material-ui/core';
import useStyles from "./ChartContainer.styles";
import FiltersContainer from '../../Features/Filters';
import ChartContainer from '../../Features/Chart';

const Dashboard = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} justify="center">
      <Grid item xs className={classes.content}>
        <FiltersContainer />
        <ChartContainer />
      </Grid>
    </Grid>
  );
};

export default Dashboard;