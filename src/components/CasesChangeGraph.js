import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import React from 'react';
import {MAX_HISTORY_DAYS} from '../../env';

export const CasesChangeGraph = (props) => {
  return (
    <LineChart
      data={{
        labels: sliceToNLast(props.labels, MAX_HISTORY_DAYS),
        datasets: [{data: sliceToNLast(props.data, MAX_HISTORY_DAYS)}],
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