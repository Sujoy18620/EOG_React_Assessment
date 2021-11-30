import { createSlice, PayloadAction } from 'redux-starter-kit';
import { ApiErrorAction } from '../../services/api';
import { Filter } from './Filters.types';

interface Filters {
  list: Filter[]
}

const initialState: Filters = {
  list: []
};


const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersSuccess: (state, { payload }: PayloadAction<string[]>) => {
      state.list = payload.map(title => ({ title, selected: false }));
    },
    filtersFailure: (state, action: PayloadAction<ApiErrorAction>) => state,
    filtersApplied: (state, { payload }: PayloadAction<string[]>) => {
      state.list = state.list.map(filter => ({
        ...filter,
        selected: payload.includes(filter.title)
      }))
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
