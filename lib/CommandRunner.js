const GitData = require("./GitData");
const ReponseFormatter = require("./ReponseFormatter");

module.exports = {
  run: parsedObj => {
    let searchResults = {
      username: parsedObj.username,
      subject: parsedObj.subject,
      query: parsedObj.query,
      repos: []
    };

    let result = GitData.TakeInput(searchResults);

    console.log(result, "result");
    return result;

    // if (searchResults.query === "count") {

    //   getCountData();
    // } else {
    //   getAllRepos();
    // }
  }
};

function receivedGitData(obj) {
  ReponseFormatter.format(obj);
}

// function getCountData(username, subject) {
//   // github function calls
// }

// function getAllRepos(username, subject) {
//   let name = GitData.git_wrap.TakeInput(username);
//   console.log(name, "username??");
//   // github
// }
