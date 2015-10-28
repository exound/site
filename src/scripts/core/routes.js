import React from "react";
import {Redirect, IndexRoute, Route} from "react-router";
import {createRoutesFromReactChildren} from "react-router/lib/RouteUtils";
import App from "../components/App";
import Home from "../components/pages/Home";
import Category from "../components/pages/Category";
import Article from "../components/pages/Article";
import Profile from "../components/pages/Profile";
import Reviews from "../components/pages/Reviews";
import Review from "../components/pages/Review";
import ManageMyArticles from "../components/pages/ManageMyArticles";
import ManageArticle from "../components/pages/ManageArticle";
import SignUp from "../components/pages/SignUp";
import SignIn from "../components/pages/SignIn";
import SignOut from "../components/pages/SignOut";

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="categories/:name" component={Category} />
    <Route path="articles/:id" component={Article} />
    <Route path="profile/:id" component={Profile} />
    <Route path="reviews" component={Reviews}>
      <Route path=":id" component={Review} />
    </Route>
    <Route path="manage" component={ManageMyArticles} />
    <Route path="manage/articles/mine" component={ManageMyArticles} />
    <Route path="manage/articles/:id" component={ManageArticle} />
    <Route path="sign_up" component={SignUp} />
    <Route path="sign_in" component={SignIn} />
    <Route path="sign_out" component={SignOut} />
  </Route>
);

export const plain = createRoutesFromReactChildren(routes);

export default routes;
