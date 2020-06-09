import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import SEO from '../../components/seo/seo.component';
import { fetchStoryPostsStart } from '../../redux/instagram/instagram.actions';
import StoryPostsOverviewContainer from '../../components/instagram/posts-overview/story-posts-overview.container';
import { checkUserSession } from '../../redux/user/user.actions';
import Footer from '../../components/footer/footer.component';

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
      <SEO title="Download Instagram user stories" />
      <Route
        exact
        // path={`${match.path}`}
        component={StoryPostsOverviewContainer}
      />
      <Footer />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchStoryPostsStart: () => dispatch(fetchStoryPostsStart()),
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(null, mapDispatchToProps)(StoryPosts);
