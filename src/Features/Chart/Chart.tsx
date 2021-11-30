import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useQuery, useSubscription } from 'urql';
import { filterColors } from '../../components/FiltersPanel/constants';
import { getChartData, getFilters, getSelectedFilter } from '../Filters/Filters.selectors';
import { measurementQuery, subscriptionQuery } from './constants';
import { actions } from './Chart.reducer';
import { ChartDataPoint, ChartDataProps } from './Chart.types';
import useStyles from './Chart.styles';
import * as utils from './utils';

let dataPoints: ChartDataPoint[] = [];

const Chart = () => {
  const filters = useSelector(getFilters);
  const selectedFilters = useSelector(getSelectedFilter);
  const chartData = useSelector(getChartData);
  const startTime = utils.formatTimeAgo();
  const input = filters.map(filter => ({
    metricName: filter.title,
    after: startTime
  }));

  const classes = useStyles();
  const dispatch = useDispatch();

  const [{ data: measurementData }, executeQuery] = useQuery({
    query: measurementQuery,
    pause: true,
    variables: { input },
  });
  const [{ data: subscriptionData }] = useSubscription({ query: subscriptionQuery });

  const updateChartData = useCallback((chartData: ChartDataPoint[]) => {
    dispatch(actions.updateChartData(chartData));
  }, [dispatch]);


  const setChartData = useCallback((chartDataResponse) => {
    dispatch(actions.setChartData(chartDataResponse));
  }, [dispatch]);

  useEffect(() => {
    if (!subscriptionData || !subscriptionData.newMeasurement) return;
    if (dataPoints.length < filters.length) {
      dataPoints.push(subscriptionData.newMeasurement);
    } else {
      updateChartData(dataPoints);
      dataPoints = [];
    }
  }, [subscriptionData, updateChartData, filters.length]);

  useEffect(() => {
    executeQuery();
    // eslint-disable-next-line
  }, [selectedFilters.length]);

  useEffect(() => {
    if (measurementData?.getMultipleMeasurements.length === selectedFilters.length) {
      setChartData(measurementData.getMultipleMeasurements);
    }
  }, [measurementData, selectedFilters.length, setChartData]);

  const formattedChartData: ChartDataProps[] = utils.formatChartData(chartData, selectedFilters.map(m => m.title));

  if (!formattedChartData.length) return null;

  const firstTick = Number(formattedChartData[0].name);
  const lastTick = Number(formattedChartData[formattedChartData.length - 1].name);
  const units = utils.getChartUnits(chartData);

  return (
    formattedChartData.length
      ? (
        <Box className={classes.wrapper}>
          <ResponsiveContainer height={500}>
            <LineChart
              data={formattedChartData}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                scale="time"
                ticks={utils.getChartTicks(firstTick, lastTick)}
                type="number"
                interval="preserveStartEnd"
                tickFormatter={tick => utils.formatChartTicks(tick)}
                domain={[firstTick, lastTick]}
              />
              {
                selectedFilters.map((m, i) => (
                  <YAxis
                    key={m.title}
                    unit={units[m.title]}
                    yAxisId={`left${i + 1}`}
                    orientation="left"
                  />
                ))
              }
              <Tooltip labelFormatter={(label) => <span>{new Date(+label).toString()}</span>} />
              <Legend />
              {
                selectedFilters.map((m, i) => (
                  <Line
                    key={m.title}
                    unit={units[m.title]}
                    yAxisId={`left${i + 1}`}
                    dataKey={m.title}
                    stroke={filterColors[i]}
                    activeDot={{ r: 8 }}
                    dot={false}
                  />
                ))
              }
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )
      : null
  )
}

export default React.memo(Chart);
