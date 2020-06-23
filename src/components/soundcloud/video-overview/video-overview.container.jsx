import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import {
  selectIsCollectionFetching,
  selectError,
  selectCollections,
  selectIsCollectionsLoaded
} from "../../../redux/soundcloud/soundcloud.selectors";
import VideoOverview from "./video-overview.component";
import PostsSpinner from "../../posts-spinner/posts-spinner.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching,
  postError: selectError,
  collection: selectCollections,
  isLoaded: selectIsCollectionsLoaded
});

const VideoOverviewContainer = compose(
  connect(mapStateToProps),
  PostsSpinner
)(VideoOverview);

export default VideoOverviewContainer;
