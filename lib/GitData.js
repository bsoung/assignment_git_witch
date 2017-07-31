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
  if (inputObject.query === "count") {
    if (inputObject.subject === "starred") {
      gitwrap.ListAllStarredRepos(inputObject.username);
    } else {
      gitwrap.ListAllRepos(inputObject.username);
    }
  }
  if (inputObject.query === "details") {
  }
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
  gitName.listRepos(function(err, repos) {
    let repoArray = [];
    repos.forEach(repo => {
      repoArray.push(repo["name"]);
    });
    console.log(repoArray);
  });
};
git_wrap.ListAllStarredRepos = function(passedUsername) {
  gitName.listStarredRepos(function(err, repos) {
    let repoArray = [];
    repos.forEach(repo => {
      repoArray.push(repo["name"]);
    });
    console.log(repoArray);
  });
};
//check users

module.exports = git_wrap;
