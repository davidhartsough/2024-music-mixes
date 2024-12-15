const list = document.getElementById("list");
const url =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRpHobChsTHSlRzCGeIYb_me-0WrAk_vm4xrBdzBDLvvjUH9ZV1zOx54IGiEAfUMn41Wr9wXQ-OutLs/pub?gid=598814886&single=true&output=csv";

async function render() {
  const resp = await fetch(url);
  if (!resp.ok) return;
  const csvText = await resp.text();
  const rows = csvText
    .split("\n")
    .slice(1)
    .map((row) => row.split(",").slice(2));
  list.innerHTML = "";
  rows.forEach(([name, link]) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<a href="${link}" target="_blank">${name}</a>`;
    list.appendChild(listItem);
  });
}
try {
  render();
} catch (err) {
  console.warn(err);
  list.innerHTML = `
  <p>
  WOMP. Error. Something went wrong. 
  <br /> 
  Whine to Dave until he fixes it. And show him this:
  </p>
  <p>${err}</p>`;
}
