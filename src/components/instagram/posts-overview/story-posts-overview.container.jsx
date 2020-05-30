import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import {
  selectIsCollectionFetching,
  selectStoryCollections,
  selectIsCollectionsLoaded,
  selectError
} from "../../../redux/posts/posts.selector";
import PostsSpinner from "../../posts-spinner/posts-spinner.component";
import StoryPostsOverview from "./story-posts-overview.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
  postError: selectError,
  storyCollections: selectStoryCollections,
  isLoaded: selectIsCollectionsLoaded
});

const StoryPostsOverviewContainer = compose(
  connect(mapStateToProps),
  PostsSpinner
)(StoryPostsOverview);

export default StoryPostsOverviewContainer;
