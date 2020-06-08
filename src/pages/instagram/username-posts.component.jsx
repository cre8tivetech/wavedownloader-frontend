import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import SEO from "../../components/seo/seo.component";
import { fetchUserNamePostsStart } from "../../redux/instagram/instagram.actions";
import UserNamePostsOverviewContainer from "../../components/instagram/posts-overview/username-posts-overview.container";
import { checkUserSession } from "../../redux/user/user.actions";

const UserNamePosts = ({
    fetchUserNamePostsStart,
    checkUserSession,
    // match
  }) => {
  // console.log(match.path);
  useEffect(() => {
    checkUserSession();
    fetchUserNamePostsStart();
  }, [fetchUserNamePostsStart, checkUserSession]);

  return (
    <div className="post-section">
      <SEO title="Download Instagram user posts" />
      <Route
        exact
        // path={`${match.path}`}
        component={UserNamePostsOverviewContainer}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchUserNamePostsStart: () => dispatch(fetchUserNamePostsStart()),
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(null, mapDispatchToProps)(UserNamePosts);
