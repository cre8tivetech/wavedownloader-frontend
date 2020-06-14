import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import './themes/mixins.scss';
import './App.scss';
import './resources.scss';
import './themes/variables.scss';
import './themes/card.scss';
import './themes/button.scss';
import './themes/form.scss';
import './themes/update-faq.scss';

import { createStructuredSelector } from 'reselect';
import Header from './components/header/header.component';
import Home from './pages/home/home.component';
import PostByUsername from './components/instagram/post-by-username/post-by-username.component';
import PostByHashtag from './components/instagram/post-by-hashtag/post-by-hashtag.component';
import Highlight from './components/instagram/highlight/highlight.component';
import Stories from './components/instagram/stories/stories.component';
import InstagramPosts from './pages/instagram/posts.component';
import YoutubeVideo from './pages/youtube/video.component';
import TwitterVideo from './pages/twitter/video.component';
import UserNamePosts from './pages/instagram/username-posts.component';
import HashTagPosts from './pages/instagram/hashtag-posts.component';
import HighlightPosts from './pages/instagram/highlight-posts.component';
import StoryPosts from './pages/instagram/story-posts.component';
import PostsSpinner from './components/posts-spinner/posts-spinner.component';
import SignIn from './pages/auth/signin.component';
import SignUp from './pages/auth/signup.component';
import ChangePassword from './pages/auth/changePassword.component';
import ForgetPassword from './pages/auth/forgetPassword.component';
import Profile from './pages/profile/profile.component';
import Pricing from './pages/pricing/pricing.component';
import {
  selectCurrentUser,
  // selectSubscription,
  selectToken,
} from './redux/user/user.selector';
import {
  checkUserSession,
  signOutStart,
  // setMessage,
} from './redux/user/user.actions';
import Message from './components/message/message.component';
import Error404 from './pages/Error/error404.component';
import Alert from './components/message/alert.component';
import Confirmation from './pages/auth/confirmation.component';
import ResetPassword from './pages/auth/resetPassword.component';
import DownloadHistory from './pages/downloads/downloadHistory.component';

