import {Badge} from 'react-native-ui-lib';
import React, {Component} from 'react';

export class ConditionalBadge extends Component{
  constructor(props) {
    super(props);
  }
  render () {
    return (<Badge
      label={`+${Number(this.props.new_confirmed)}`}
      backgroundColor={this.getBadgeColor(this.props.new_confirmed, this.props.recoveries)}
      testID={this.props.testID}/>);
  }
  getBadgeColor(number, recoveries = false) {
    return recoveries
      ? (number > 0
        ? 'green'
        : 'orange')
      : (number > 0
        ? 'red'
        : 'green');
  }
}
