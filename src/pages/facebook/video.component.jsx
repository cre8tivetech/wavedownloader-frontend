import React from 'react';
import { Route } from 'react-router-dom';
import SEO from '../../components/seo/seo.component';
import VideoOverviewContainer from '../../components/facebook/video-overview/video-overview.container';
import Footer from '../../components/footer/footer.component';

const Video = ({ match }) => {
  return (
    <div className="post-section">
      <SEO title="Download Facebook video" />
      <Route
        exact
        component={VideoOverviewContainer}
      />
      <Footer />
    </div>
  );
};

export default Video;