const App = ({ checkUserSession, currentUser, token, location, history }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession, currentUser, token]);

  useEffect(() => {
    ReactGA.initialize('UA-104203925-4');
    if (location.pathname.match('/') === '/') {
      ReactGA.pageview('/');
    } else {
      history.listen((locations) => ReactGA.pageview(locations.pathname));
    }
  }, [history]);

  const headerExclusionArray = ['/confirmation/', '/reset-password/'];
  return (
    <div className="App">
      {/* {location.pathname !== '/confirmation/' && <Header />} */}
      {headerExclusionArray.indexOf(location.pathname) < 0 && <Header />}
      <Alert />
      <Message />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/instagram/posts" component={InstagramPosts} />
        <Route exact path="/youtube/video" component={YoutubeVideo} />
        <Route exact path="/twitter/video" component={TwitterVideo} />
        <Route
          exact
          path="/instagram/post-by-username"
          render={() =>
            !currentUser ? (
              <Redirect
                to={{
                  pathname: '/signin',
                  state: { error: 'You need to Signin or Signup first' },
                }}
              />
            ) : !currentUser.is_subscribed ? (
              <Redirect
                to={{
                  pathname: '/pricing',
                  state: {
                    error:
                      'You have to make sure your email as being confirmed, and also subscribe to one of our paid package to have access to post-by-username',
                  },
                }}
              />
            ) : (
              <PostByUsername />
            )
          }
        />
        {/* Post-by-hashtag */}
        <Route
          exact
          path="/instagram/post-by-hashtag"
          render={() =>
            !currentUser ? (
              <Redirect
                to={{
                  pathname: '/signin',
                  state: { error: 'You need to Signin or Signup first' },
                }}
              />
            ) : !currentUser.is_subscribed ? (
              <Redirect
                to={{
                  pathname: '/pricing',
                  state: {
                    error:
                      'You have to make sure your email as being confirmed, and also subscribe to one of our paid package to have access to post-by-hashtag',
                  },
                }}
              />
            ) : (
              <PostByHashtag />
            )
          }
        />
        {/* Post-by-username */}
        <Route
          exact
          path="/instagram/highlight"
          render={() =>
            !currentUser ? (
              <Redirect
                to={{
                  pathname: '/signin',
                  state: { error: 'You need to Signin or Signup first' },
                }}
              />
            ) : !currentUser.is_subscribed ? (
              <Redirect
                to={{
                  pathname: '/pricing',
                  state: {
                    error:
                      'You have to make sure your email as being confirmed, and also subscribe to one of our paid package to have access to highlights',
                  },
                }}
              />
            ) : (
              <Highlight />
            )
          }
        />
        {/* Post-by-username */}
        <Route
          exact
          path="/instagram/stories"
          render={() =>
            !currentUser ? (
              <Redirect
                to={{
                  pathname: '/signin',
                  state: { error: 'You need to Signin or Signup first' },
                }}
              />
            ) : !currentUser.is_subscribed ? (
              <Redirect
                to={{
                  pathname: '/pricing',
                  state: {
                    error:
                      'You have to make sure your email as being confirmed, and also subscribe to one of our paid package to have access to stories',
                  },
                }}
              />
            ) : (
              <Stories />
            )
          }
        />
        {/* Post-by-username */}
        {/* <Route exact path="/username-posts" component={UserNamePosts} /> */}
        <Route
          exact
          path="/instagram/username-posts"
          render={() =>
            !currentUser ? (
              <Redirect
                to={{
                  pathname: '/signin',
                  state: { error: 'You need to Signin or Signup first' },
                }}
              />
            ) : !currentUser.is_subscribed ? (
              <Redirect
                to={{
                  pathname: '/pricing',
                  state: {
                    error:
                      'You have to make sure your email as being confirmed, and also subscribe to one of our paid package to have access to username posts',
                  },
                }}
              />
            ) : (
              <UserNamePosts />
            )
          }
        />
        {/* Post-by-username */}
        <Route
          exact
          path="/instagram/hashtag-posts"
          render={() =>
            !currentUser ? (
              <Redirect
                to={{
                  pathname: '/signin',
                  state: { error: 'You need to Signin or Signup first' },
                }}
              />
            ) : !currentUser.is_subscribed ? (
              <Redirect
                to={{
                  pathname: '/pricing',
                  state: {
                    error:
                      'You have to make sure your email as being confirmed, and also subscribe to one of our paid package to have access to hashtag posts',
                  },
                }}
              />
            ) : (
              <HashTagPosts />
            )
          }
        />
        {/* Post-by-username */}
        <Route
          exact
          path="/instagram/highlight-posts"
          render={() =>
            !currentUser ? (
              <Redirect
                to={{
                  pathname: '/signin',
                  state: { error: 'You need to Signin or Signup first' },
                }}
              />
            ) : !currentUser.is_subscribed ? (
              <Redirect
                to={{
                  pathname: '/pricing',
                  state: {
                    error:
                      'You have to make sure your email as being confirmed, and also subscribe to one of our paid package to have access to highlight posts',
                  },
                }}
              />
            ) : (
              <HighlightPosts />
            )
          }
        />
        {/* Post-by-username */}
        <Route
          exact
          path="/instagram/story-posts"
          render={() =>
            !currentUser ? (
              <Redirect
                to={{
                  pathname: '/signin',
                  state: { error: 'You need to Signin or Signup first' },
                }}
              />
            ) : !currentUser.is_subscribed ? (
              <Redirect
                to={{
                  pathname: '/pricing',
                  state: {
                    error:
                      'You have to make sure your email as being confirmed, and also subscribe to one of our paid package to have access to story posts',
                  },
                }}
              />
            ) : (
              <StoryPosts />
            )
          }
        />
        <Route
          path="/profile"
          render={() =>
            !currentUser ? <SignIn /> && <Redirect to="/signin" /> : <Profile />
          }
        />
        <Route
          exact
          path="/download-history"
          render={() =>
            currentUser &&
            currentUser.is_email_confirm &&
            currentUser.is_subscribed ? (
              <DownloadHistory />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          exact
          path="/pricing"
          render={() =>
            !currentUser ? <Redirect to="/signin" /> : <Pricing />
          }
        />
        <Route
          path="/signin"
          render={() => (currentUser ? <Redirect to="/profile" /> : <SignIn />)}
        />
        <Route
          path="/signup"
          render={() => (currentUser ? <Redirect to="/" /> : <SignUp />)}
        />
        <Route
          path="/change-password"
          render={() =>
            currentUser && currentUser.is_email_confirm ? (
              <ChangePassword />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/forgot-password"
          render={() =>
            currentUser ? <Redirect to="/" /> : <ForgetPassword />
          }
        />
        <Route exact path="/spinner" component={PostsSpinner} />
        <Route exact path="/confirmation/" component={Confirmation} />
        <Route exact path="/reset-password/" component={ResetPassword} />
        {/* add 404 page */}
        <Route path="*" component={Error404} />
        {/* <Footer /> */}
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  token: selectToken,
});
const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
  signOutStart: () => dispatch(signOutStart()),
  // setMessage: (message)=> dispatch(setMessage(message))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
