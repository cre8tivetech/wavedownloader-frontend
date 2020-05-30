import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { fetchHashTagPostsStart } from "../../redux/posts/posts.actions";
import HashTagPostsOverviewContainer from "../../components/instagram/posts-overview/hashtag-posts-overview-container";
import { checkUserSession } from "../../redux/user/user.actions";

const HashTagPosts = ({
    fetchHashTagPostsStart,
    checkUserSession,
    // match
  }) => {
  useEffect(() => {
    checkUserSession();
    fetchHashTagPostsStart();
  }, [fetchHashTagPostsStart, checkUserSession]);

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
  fetchHashTagPostsStart: () => dispatch(fetchHashTagPostsStart()),
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(null, mapDispatchToProps)(HashTagPosts);
