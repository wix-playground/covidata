import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import React, {Component} from 'react';
import {MAX_HISTORY_DAYS} from '../../env';

export class CasesChangeGraph extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <LineChart
        data={{
          labels: this.sliceToNLast(props.labels, MAX_HISTORY_DAYS),
          datasets: [{data: this.sliceToNLast(props.data, MAX_HISTORY_DAYS)}],
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
  }
  sliceToNLast(data, n) {
    return data.slice(Math.max(data.length-n, 0));
  }
}

