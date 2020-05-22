import {LineChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import React, {Component} from 'react';
import {MAX_HISTORY_DAYS} from '../../env';

export class CasesChangeGraph extends Component {
  /* empty constructor can be omitted */
  constructor(props) {
    super(props)
  }
  /* separate methods with new lines :) */
  render() {
    return (
      <LineChart
        data={{
          labels: this.sliceToNLast(this.props.labels, MAX_HISTORY_DAYS),
          datasets: [{data: this.sliceToNLast(this.props.data, MAX_HISTORY_DAYS)}],
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
  /* this looks like a util function for manipulating data, can be moved outside of component */
  sliceToNLast(data, n) {
    return data.slice(Math.max(data.length-n, 0));
  }
}

