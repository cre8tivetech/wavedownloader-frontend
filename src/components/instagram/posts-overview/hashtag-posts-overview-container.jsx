import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  selectIsCollectionFetching,
  selectError,
  selectCollection,
  selectIsCollectionsLoaded,
} from '../../../redux/instagram/instagram.selector';
import PostsSpinner from '../../posts-spinner/posts-spinner.component';
import HashTagPostsOverview from './hashtag-posts-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
  postError: selectError,
  collection: selectCollection,
  isLoaded: selectIsCollectionsLoaded,
});

const HashTagPostsOverviewContainer = compose(
  connect(mapStateToProps),
  PostsSpinner
)(HashTagPostsOverview);

export default HashTagPostsOverviewContainer;
