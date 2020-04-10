import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { fetchUserNamePostsStart } from "../../redux/posts/posts.actions";
import UserNamePostsOverviewContainer from "../../components/posts-overview/username-posts-overview.container";

const UserNamePosts = ({ fetchUserNamePostsStart, match }) => {
  // console.log(match.path);
  useEffect(() => {
    fetchUserNamePostsStart();
  }, [fetchUserNamePostsStart]);

  return (
    <div className="post-section">
      <Route
        exact
        // path={`${match.path}`}
        component={UserNamePostsOverviewContainer}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchUserNamePostsStart: () => dispatch(fetchUserNamePostsStart())
});

export default connect(null, mapDispatchToProps)(UserNamePosts);
