import React from 'react';
import {HomeScreenComp} from '../components/home-screen-comp';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {fetchSummary} from '../redux/actions';
import {LoaderScreen} from '@wix/wix-react-native-ui-lib';
import {CountryDetailCard} from '../components/country-detail-card';

class HomeScreen extends React.Component {
  componentDidMount() {
    this.props.fetchSummaryAction();
    this.renderItem = this.renderItem.bind(this);
  }

  render() {
    return this.props.pending ? (
      <LoaderScreen overlay />
    ) : (
      <HomeScreenComp
        globalData={this.props.globalData}
        countries={this.props.countries}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }

  renderItem({item}) {
    return this.props.tracked.includes(item.Slug) ? (
      <CountryDetailCard country={item} />
    ) : null;
  }

  keyExtractor(item) {
    return item.Slug;
  }
}

HomeScreen.propTypes = {
  fetchSummaryAction: PropTypes.func,
  pending: PropTypes.bool,
  globalData: PropTypes.object,
  countries: PropTypes.array,
  tracked: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    pending: state.pending,
    globalData: state.globalData,
    countries: state.countries,
    tracked: state.tracked,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchSummaryAction: fetchSummary,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
