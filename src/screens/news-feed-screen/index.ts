import {State} from '../../types';
import {bindActionCreators, Dispatch} from 'redux';
import {fetchCovidNews} from '../../redux/actions';
import {connect} from 'react-redux';
import {
  NewsFeedScreen as NewsFeedScreenComponent,
  NewsFeedScreenDispatchProps,
  NewsFeedScreenStateProps,
} from './news-feed-screen';

const mapStateToProps = (state: State) => {
  return {
    articles: state.articles,
    pending: state.pending,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchCovidNewsAction: fetchCovidNews,
    },
    dispatch,
  );

export const NewsFeedScreen = connect<
  NewsFeedScreenStateProps,
  NewsFeedScreenDispatchProps
>(
  mapStateToProps,
  mapDispatchToProps,
)(NewsFeedScreenComponent);
