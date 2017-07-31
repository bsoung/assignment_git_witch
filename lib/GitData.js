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
var gitName = github.getUser("karathrash");
///authentication
git_wrap.authenticate = function() {
  const my_token = fs.readFileSync("./tokens.txt");
  github.authenticate({
    type: "token",
    token: my_token
  });
};
git_wrap.TakeInput = function(inputObject) {
  return new Promise(resolve => {
    let repoObj = Object.assign({}, inputObject);

    if (inputObject.subject === "starred") {
      git_wrap.ListAllStarredRepos(inputObject.username).then(res => {
        repoObj["repos"] = res;
      });
    } else {
      git_wrap.ListAllRepos(inputObject.username).then(res => {
        repoObj["repos"] = res;
      });
    }

    if (inputObject.query !== "details") {
      if (repoObj.repos) {
        repoObj.repos = repoObj.repos.length;
      } else {
        console.error("repos does not exist");
      }
    }

    resolve(repoObj);
  });
};

git_wrap.repos = function(params) {
  let repos_promise = new Promise((resolve, reject) => {
    github.repos.getAll(
      {
        owner: params["username"]
      },
      function(err, res) {
        if (err) {
          reject(err);
        }

        console.log(res);
        resolve(res);
      }
    );
  });
  return repos_promise;
};
//git_wrap.authenticate();
git_wrap.ListAllRepos = function(passedUsername) {
  return new Promise((resolve, reject) => {
    gitName.listRepos(function(err, repos) {
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
    gitName.listStarredRepos(function(err, repos) {
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

git_wrap
  .TakeInput({
    username: "bsoung",
    subject: "starred",
    query: "count"
  })
  .then(res => {
    console.log(res);
  });

module.exports = git_wrap;
