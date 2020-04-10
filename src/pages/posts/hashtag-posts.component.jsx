import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { fetchHashTagPostsStart } from "../../redux/posts/posts.actions";
import HashTagPostsOverviewContainer from "../../components/posts-overview/hashtag-posts-overview-container";
const HashTagPosts = ({ fetchHashTagPostsStart, match }) => {
  useEffect(() => {
    fetchHashTagPostsStart();
  }, [fetchHashTagPostsStart]);

  return (
    <div className="post-section">
      <Route
        exact
        // path={`${match.path}`}
        component={HashTagPostsOverviewContainer}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchHashTagPostsStart: () => dispatch(fetchHashTagPostsStart())
});

export default connect(null, mapDispatchToProps)(HashTagPosts);
