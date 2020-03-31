import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectUserCollections,
  selectError,
} from '../../redux/posts/posts.selector';

import './posts-overview.styles.scss';
import UserNameCollectionPreview from '../post-preview/username-collection-preview.component';
const UserNamePostsOverview = ({ userCollections, errorMessage }) => {
  const [error, setError] = useState();
  useEffect(() => {
    setError({ errorMessage: errorMessage });
  }, [errorMessage]);
  console.log(userCollections);
  return userCollections ? (
    <div className="posts-overview">
      <UserNameCollectionPreview {...userCollections} {...error} />
    </div>
  ) : (
    <div></div>
  );
};

const mapStateToProps = createStructuredSelector({
  userCollections: selectUserCollections,
  errorMessage: selectError,
});

export default connect(mapStateToProps)(UserNamePostsOverview);
