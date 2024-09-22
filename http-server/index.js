const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

// Parse command-line arguments
const argv = minimist(process.argv.slice(2));
const port = argv.port || 3000; // Default to port 3000 if not provided

let homeContent = "";
let projectContent = "";
let registrationContent = "";

// Read HTML files asynchronously
fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;

  fs.readFile("project.html", (err, project) => {
    if (err) {
      throw err;
    }
    projectContent = project;

    fs.readFile("registration.html", (err, registration) => {
      if (err) {
        throw err;
      }
      registrationContent = registration;

      http.createServer((request, response) => {
        let url = request.url;

        response.writeHead(200, { "Content-Type": "text/html" });
        switch (url) {
          case "/project":
            response.write(projectContent);
            break;
          case "/registration":
            response.write(registrationContent);
            break;
          default:
            response.write(homeContent);
            break;
        }
        response.end();
      }).listen(port); // Use the specified port
    });
  });
});
