import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import {
  selectIsCollectionFetching,
  selectIsSlideCollectionFetching,
  selectIsSingleHighlightCollectionFetching,
  selectError,
  selectCollection,
  selectIsCollectionsLoaded
} from "../../../redux/instagram/instagram.selector";
import PostsOverview from "./posts-overview.component";
import PostsSpinner from "../../posts-spinner/posts-spinner.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
  isSlide: selectIsSlideCollectionFetching,
  isSingleHighlight: selectIsSingleHighlightCollectionFetching,
  postError: selectError,
  collection: selectCollection,
  isLoaded: selectIsCollectionsLoaded
});

const PostsOverviewContainer = compose(
  connect(mapStateToProps),
  PostsSpinner
)(PostsOverview);

export default PostsOverviewContainer;
