import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import SEO from '../../components/seo/seo.component';
import { createStructuredSelector } from 'reselect';
import { fetchPostsStart } from '../../redux/instagram/instagram.actions';
import PostsOverviewContainer from '../../components/instagram/posts-overview/posts-overview.container';
import Footer from '../../components/footer/footer.component';

const Posts = ({ fetchPostsStart, match }) => {
  useEffect(() => {
    fetchPostsStart();
  }, [fetchPostsStart]);

  return (
    <div className="post-section">
      <SEO title="Download Instagram posts" />
      <Route
        exact
        // path={`${match.path}`}
        component={PostsOverviewContainer}
      />
      <Footer />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchPostsStart: () => dispatch(fetchPostsStart()),
});

export default connect(null, mapDispatchToProps)(Posts);
