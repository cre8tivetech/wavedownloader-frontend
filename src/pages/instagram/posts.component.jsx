import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { fetchPostsStart } from "../../redux/instagram/instagram.actions";
import PostsOverviewContainer from "../../components/instagram/posts-overview/posts-overview.container";

const Posts = ({ fetchPostsStart, match }) => {
  useEffect(() => {
    fetchPostsStart();
  }, [fetchPostsStart]);

  return (
    <div className="post-section">
      <Route
        exact
        // path={`${match.path}`}
        component={PostsOverviewContainer}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchPostsStart: () => dispatch(fetchPostsStart())
});

export default connect(null, mapDispatchToProps)(Posts);
