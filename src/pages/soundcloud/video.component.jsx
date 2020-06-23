import React from 'react';
import { Route } from 'react-router-dom';
import SEO from '../../components/seo/seo.component';
import VideoOverviewContainer from '../../components/soundcloud/video-overview/video-overview.container';
import Footer from '../../components/footer/footer.component';

const Video = ({ match }) => {
  return (
    <div className="post-section">
      <SEO title="Download SoundCloud Audio" />
      <Route
        exact
        // path={`${match.path}`}
        component={VideoOverviewContainer}
      />
      <Footer />
    </div>
  );
};

export default Video;
