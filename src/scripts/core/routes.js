import React from "react";
import {Redirect, IndexRoute, Route} from "react-router";
import {createRoutesFromReactChildren} from "react-router/lib/RouteUtils";
import App from "../components/App";
import Home from "../components/pages/Home";
import Reviews from "../components/pages/Reviews";
import Briefings from "../components/pages/Briefings";
import Category from "../components/pages/Category";
import Article from "../components/pages/Article";
import Profile from "../components/pages/Profile";
import ManageArticles from "../components/pages/ManageArticles";
import ManagePromotions from "../components/pages/ManagePromotions";
import ManageBriefings from "../components/pages/ManageBriefings";
import ManagePromotion from "../components/pages/ManagePromotion";
import ManageArticle from "../components/pages/ManageArticle";
import ManageCategories from "../components/pages/ManageCategories";
import WriteArticle from "../components/pages/WriteArticle";
import WritePromotion from "../components/pages/WritePromotion";
import WriteBriefing from "../components/pages/WriteBriefing";
import SignUp from "../components/pages/SignUp";
import SignIn from "../components/pages/SignIn";
import SignOut from "../components/pages/SignOut";
import SignUpped from "../components/pages/SignUpped";

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="categories/:name" component={Category} />
    <Route path="articles/:id" component={Article} />
    <Route path="profile/:id" component={Profile} />
    <Route path="reviews" component={Reviews} />
    <Route path="briefings" component={Briefings} />
    <Route path="manage" component={ManageArticles} />
    <Route path="manage/write/article" component={WriteArticle} />
    <Route path="manage/write/promotion" component={WritePromotion} />
    <Route path="manage/write/briefing" component={WriteBriefing} />
    <Route path="manage/articles/mine" component={ManageArticles} />
    <Route path="manage/briefings/mine" component={ManageBriefings} />
    <Route path="manage/articles/:id" component={ManageArticle} />
    <Route path="manage/promotions/:id" component={ManagePromotions} />
    <Route path="manage/articles" component={ManageArticles} />
    <Route path="manage/promotions" component={ManagePromotions} />
    <Route path="manage/categories" component={ManageCategories} />
    <Route path="sign_up" component={SignUp} />
    <Route path="sign_in" component={SignIn} />
    <Route path="sign_out" component={SignOut} />
    <Route path="sign_upped" component={SignUpped} />
  </Route>
);

export const plain = createRoutesFromReactChildren(routes);

export default routes;
