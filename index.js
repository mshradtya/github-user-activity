const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

class GithubActivity {
  constructor() {
    this.rl = readline.createInterface({ input, output });
  }

  URL = "https://api.github.com/users";

  #generateMessages(events) {
    let messages = [];
    events.forEach((event) => {
      let action;
      switch (event.type) {
        case "PushEvent":
          const commitCount = event.payload.commits.length;
          action = `Pushed ${commitCount} commit(s) to ${event.repo.name}`;
          break;
        case "IssuesEvent":
          action = `${
            event.payload.action.charAt(0).toUpperCase() +
            event.payload.action.slice(1)
          } an issue in ${event.repo.name}`;
          break;
        case "WatchEvent":
          action = `Starred ${event.repo.name}`;
          break;
        case "ForkEvent":
          action = `Forked ${event.repo.name}`;
          break;
        case "CreateEvent":
          action = `Created ${event.payload.ref_type} in ${event.repo.name}`;
          break;
        default:
          action = `${event.type.replace("Event", "")} in ${event.repo.name}`;
          break;
      }
      messages.push(action);
    });

    return messages;
  }

  async #fetchEvents(username) {
    try {
      console.log(`Fetching events for username: ${username}`);
      const response = await fetch(`${this.URL}/${username}/events`, {
        method: "GET",
      });

      if (response.status === 404) {
        console.log(`Username: ${username} does not exist`);
        return [];
      }

      return await response.json();
    } catch (err) {
      console.log("An error occurred while fetching events");
    }
  }

  async #handleUserInput(username) {
    const events = await this.#fetchEvents(username);
    if (events.length === 0) {
      console.log(`No public activity found for '${username}'.\n`);
      this.#getUserInput();
      return;
    }

    const messages = this.#generateMessages(events);
    for (let message of messages) {
      console.log(message);
    }
    this.#getUserInput();
  }

  #getUserInput() {
    this.rl.question("github-activity > ", async (answer) => {
      answer = answer.trim().toLowerCase();
      if (answer === "quit") {
        this.rl.close();
        return;
      }
      this.#handleUserInput(answer);
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
