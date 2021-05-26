import React from 'react';
import PropTypes from 'prop-types';
import {CountryDetailScreenComponent} from '../../components/country-detail-screen-component/country-detail-screen-component';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchCountryStats, setCountryTracked} from '../../redux/actions';
import {LoaderScreen} from 'react-native-ui-lib';

class CountryDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: this.props.country,
    };
    this.onValueChange = this.onValueChange.bind(this);
  }

  componentDidMount() {
    const countrySlug = this.props.country.slug;
    this.props.fetchCountryStatsAction(countrySlug);
  }

  render() {
    return this.props.pending ? (
      <LoaderScreen overlay />
    ) : (
      <CountryDetailScreenComponent
        country={this.state.country}
        track={this.props.tracked.includes(this.props.country.slug)}
        onValueChange={this.onValueChange}
        labels={this.props.labels}
        data={this.props.data}
      />
    );
  }

  onValueChange(value) {
    this.props.setCountryTrackedAction(this.props.country.slug, value);
  }
}

CountryDetailScreen.propTypes = {
  country: PropTypes.object,
  fetchCountryStatsAction: PropTypes.func,
  labels: PropTypes.array,
  data: PropTypes.array,
  pending: PropTypes.bool,
  setCountryTrackedAction: PropTypes.func,
  tracked: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
    labels: state.labels,
    pending: state.pending,
    tracked: state.tracked,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchCountryStatsAction: fetchCountryStats,
      setCountryTrackedAction: setCountryTracked,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountryDetailScreen);
