import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import SEO from '../../components/seo/seo.component';
import { fetchHighlightPostsStart } from '../../redux/instagram/instagram.actions';
import HighlightPostsOverviewContainer from '../../components/instagram/posts-overview/highlight-posts-overview.container';
import { checkUserSession } from '../../redux/user/user.actions';
import Footer from '../../components/footer/footer.component';

const HighlightPosts = ({
  fetchHighlightPostsStart,
  checkUserSession,
  // match
}) => {
  useEffect(() => {
    checkUserSession();
    fetchHighlightPostsStart();
  }, [fetchHighlightPostsStart, checkUserSession]);

  return (
    <div className="post-section">
      <SEO title="Download Instagram user highlights" />
      <Route
        exact
        // path={`${match.path}`}
        component={HighlightPostsOverviewContainer}
      />
      <Footer />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchHighlightPostsStart: () => dispatch(fetchHighlightPostsStart()),
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(null, mapDispatchToProps)(HighlightPosts);
