const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;

function getErrorMsg(message: string, username: string) {
  if (message === "Not Found") {
    return `${username} doesn't exist`;
  }

  return message;
}

export interface User {
  id: string;
  followers: number;
  following: number;
  login: string;
  avatar_url: string;
  name: string;
  location?: string;
  company?: string;
  html_url: string;
}
function getProfile(username: string): Promise<User> {
  return fetch(`https://api.github.com/users/${username}${params}`)
    .then((res) => res.json())
    .then((profile) => {
      if (profile.message) {
        throw new Error(getErrorMsg(profile.message, username));
      }

      return profile;
    });
}

function getRepos(username: string): Promise<Repo[]> {
  return fetch(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  )
    .then((res) => res.json())
    .then((repos) => {
      if (repos.message) {
        throw new Error(getErrorMsg(repos.message, username));
      }

      return repos;
    });
}

export interface Repo {
  stargazers_count: number;
  name: string;
  owner: User;
  html_url: string;
  forks: number;
  open_issues: number;
}

function getStarCount(repos: Repo[]) {
  return repos.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
}

function calculateScore(followers: number, repos: Repo[]) {
  return followers * 3 + getStarCount(repos);
}

function getUserData(player: string): Promise<Player> {
  return Promise.all([getProfile(player), getRepos(player)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile.followers, repos),
    })
  );
}

export interface Player {
  profile: User;
  score: number;
}

function sortPlayers(players: Player[]) {
  return players.sort((a, b) => b.score - a.score);
}

export function battle(players: [string, string]) {
  return Promise.all([
    getUserData(players[0]),
    getUserData(players[1]),
  ]).then((results) => sortPlayers(results));
}

export function fetchRepositories(language: string) {
  const uri = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return fetch(uri)
    .then((res) => res.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message);
      }

      return data.items as Repo[];
    });
}
