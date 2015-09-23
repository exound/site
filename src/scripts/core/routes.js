import React from "react";
import {IndexRoute, Route} from "react-router";
import {createRoutesFromReactChildren} from "react-router/lib/RouteUtils";
import App from "../components/App";
import Home from "../components/pages/Home";
import Category from "../components/pages/Category";
import Article from "../components/pages/Article";
import Reviews from "../components/pages/Reviews";
import Review from "../components/pages/Review";

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="categories/:name" component={Category} />
    <Route path="articles/:id" component={Article} />
    <Route path="reviews" component={Reviews}>
      <Route path=":id" component={Review} />
    </Route>
  </Route>
);

export const plain = createRoutesFromReactChildren(routes);

export default routes;


