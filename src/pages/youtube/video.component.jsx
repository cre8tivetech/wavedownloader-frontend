import React, { useEffect } from "react";
// import { connect } from "react-redux";
import { Route } from "react-router-dom";
import VideoOverviewContainer from "../../components/youtube/video-overview/video-overview.container";

const Video = ({ match }) => {

  return (
    <div className="post-section">
      <Route
        exact
        // path={`${match.path}`}
        component={VideoOverviewContainer}
      />
    </div>
  );
};

export default Video;
