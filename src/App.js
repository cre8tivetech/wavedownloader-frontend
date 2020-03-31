import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import './themes/variables.scss';
import './themes/card.scss';
import './themes/button.scss';
import './themes/form.scss';
import './themes/update-faq.scss';
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

const App = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/single-post" component={SinglePost} />
      <Route exact path="/post-by-username" component={PostByUsername} />
      <Route exact path="/post-by-hashtag" component={PostByHashtag} />
      <Route exact path="/highlight" component={Highlight} />
      <Route exact path="/stories" component={Stories} />
      <Route exact path="/posts" component={Posts} />
      <Route exact path="/username-posts" component={UserNamePosts} />
      <Route exact path="/hashtag-posts" component={HashTagPosts} />
      <Route exact path="/highlight-posts" component={HighlightPosts} />
      <Route exact path="/story-posts" component={StoryPosts} />

      <Route exact path="/spinner" component={PostsSpinner} />
      {/* <Footer /> */}
    </Switch>
  </div>
);

export default App;
