import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { fetchStoryPostsStart } from "../../redux/posts/posts.actions";
import StoryPostsOverviewContainer from "../../components/posts-overview/story-posts-overview.container";
import { checkUserSession } from "../../redux/user/user.actions";

const StoryPosts = ({
    fetchStoryPostsStart,
    checkUserSession,
    // match
  }) => {
  useEffect(() => {
    checkUserSession();
    fetchStoryPostsStart();
  }, [fetchStoryPostsStart, checkUserSession]);

  return (
    <div className="post-section">
      <Route
        exact
        // path={`${match.path}`}
        component={StoryPostsOverviewContainer}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchStoryPostsStart: () => dispatch(fetchStoryPostsStart()),
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(null, mapDispatchToProps)(StoryPosts);
