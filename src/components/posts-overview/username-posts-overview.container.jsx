import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  selectIsCollectionFetching,
  // selectIsSlideCollectionFetching,
  selectError,
  selectCollection,
  selectIsCollectionsLoaded,
} from '../../redux/posts/posts.selector';
import UserNamePostsOverview from './username-posts-overview.component';
import PostsSpinner from '../posts-spinner/posts-spinner.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
  postError: selectError,
  collection: selectCollection,
  isLoaded: selectIsCollectionsLoaded,
});

const UserNamePostsOverviewContainer = compose(
  connect(mapStateToProps),
  PostsSpinner
)(UserNamePostsOverview);

export default UserNamePostsOverviewContainer;
