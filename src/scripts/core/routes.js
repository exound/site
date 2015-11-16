import React from "react";
import {Redirect, IndexRoute, Route} from "react-router";
import {createRoutesFromReactChildren} from "react-router/lib/RouteUtils";
import App from "../components/App";
import Home from "../components/pages/Home";
import Reviews from "../components/pages/Reviews";
import Category from "../components/pages/Category";
import Article from "../components/pages/Article";
import Profile from "../components/pages/Profile";
import ManageArticles from "../components/pages/ManageArticles";
import ManagePromotions from "../components/pages/ManagePromotions";
import ManagePromotion from "../components/pages/ManagePromotion";
import ManageArticle from "../components/pages/ManageArticle";
import WriteArticle from "../components/pages/WriteArticle";
import WritePromotion from "../components/pages/WritePromotion";
import SignUp from "../components/pages/SignUp";
import SignIn from "../components/pages/SignIn";
import SignOut from "../components/pages/SignOut";

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="categories/:name" component={Category} />
    <Route path="articles/:id" component={Article} />
    <Route path="profile/:id" component={Profile} />
    <Route path="reviews" component={Reviews} />
    <Route path="manage" component={ManageArticles} />
    <Route path="manage/write/article" component={WriteArticle} />
    <Route path="manage/write/promotion" component={WritePromotion} />
    <Route path="manage/articles/mine" component={ManageArticles} />
    <Route path="manage/articles/:id" component={ManageArticle} />
    <Route path="manage/promotions/:id" component={ManagePromotion} />
    <Route path="manage/articles" component={ManageArticles} />
    <Route path="manage/promotions" component={ManagePromotions} />
    <Route path="sign_up" component={SignUp} />
    <Route path="sign_in" component={SignIn} />
    <Route path="sign_out" component={SignOut} />
  </Route>
);

export const plain = createRoutesFromReactChildren(routes);

export default routes;
