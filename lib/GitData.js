const Github = require("github");
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

///authentication
git_wrap.authenticate = function() {
  const my_token = fs.readFileSync("./tokens.txt");
  github.authenticate({
    type: "token",
    token: my_token
  });
};
git_wrap.repos = function(params) {
  let repos_promise = new Promise((resolve, reject) => {
    //our api call
    github.repos.getAll(
      {
        owner: params["user"]
      },
      function(err, res) {
        if (err) {
          reject(err);
        }
        let repos_jobj = [];

        resolve(repos_jobj);
      }
    );
  });
  return repos_promise;
};

//check users

module.exports = git_wrap;
