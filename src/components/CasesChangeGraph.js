import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import React from 'react';
import {NUMBER_OF_DAYS_MAX} from './CountryDetailCard';

export const CasesChangeGraph = (props) => {
  return (
    <LineChart
      data={{
        labels: sliceToNLast(props.labels, NUMBER_OF_DAYS_MAX),
        datasets: [{data: sliceToNLast(props.data, NUMBER_OF_DAYS_MAX)}],
      }}
      width={Dimensions.get('window').width - 80}
      height={300}
      fromZero
      verticalLabelRotation={90}
      xLabelsOffset={1}
      chartConfig={{
        backgroundColor: 'white',
        backgroundGradientFrom: 'white',
        backgroundGradientTo: 'white',
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `#000`,
      }}
    />
  );
};

function sliceToNLast(data, n) {
  return data.slice(Math.max(data.length-n, 0));
}