const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

class GithubActivity {
  constructor() {
    this.rl = readline.createInterface({ input, output });
  }

  #fetchEvents(username) {
    console.log(`Fetching events for username: ${username}`);
  }

  #getUserInput() {
    this.rl.question("github-activity > ", (answer) => {
      if (answer === "quit") {
        this.rl.close();
      } else {
        this.#fetchEvents(answer);
        this.#getUserInput();
      }
    });
  }

  start() {
    console.log(
      "\nWelcome to GitHub Activity CLI. Type a GitHub username or 'quit' to exit.\n"
    );
    this.#getUserInput();
  }
}

const app = new GithubActivity();
app.start();
