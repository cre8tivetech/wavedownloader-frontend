import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
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
import SinglePost from './components/single-post/single-post.component';
import PostByUsername from './components/post-by-username/post-by-username.component';
import PostByHashtag from './components/post-by-hashtag/post-by-hashtag.component';
import Highlight from './components/highlight/highlight.component';
import Stories from './components/stories/stories.component';
import Posts from './pages/posts/posts.component';
import UserNamePosts from './pages/posts/username-posts.component';
import HashTagPosts from './pages/posts/hashtag-posts.component';
import HighlightPosts from './pages/posts/highlight-posts.component';
import StoryPosts from './pages/posts/story-posts.component';
import PostsSpinner from './components/posts-spinner/posts-spinner.component';
import SignIn from './pages/auth/signin.component';
import SignUp from './pages/auth/signup.component';
import Profile from './pages/profile/profile.component';

import Pricing from './pages/pricing/pricing.component';
import { selectCurrentUser, selectSubscription } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';
import Message from './components/message/message.component';
import Error404 from './pages/Error/error404.component';


const App = ({ checkUserSession, currentUser, subscription}) => {
  useEffect(() => {
    checkUserSession();
    console.log(subscription);
  }, [checkUserSession, currentUser, subscription]);
  return (
    <div className="App">
      <Header />
      <Message />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/single-post" component={SinglePost} />
        {/* Post-by-username */}
        {/* <Route exact path="/post-by-username" component={PostByUsername} /> */}
        <Route
          exact
          path="/post-by-username"
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
          path="/post-by-hashtag"
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
          path="/highlight"
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
          path="/stories"
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
          path="/username-posts"
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
          path="/hashtag-posts"
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
          path="/highlight-posts"
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
          path="/story-posts"
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
            !currentUser ? <Home /> && <Redirect to="/" /> : <Profile />
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
          render={() => (currentUser ? <Redirect to="/" /> : <SignIn />)}
        />
        <Route
          path="/signup"
          render={() => (currentUser ? <Redirect to="/" /> : <SignUp />)}
        />
        <Route exact path="/spinner" component={PostsSpinner} />
        {/* add 404 page */ }
        <Route path="*" component={Error404} />
        {/* <Footer /> */}
      </Switch>
    </div>
  );};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  subscription: selectSubscription
});
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
