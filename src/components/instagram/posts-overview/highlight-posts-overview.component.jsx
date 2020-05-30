import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectHighlightCollections,
  selectError
} from "../../../redux/posts/posts.selector";
import "./posts-overview.styles.scss";
import HighlightCollectionPreview from "../post-preview/highlight-collection-preview.component";

const HighlightPostsOverview = ({ highlights, errorMessage }) => {
  // const downloadName = source.split('/');
  // const link = { url: source, downloadName: downloadName[4] };
  const [error, setError] = useState();
  useEffect(() => {
    setError({ errorMessage: errorMessage });
  }, [errorMessage]);
  return highlights ? (
    <div className="posts-overview">
      {/* {collections.map(({ ,...otherCollectionProps }) => ( */}
      <HighlightCollectionPreview {...highlights} {...error} />
      {/* ))} */}
    </div>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  highlights: selectHighlightCollections,
  errorMessage: selectError
});

export default connect(mapStateToProps)(HighlightPostsOverview);
