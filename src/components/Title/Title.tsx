import React from 'react';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Weather from '../../Features/Weather/Weather';
import useStyles from './Title.styles';

const Title = () => {
  const classes = useStyles();
  return (
    <Toolbar className={classes.title}>
      <Typography
        variant="h6"
        color="inherit"
        className={classes.titleText}
      >
        EOG React Visualization Assessment
      </Typography>
      <Weather />
    </Toolbar>
  );
};

export default Title;
