import R from "ramda";

import getData from "./getData";
import apiPath from "./apiPath";
import {authToken, pageData} from "./globals";
import user from "./guest";

const advertisements = apiPath("advertisements", {
  position: ["position1", "position2"]
});

const categories = apiPath("categories")
    , deviceTypes = apiPath("device_types")
    , pushes = apiPath("pushes")
    , briefingsUrl = apiPath("briefings");

const withUser = function(resolve) {
  if (authToken) {
    return R.merge(resolve, {
      user: apiPath("users/current"),
    });
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
      deviceTypes,
      categories,
      briefings: briefingsUrl,
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
      briefings: briefingsUrl,
      categories,
      deviceTypes,
      advertisements,
      articles: apiPath("articles/reviews", {limit: 20})
    }
  });
}

reviews.pathPattern = /^\/reviews$/;

function briefings() {
  return getData({
    staticProps: {
      user,
      title: "快讯",
    },
    preHooks: [
      withUser
    ],
    resolve: {
      briefings: briefingsUrl,
      categories,
      deviceTypes,
      advertisements
    }
  });
}

briefings.pathPattern = /^\/briefings$/;

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
      briefings: briefingsUrl,
      categories,
      deviceTypes,
      advertisements: apiPath("advertisements", {
        position: ["position5"]
      }),
      articles: apiPath("articles/published", {category: name})
    }
  });
}

category.pathPattern = /^\/categories\/(.+)$/;

function deviceType(name) {
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
      briefings: briefingsUrl,
      categories,
      deviceTypes,
      advertisements: apiPath("advertisements", {
        position: ["position5"]
      }),
      articles: apiPath("articles/published", {device_type: name})
    }
  });
}

deviceType.pathPattern = /^\/device_types\/(.+)$/;

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
      deviceTypes,
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
      briefings: briefingsUrl,
      categories,
      deviceTypes,
      advertisements: apiPath("advertisements", {
        position: ["position3", "position4"]
      }),
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
      deviceTypes,
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
      deviceTypes,
      articles: apiPath("articles/mine", {limit: 40})
    }
  });
}

manageMyArticles.pathPattern = /^\/manage\/articles\/mine$/;

function manageMyBriefings() {
  return getData({
    staticProps: {
      user,
      title: "我的快讯",
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
      deviceTypes,
      briefings: apiPath("briefings/mine", {limit: 40})
    }
  });
}

manageMyBriefings.pathPattern = /^\/manage\/briefings\/mine$/;

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
      deviceTypes,
      promotions: apiPath("promotions", {limit: 40})
    }
  });
}

managePromotions.pathPattern = /^\/manage\/promotions$/;

function manageBriefings() {
  return getData({
    staticProps: {
      user,
      title: "管理快讯",
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
      deviceTypes,
      briefings: apiPath("briefings", {limit: 40})
    }
  });
}

manageBriefings.pathPattern = /^\/manage\/briefings$/;

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
      deviceTypes,
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
      title: "管理分类"
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
      deviceTypes,
      promotion: apiPath(`promotions/${id}`)
    }
  });
}

managePromotion.pathPattern = /^\/manage\/promotions\/([a-f0-9\-]+)$/;

function manageBriefing(id) {
  return getData({
    staticProps: {
      user,
      title: "管理快讯"
    },
    preHooks: [
      withUser
    ],
    resolve: {
      briefing: apiPath(`briefings/${id}`),
      categories,
      deviceTypes
    }
  });
}

manageBriefing.pathPattern = /^\/manage\/briefings\/([a-f0-9\-]+)$/;

function manageCategories() {
  return getData({
    staticProps: {
      user,
      title: "管理分类"
    },
    preHooks: [
      withUser
    ],
    resolve: {
      deviceTypes,
      categories
    }
  });
}

manageCategories.pathPattern = /^\/manage\/categories$/;

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
      deviceTypes
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
      deviceTypes
    }
  });
}

writePromotion.pathPattern = /^\/manage\/write\/promotion$/;

function writeBriefing() {
  return getData({
    staticProps: {
      user,
      title: "投递快讯",
      briefing: {}
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
      deviceTypes
    }
  });
}

writeBriefing.pathPattern = /^\/manage\/write\/briefing$/;

function writeBriefing() {
  return getData({
    staticProps: {
      user,
      title: "投递快讯",
      briefing: {}
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
      deviceTypes
    }
  });
}

writeBriefing.pathPattern = /^\/manage\/write\/briefing$/;

function manageProfile() {
  return getData({
    staticProps: {
      user,
      title: "个人信息"
    },
    preHooks: [
      withUser
    ],
    resolve: {
      categories,
      deviceTypes
    }
  });
}

manageProfile.pathPattern = /^\/manage\/profile$/;

function signUp() {
  return Promise.resolve({
    layout: "session"
  });
}

signUp.pathPattern = /^\/sign_up$/;

function signUpped() {
  return Promise.resolve({
    layout: "session"
  });
}

signUpped.pathPattern = /^\/sign_upped$/;

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

function notFound() {
  return Promise.resolve({
    layout: "session"
  });
}

notFound.pathPattern = /\.*/;

const resolvers = [
  home, reviews, category, managePromotion,
  profile, article, signUp, signIn,
  signOut, manageHome, manageMyArticles, manageArticle,
  manageArticles, writeArticle, writePromotion, managePromotions,
  manageCategories, signUpped, writeBriefing, manageMyBriefings,
  briefings, manageBriefing, manageProfile, deviceType
];

export default function resolveData(location) {
  const path = location.pathname
      , matcher = resolver => resolver.pathPattern.exec(path)
      , resolver = R.find(matcher, resolvers) || notFound;

  if (pageData) {
    return Promise.resolve(R.merge(pageData, {serverRender: true}));
  }

  if (resolver) {
    return Promise.resolve(resolver(matcher(resolver)[1]))
      .then((data) => R.merge(data, {route: location.pathname}));
  }

  return Promise.resolve({route: location.pathname});
};
