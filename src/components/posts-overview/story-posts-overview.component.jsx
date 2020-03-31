import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectStoryCollections,
  selectError
} from "../../redux/posts/posts.selector";
import "./posts-overview.styles.scss";
import StoryCollectionPreview from "../post-preview/story-collection-preview.component";

const StoryPostsOverview = ({ stories, errorMessage }) => {
  // const downloadName = source.split('/');
  // const link = { url: source, downloadName: downloadName[4] };
  const [error, setError] = useState();
  useEffect(() => {
    setError({ errorMessage: errorMessage });
  }, [errorMessage]);
  return stories ? (
    <div className="posts-overview">
      {/* {collections.map(({ ,...otherCollectionProps }) => ( */}
      <StoryCollectionPreview {...stories} {...error} />
      {/* ))} */}
    </div>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  stories: selectStoryCollections,
  errorMessage: selectError
});

export default connect(mapStateToProps)(StoryPostsOverview);
