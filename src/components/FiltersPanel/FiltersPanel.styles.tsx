import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  filterPanel: {
    marginTop: 10,
  },
  filtersDropdown: {
    maxWidth: '300px',
    marginBottom: 10,
  },
  filterCard: {
    padding: '10px',
    border: '1px solid #666',
    borderRadius: '3px',
    color: '#000',
  },
  filterTitle: {
    margin: 0
  },
  filterValue: {
    margin: 0,
    fontSize: '1.5em',
    fontFamily: 'Roboto'
  }
}));

export default useStyles;