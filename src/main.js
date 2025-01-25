import "./style.css";
import "./form.js";
import { createList } from "./list.js";
import { createForm } from "./form.js";

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Hello world!</h1>
    <div id="form">
    </div>
    <div id="list">
    </div>
  </div>
`;

const form = document.getElementById("form");
createForm(form);
const list = document.getElementById("list");
createList(list);
