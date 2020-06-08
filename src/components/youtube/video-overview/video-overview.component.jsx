import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectCollections,
  selectError,
} from '../../../redux/youtube/youtube.selectors';
import VideoPreview from '../video-preview/video-preview.component';
import Error404 from '../../../pages/Error/error404.component';

const VideoOverview = ({
  collections,
  // source,
  errorMessage,
  history,
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
      <VideoPreview {...collections} {...error} />
      {/* ))} */}
    </div>
  ) : (
    <Error404 />
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollections,
  errorMessage: selectError,
});

export default connect(mapStateToProps)(VideoOverview);
