import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectHashTagCollections,
  selectHashTagPostType,
  selectError
} from "../../../redux/instagram/instagram.selector";

import "./posts-overview.styles.scss";
import HashTagCollectionPreview from "../post-preview/hashtag-collection-preview.component";
const HashTagPostsOverview = ({
  hashTagCollections,
  hashTagPostType,
  errorMessage
}) => {
  const [error, setError] = useState();
  useEffect(() => {
    setError({ errorMessage: errorMessage });
  }, [errorMessage]);
  return hashTagCollections ? (
    <div className="posts-overview">
      <HashTagCollectionPreview
        {...hashTagCollections}
        {...hashTagPostType}
        {...error}
      />
    </div>
  ) : (
    <div></div>
  );
};

const mapStateToProps = createStructuredSelector({
  hashTagCollections: selectHashTagCollections,
  hashTagPostType: selectHashTagPostType,
  errorMessage: selectError
});

export default connect(mapStateToProps)(HashTagPostsOverview);
