// const http=require("http");
// const fs=require("fs");
// const server=http.createServer((req,res)=>{
//     const stream=fs.createReadStream("sample.txt");
//     stream.pipe(res);
//     // fs.readFile("sample.txt",(err,data)=>{
//     //     res.end(data);
//     // })
// });
// server.listen(3000);


const http = require("http");
const fs = require("fs");

let homeContent = "";
let projectContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});
http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(3000);