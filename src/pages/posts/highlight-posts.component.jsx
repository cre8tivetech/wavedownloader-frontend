import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { fetchHighlightPostsStart } from "../../redux/posts/posts.actions";
import HighlightPostsOverviewContainer from "../../components/posts-overview/highlight-posts-overview.container";
const HighlightPosts = ({ fetchHighlightPostsStart, match }) => {
  useEffect(() => {
    fetchHighlightPostsStart();
  }, [fetchHighlightPostsStart]);

  return (
    <div className="post-section">
      <Route
        exact
        // path={`${match.path}`}
        component={HighlightPostsOverviewContainer}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchHighlightPostsStart: () => dispatch(fetchHighlightPostsStart())
});

export default connect(null, mapDispatchToProps)(HighlightPosts);
