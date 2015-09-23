import R from "ramda";

import getData from "./getData";
import title from "./title";
import apiPath from "./apiPath";

const advertisements = apiPath("advertisements", {
  position: ["list1", "list2"]
});

function home() {
  return getData({
    staticProps: {
      title: title(),
    },
    resolve: {
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
      title: title("评测"),
    },
    resolve: {
      advertisements,
      reviews: apiPath("reviews", {limit: 20})
    }
  });
}

reviews.pathPattern = /^\/reviews$/;


function review({id}) {
  return getData({
    resolve: {
      review: apiPath(`reviews/${id}`)
    },
    callbacks: [
      (data) => {
        data.title = title(data.review.title);
        return data;
      }
    ]
  });
}

review.pathPattern = /^\/reviews\/([a-f0-9\-]+)$/;

function category(name) {
  return getData({
    resolve: {
      category: apiPath(`categories/${name}`)
    },
    callbacks: [
      (data) => {
        data.title = title(data.category.title);
        return data;
      }
    ]
  });
}

category.pathPattern = /^\/categores\/(.+)$/;

function article(id) {
  return getData({
    resolve: {
      article: apiPath(`articles/${id}`)
    },
    callbacks: [
      (data) => {
        data.title = title(data.article.title);
        return data;
      }
    ]
  });
}

article.pathPattern = /^\/articles\/([a-f0-9\-]+)$/;

const resolvers = [home, review, reviews, category, article];

function resolveData(location) {
  const path = location.pathname
      , matcher = resolver => resolver.pathPattern.exec(path)
      , resolver = R.find(matcher, resolvers);

  if (resolver) {
    return resolver(matcher(resolver)[1]);
  }
}

export default resolveData;
