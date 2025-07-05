let input = document.querySelector(".get-repos input");
let getRepoButton = document.querySelector(".get-repos .get-button");
let showData = document.querySelector(".show-data");

getRepoButton.onclick = function () {
  getRepositories();
};

function getRepositories() {
  if (input.value == "") {
    showData.innerHTML = "<span>Please, write the Username</span>";
  } else {
    fetch(`https://api.github.com/users/${input.value}/repos`)
      .then((response) => response.json())
      .then((reposData) => {
        showData.innerHTML = "";
        reposData.forEach((repo) => {
          let mainDiv = document.createElement("div");
          mainDiv.classList.add("repo-box");

          let repositoryName = document.createElement("span");
          let repoName = document.createTextNode(repo.name);
          repositoryName.appendChild(repoName);
          mainDiv.appendChild(repositoryName);

          let info = document.createElement("div");
          mainDiv.appendChild(info);
          info.classList.add("info");

          let stars = document.createElement("span");
          let starsCount = document.createTextNode(
            `Stars: ${repo.stargazers_count}`
          );
          stars.appendChild(starsCount);
          info.appendChild(stars);

          let watchers = document.createElement("span");
          let watchersCount = document.createTextNode(
            `Watchers: ${repo.watchers_count}`
          );
          watchers.appendChild(watchersCount);
          info.appendChild(watchers);

          let link = document.createElement("a");
          let linkText = document.createTextNode("visit");
          link.appendChild(linkText);
          link.href = repo.html_url;
          link.setAttribute("target", "_blank");
          info.appendChild(link);

          showData.appendChild(mainDiv);
        });
      })
      .catch(
        () => (showData.innerHTML = "There is no username with this name.")
      );
  }
}
