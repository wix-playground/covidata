import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';
import {MAX_HISTORY_DAYS} from '../../../env';
import {sliceToNLast} from '../../utils/helper-methods';

export const CasesChangeGraph = React.memo(function CasesChangeGraph({
  labels,
  data,
}) {
  return (
    <LineChart
      data={{
        labels: sliceToNLast(labels, MAX_HISTORY_DAYS),
        datasets: [{data: sliceToNLast(data, MAX_HISTORY_DAYS)}],
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
        color: (opacity = 1) => '#000',
      }}
    />
  );
});

CasesChangeGraph.propTypes = {
  labels: PropTypes.array,
  data: PropTypes.array,
};
