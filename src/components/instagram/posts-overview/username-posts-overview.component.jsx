import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectUserCollections,
  selectCredentials,
  selectError,
} from '../../../redux/posts/posts.selector';

import './posts-overview.styles.scss';
import UserNameCollectionPreview from '../post-preview/username-collection-preview.component';
import PrivateUser from '../../../pages/Error/privat-user.component';
const UserNamePostsOverview = ({
    userCollections,
    errorMessage,
    credentials
  }) => {
  const [error, setError] = useState();
  useEffect(() => {
    setError({ errorMessage: errorMessage });
  }, [errorMessage]);
  if (Object.keys(userCollections.data).length == 0) {
    return <PrivateUser {
      ...credentials
    }
    />
  } 
  else if (Object.keys(userCollections.data).length > 0) {
    return <div className = "posts-overview" >
      <UserNameCollectionPreview {...userCollections} {...error} />
    </div>
  }
};

const mapStateToProps = createStructuredSelector({
  userCollections: selectUserCollections,
  credentials: selectCredentials,
  errorMessage: selectError,
});

export default connect(mapStateToProps)(UserNamePostsOverview);
