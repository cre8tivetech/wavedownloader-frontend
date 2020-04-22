import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectStoryCollections,
  selectStoryForm,
  selectError,
} from '../../redux/posts/posts.selector';
import './posts-overview.styles.scss';
import StoryCollectionPreview from '../post-preview/story-collection-preview.component';
import NoStory from '../../pages/Error/no-story.component';

const StoryPostsOverview = ({ stories, errorMessage, credentials }) => {
  const [error, setError] = useState();
  useEffect(() => {
    setError({ errorMessage: errorMessage });
  }, [errorMessage]);
  return stories.post ? (
    <div className="posts-overview">
      {/* {collections.map(({ ,...otherCollectionProps }) => ( */}
      <StoryCollectionPreview {...stories} {...error} />
      {/* ))} */}
    </div>
  ) : (
    <NoStory userName={credentials} />
  );
};

const mapStateToProps = createStructuredSelector({
  stories: selectStoryCollections,
  credentials: selectStoryForm,
  errorMessage: selectError,
});

export default connect(mapStateToProps)(StoryPostsOverview);
