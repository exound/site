import React from "react";
import {Redirect, IndexRoute, Route} from "react-router";
import {createRoutesFromReactChildren} from "react-router/lib/RouteUtils";
import App from "../components/App";
import Home from "../components/pages/Home";
import Reviews from "../components/pages/Reviews";
import Staffs from "../components/pages/Staffs";
import Briefings from "../components/pages/Briefings";
import Community from "../components/pages/Community";
import Category from "../components/pages/Category";
import Search from "../components/pages/Search";
import Article from "../components/pages/Article";
import Page from "../components/pages/Page";
import Profile from "../components/pages/Profile";
import ManageArticles from "../components/pages/ManageArticles";
import ManagePromotions from "../components/pages/ManagePromotions";
import ManageBriefings from "../components/pages/ManageBriefings";
import ManageLinks from "../components/pages/ManageLinks";
import ManageStaffs from "../components/pages/ManageStaffs";
import ManagePages from "../components/pages/ManagePages";
import ManagePromotion from "../components/pages/ManagePromotion";
import ManageArticle from "../components/pages/ManageArticle";
import ManagePage from "../components/pages/ManagePage";
import ManageBriefing from "../components/pages/ManageBriefing";
import ManageCategories from "../components/pages/ManageCategories";
import ManageProfile from "../components/pages/ManageProfile";
import ManageLink from "../components/pages/ManageLink";
import WriteArticle from "../components/pages/WriteArticle";
import WriteDiscussion from "../components/pages/WriteDiscussion";
import WritePage from "../components/pages/WritePage";
import WritePromotion from "../components/pages/WritePromotion";
import WriteBriefing from "../components/pages/WriteBriefing";
import WriteLink from "../components/pages/WriteLink";
import SignUp from "../components/pages/SignUp";
import SignIn from "../components/pages/SignIn";
import SignOut from "../components/pages/SignOut";
import SignUpped from "../components/pages/SignUpped";
import NotFound from "../components/pages/NotFound";

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="community" component={Community} />
    <Route path="categories/:name" component={Category} />
    <Route path="search/:q" component={Search} />
    <Route path="categories/:name" component={Category} />
    <Route path="device_types/:name" component={Category} />
    <Route path="articles/:id" component={Article} />
    <Route path="pages/:name" component={Page} />
    <Route path="profile/:id" component={Profile} />
    <Route path="reviews" component={Reviews} />
    <Route path="staffs" component={Staffs} />
    <Route path="briefings" component={Briefings} />
    <Route path="manage" component={ManageArticles} />
    <Route path="manage/write/article" component={WriteArticle} />
    <Route path="manage/write/discussion" component={WriteDiscussion} />
    <Route path="manage/write/page" component={WritePage} />
    <Route path="manage/write/promotion" component={WritePromotion} />
    <Route path="manage/write/briefing" component={WriteBriefing} />
    <Route path="manage/write/link" component={WriteLink} />
    <Route path="manage/articles/mine" component={ManageArticles} />
    <Route path="manage/briefings/mine" component={ManageBriefings} />
    <Route path="manage/articles/:id" component={ManageArticle} />
    <Route path="manage/pages/:id" component={ManagePage} />
    <Route path="manage/promotions/:id" component={ManagePromotion} />
    <Route path="manage/briefings/:id" component={ManageBriefing} />
    <Route path="manage/links/:id" component={ManageLink} />
    <Route path="manage/articles" component={ManageArticles} />
    <Route path="manage/promotions" component={ManagePromotions} />
    <Route path="manage/categories" component={ManageCategories} />
    <Route path="manage/links" component={ManageLinks} />
    <Route path="manage/staffs" component={ManageStaffs} />
    <Route path="manage/Pages" component={ManagePages} />
    <Route path="manage/profile" component={ManageProfile} />
    <Route path="sign_up" component={SignUp} />
    <Route path="sign_in" component={SignIn} />
    <Route path="sign_out" component={SignOut} />
    <Route path="sign_upped" component={SignUpped} />
    <Route path="*" component={NotFound} />
  </Route>
);

export const plain = createRoutesFromReactChildren(routes);

export default routes;
