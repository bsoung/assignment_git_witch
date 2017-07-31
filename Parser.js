var outputObject = {};
var TakeInput = function(passedInput) {
  let arr = passedInput.split(" ");
  outputObject.username = GetName(arr);
  outputObject.subject = GetSubject(arr);
  outputObject.query = GetQuery(arr);
  console.log(outputObject);
  return outputObject;
};

function GetName(arr) {
  let userIndex = arr.indexOf("does");
  return arr[userIndex + 1];
}
function GetSubject(arr) {
  let newSubject = "repos";
  if (arr.includes("repos")) {
    if (arr.includes("starred")) {
      newSubject = "stars";
    } else {
    }
  }
  //let userIndex = arr.indexOf("does");
  return newSubject;
}
function GetQuery(arr) {
  let newQuery = "count";
  if (arr.includes("what")) {
    newQuery = "details";
  }
  if (arr.includes("many")) {
    newQuery = "count";
  }

  //let userIndex = arr.indexOf("does");
  return newQuery;
}

TakeInput("how many of this sentences repos does me havbe");
