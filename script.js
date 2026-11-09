const repositoryList = document.querySelector("#repository-list");
const repositoryStatus = document.querySelector("#repository-status");

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  for (const repository of repositories) {
    const item = document.createElement("li");
    const card = document.createElement("article");
    const heading = document.createElement("h3");
    const link = document.createElement("a");
    const name = document.createElement("p");
    const description = document.createElement("p");
    const starredDate = document.createElement("p");

    card.className = "repository-card";
    link.href = repository.url;
    link.textContent = repository.name;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    heading.append(link);

    name.className = "repository-name";
    name.textContent = repository.repository;
    description.className = "repository-description";
    description.textContent = repository.description;
    starredDate.className = "starred-date";
    starredDate.textContent = `Starred on ${repository.starred_at}`;

    card.append(heading, name, description, starredDate);
    item.append(card);
    repositoryList.append(item);
  }

  repositoryStatus.hidden = repositories.length > 0;
  if (repositories.length === 0) {
    repositoryStatus.textContent = "No starred repositories yet.";
  }
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list.");
    }

    renderRepositories(repositories);
  } catch (error) {
    repositoryStatus.textContent = "Could not load starred repositories. Please try again later.";
    console.error("Failed to load starred repositories:", error);
  }
}

loadRepositories();
