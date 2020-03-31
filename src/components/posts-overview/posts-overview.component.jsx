import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCollection,
  selectSlideCollection,
  selectSource,
  selectError
} from "../../redux/posts/posts.selector";
import "./posts-overview.styles.scss";
import PostPreview from "../post-preview/post-preview.component";
import PostCollectionPreview from "../post-preview/post-collection-preview.component";

const PostsOverview = ({
  collections,
  slideCollections,
  // source,
  errorMessage
}) => {
  // const downloadName = source.split('/');
  // const link = { url: source, downloadName: downloadName[4] };
  const [error, setError] = useState();
  useEffect(() => {
    setError({ errorMessage: errorMessage });
  }, [errorMessage]);
  return collections ? (
    <div className="posts-overview">
      {/* {collections.map(({ ,...otherCollectionProps }) => ( */}
      <PostPreview {...collections} {...error} />
      {/* ))} */}
    </div>
  ) : slideCollections ? (
    <div className="posts-overview">
      {/* {slideCollections.post.map(({ ...otherCollectionProps }, i) => (
        <PostCollectionPreview key={i} {...otherCollectionProps} />
      ))} */}
      <PostCollectionPreview {...slideCollections} {...error} />
    </div>
  ) : (
    <div></div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollection,
  slideCollections: selectSlideCollection,
  source: selectSource,
  errorMessage: selectError
});

export default connect(mapStateToProps)(PostsOverview);
