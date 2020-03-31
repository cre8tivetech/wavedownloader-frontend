import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import {
  selectIsCollectionFetching,
  selectHighlightCollections,
  selectIsCollectionsLoaded,
  selectError
} from "../../redux/posts/posts.selector";
import PostsSpinner from "../posts-spinner/posts-spinner.component";
import HighlightPostsOverview from "./highlight-posts-overview.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
  postError: selectError,
  highlightCollections: selectHighlightCollections,
  isLoaded: selectIsCollectionsLoaded
});

const HighlightPostsOverviewContainer = compose(
  connect(mapStateToProps),
  PostsSpinner
)(HighlightPostsOverview);

export default HighlightPostsOverviewContainer;
