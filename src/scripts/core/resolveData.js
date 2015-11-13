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
  } 

  return resolve;
};

function home() {
  return getData({
    staticProps: {
      user
    },
    preHooks: [
      withUser
    ],
    resolve: {
      reviews: apiPath("articles/reviews", {limit: 3}),
      categories,
      advertisements,
      promotions: apiPath("promotions", {limit: 6}),
      articles: apiPath("articles/published", {limit: 20})
    }
  });
}

home.pathPattern = /^\/$/;

function reviews() {
  return getData({
    staticProps: {
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
      articles: apiPath("articles/published", {category: name})
    }
  });
}

category.pathPattern = /^\/categories\/(.+)$/;

function profile(nick) {
  return getData({
    staticProps: {
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
      articles: apiPath(`articles/author/${nick}`)
    }
  });
}

profile.pathPattern = /^\/profile\/(.+)$/;

function article(id) {
  return getData({
    staticProps: {
      user,
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
      advertisements,
      article: apiPath(`articles/${id}`),
      comments: apiPath(`comments/for/${id}`)
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

function manageArticles() {
  return getData({
    staticProps: {
      user,
      title: "管理文章",
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
      articles: apiPath("articles/published", {limit: 40})
    }
  });
}

manageArticles.pathPattern = /^\/manage\/articles$/;

function manageMyArticles() {
  return getData({
    staticProps: {
      user,
      title: "我的文章",
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
      articles: apiPath("articles/mine", {limit: 40})
    }
  });
}

manageMyArticles.pathPattern = /^\/manage\/articles\/mine$/;

function managePromotions() {
  return getData({
    staticProps: {
      user,
      title: "管理头条",
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
      promotions: apiPath("promotions", {limit: 40})
    }
  });
}

managePromotions.pathPattern = /^\/manage\/promotions$/;

function manageArticle(id) {
  return getData({
    staticProps: {
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
        data.title = `编辑 - ${data.article.title}`;
        return data;
      }
    ]
  });
}

manageArticle.pathPattern = /^\/manage\/articles\/([a-f0-9\-]+)$/;

function managePromotion(id) {
  return getData({
    staticProps: {
      user,
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
      promotion: apiPath(`promotions/${id}`)
    },
    postHooks: [
      (data) => {
        data.title = `编辑 - ${data.promotion.title}`;
        return data;
      }
    ]
  });
}

managePromotion.pathPattern = /^\/manage\/promotions\/([a-f0-9\-]+)$/;

function writeArticle() {
  return getData({
    staticProps: {
      user,
      title: "撰写文章",
      article: {}
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
    }
  });
}

writeArticle.pathPattern = /^\/manage\/write\/article$/;

function writePromotion() {
  return getData({
    staticProps: {
      user,
      title: "添加头条",
      promotion: {}
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
    }
  });
}

writePromotion.pathPattern = /^\/manage\/write\/promotion$/;

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
  signOut, manageHome, manageMyArticles, manageArticle,
  manageArticles, writeArticle, writePromotion, managePromotions,
  managePromotion
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
  }

  return Promise.resolve({route: location.pathname});
}

export default resolveData;
