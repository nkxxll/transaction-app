import "./style.css";
import "./form.js";
import { createList } from "./list.js";
import { addSubmitHandler, createForm } from "./form.js";

document.querySelector("#app").innerHTML = `
    <h1>Hello world!</h1>
    <form id="form">
    </form>
    <div id="list">
    </div>
`;

const form = document.getElementById("form");
createForm(form);
addSubmitHandler(form);
const list = document.getElementById("list");
createList(list);
