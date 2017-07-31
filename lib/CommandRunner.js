const GitData = require("./GitData");

module.exports = {
	run: parsedObj => {
		let searchResults = {
			username: parsedObj.username,
			subject: parsedObj.subject,
			query: parsedObj.query,
			repos: []
		};

		if (searchResults.query === "count") {
			getCountData();
		} else {
			getAllRepos();
		}

		return searchResults;
	}
};

function getCountData(username, subject) {
	// github function calls
}

function getAllRepos(username, subject) {
	let name = GitData.git_wrap.repos(username);
	console.log(name, "username??");
	// github
}
