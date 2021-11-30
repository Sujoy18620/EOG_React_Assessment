import { reducer as weatherReducer } from '../Features/Weather/Weather.reducer';
import { reducer as chartReducer } from '../Features/Chart/Chart.reducer';
import { reducer as filtersReducer } from '../Features/Filters/Filters.reducer';

export default {
  weather: weatherReducer,
  chart: chartReducer,
  filters: filtersReducer,
};
