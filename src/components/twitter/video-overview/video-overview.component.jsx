import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCollections,
  selectTwitterUser,
  selectError,
} from '../../../redux/twitter/twitter.selectors';
import VideoPreview from '../video-preview/video-preview.component';
import Error404 from '../../../pages/Error/error404.component';

const VideoOverview = ({
  collections,
  twitterUser,
  errorMessage,
  history,
}) => {
  const [error, setError] = useState();
  useEffect(() => {
    setError({ errorMessage: errorMessage });
  }, [errorMessage]);
  return collections ? (
    <div className="posts-overview">
      {/* {collections.map(({ ,...otherCollectionProps }) => ( */}
      <VideoPreview {...collections} twitterUser={twitterUser} {...error} />
      {/* ))} */}
    </div>
  ) : (
    <Error404 />
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
  twitterUser: selectTwitterUser,
  errorMessage: selectError,
});

export default connect(mapStateToProps)(VideoOverview);
