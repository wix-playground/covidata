import React from 'react';
import {CountryRow} from '../../components/country-row/country-row';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {CountryListScreenComponent} from '../../components/country-list-screen-component/country-list-screen-component';

export class CountryListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  render() {
    return (
      <CountryListScreenComponent
        countries={this.props.countries}
        renderItem={this.renderItem}
      />
    );
  }

  renderItem({item}) {
    return <CountryRow componentId={this.props.componentId} country={item} />;
  }
}

CountryListScreen.propTypes = {
  componentId: PropTypes.string,
  countries: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    countries: state.countries,
  };
};

export default connect(mapStateToProps)(CountryListScreen);
