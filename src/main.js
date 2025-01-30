import "./style.css";
import "./form.js";
import { createList, updateList } from "./list.js";
import { addSubmitHandler, createForm } from "./form.js";

// const transactions = [];

// test data
const transactions = [
  {
    amount: 100,
    iban: "DE89370400440532013000",
    recipientName: "John Doe",
    executionDate: new Date(),
    description: "Payment for services",
  },
  {
    amount: 50,
    iban: "FR1420041010050500013M02606",
    recipientName: "Alice Smith",
    executionDate: new Date(),
    description: "Payment for goods",
  },
];

document.querySelector("#app").innerHTML = `
    <h1>Hello world!</h1>
    <form id="form">
    </form>
    <div id="listAnchor">
    </div>
`;

const form = document.getElementById("form");
createForm(form);

const listAnchor = document.getElementById("listAnchor");
const { list, placeholder } = createList(listAnchor);

const update = updateList(list, placeholder, transactions);

addSubmitHandler(form, update);
