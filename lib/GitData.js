const Github = require("github-api");
const fs = require("fs");
let git_wrap = {};
let base_url = "api.github.com";
var github = new Github({
  // optional
  debug: true,
  protocol: "https",
  host: "api.github.com", // should be api.github.com for GitHub

  headers: {
    "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
  },

  timeout: 5000
});

git_wrap.TakeInput = function(inputObject) {
  let repoObj = Object.assign({}, inputObject);

  if (inputObject.subject === "starred") {
    git_wrap.ListAllStarredRepos(inputObject.username).then(res => {
      repoObj["repos"] = res;
      if (inputObject.query !== "details") {
        repoObj.repos = repoObj.repos.length;
      }

      return repoObj;
    });
  } else {
    git_wrap.ListAllRepos(inputObject.username).then(res => {
      repoObj["repos"] = res;
      if (inputObject.query !== "details") {
        repoObj.repos = repoObj.repos.length;
      }

      return repoObj;
    });
  }
};

//git_wrap.authenticate();
git_wrap.ListAllRepos = function(passedUsername) {
  return new Promise((resolve, reject) => {
    github.getUser(passedUsername).listRepos(function(err, repos) {
      if (err) reject(err);
      let repoArray = [];
      repos.forEach(repo => {
        repoArray.push(repo["name"]);
      });
      resolve(repoArray);
    });
  });
};

git_wrap.ListAllStarredRepos = function(passedUsername) {
  return new Promise((resolve, reject) => {
    github.getUser(passedUsername).listStarredRepos(function(err, repos) {
      if (err) reject(err);
      let repoArray = [];
      repos.forEach(repo => {
        repoArray.push(repo["name"]);
      });

      resolve(repoArray);
    });
  });
};
//check users

// git_wrap.TakeInput({
//   username: "bsoung",
//   subject: "starred",
//   query: "details"
// });

module.exports = git_wrap;
