import R from "ramda";

import getData from "./getData";
import apiPath from "./apiPath";
import {authToken, pageData} from "./globals";
import user from "./guest";

const advertisements = apiPath("advertisements", {
  position: ["position1", "position2"]
});

const categories = apiPath("categories")
    , pushes = apiPath("pushes");

const withUser = function(resolve) {
  if (authToken) {
    return R.merge(resolve, {user: apiPath("users/current")});
  } else {
    return resolve;
  }
};

function home() {
  return getData({
    staticProps: {
      layout: "default",
      user
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
      advertisements,
      topStories: apiPath("pushes/top"),
      articles: apiPath("pushes/ordinary", {limit: 20})
    }
  });
}

home.pathPattern = /^\/$/;

function reviews() {
  return getData({
    staticProps: {
      layout: "default",
      user,
      title: "评测",
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
      advertisements,
      reviews: apiPath("reviews", {limit: 20})
    }
  });
}

reviews.pathPattern = /^\/reviews$/;


function review(id) {
  return getData({
    staticProps: {
      layout: "default",
      user,
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
      review: apiPath(`reviews/${id}`)
    },
    postHooks: [
      (data) => {
        data.title = data.review.title;
        return data;
      }
    ]
  });
}

review.pathPattern = /^\/reviews\/([a-f0-9\-]+)$/;

function category(name) {
  return getData({
    staticProps: {
      layout: "default",
      title: name,
      name,
      user,
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
      advertisements,
      articles: apiPath("pushes/all", {category: name})
    }
  });
}

category.pathPattern = /^\/categories\/(.+)$/;

function profile(nick) {
  return getData({
    staticProps: {
      layout: "default",
      title: nick,
      nick,
      user,
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
      advertisements,
      articles: apiPath("articles", {column: nick})
    }
  });
}

profile.pathPattern = /^\/profile\/(.+)$/;

function article(id) {
  return getData({
    staticProps: {
      layout: "default",
      user,
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
      article: apiPath(`articles/${id}`)
    },
    postHooks: [
      (data) => {
        data.title = data.article.title;
        return data;
      }
    ]
  });
}

article.pathPattern = /^\/articles\/([a-f0-9\-]+)$/;

function manageHome() {
  return manageMyArticles();
}

manageHome.pathPattern = /^\/manage$/;

function manageMyArticles() {
  return getData({
    staticProps: {
      layout: "manage",
      user,
      title: "文章管理",
    },
    preHooks: [
      withUser
    ],
    resolve: {
      articles: apiPath("articles/mine", {limit: 40})
    }
  });
}

manageMyArticles.pathPattern = /^\/manage\/articles\/mine$/;

function manageArticle(id) {
  return getData({
    staticProps: {
      layout: "manage",
      user,
    },
    preHooks: [
      withUser
    ],
    resolve: {
      pushes,
      categories,
      article: apiPath(`articles/${id}`)
    },
    postHooks: [
      (data) => {
        data.title = `文章管理 - ${data.article.title}`;
        return data;
      }
    ]
  });
}

manageArticle.pathPattern = /^\/manage\/articles\/([a-f0-9\-]+)$/;

function signUp() {
  return Promise.resolve({
    layout: "session"
  });
}

signUp.pathPattern = /^\/sign_up$/;

function signIn() {
  return Promise.resolve({
    layout: "session"
  });
}

signIn.pathPattern = /^\/sign_in$/;

function signOut() {
  return Promise.resolve({
    layout: "session"
  });
}

signOut.pathPattern = /^\/sign_out$/;

const resolvers = [
  home, review, reviews, category,
  profile, article, signUp, signIn,
  signOut, manageHome, manageMyArticles, manageArticle
];

function resolveData(location) {
  const path = location.pathname
      , matcher = resolver => resolver.pathPattern.exec(path)
      , resolver = R.find(matcher, resolvers);

  if (typeof __appState__ !== "undefined") {
    return Promise.resolve(__appState__);
  }

  if (resolver) {
    return Promise.resolve(resolver(decodeURI(matcher(resolver)[1])))
      .then((data) => R.merge(data, {route: location.pathname}));
  } else {
    return Promise.resolve({route: location.pathname});
  }
}

export default resolveData;
