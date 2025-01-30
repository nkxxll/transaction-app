import "./validators.js";

export function createForm(element) {
  element.innerHTML = `
<form id="transaction-form" novalidate>
    <h2>Transaction Details</h2>

    <label for="amount">Amount</label>
    <input type="number" id="amount" name="amount" placeholder="Enter amount" required />

    <label for="iban">IBAN</label>
    <input type="text" id="iban" name="iban" placeholder="Enter IBAN" />

    <label for="recipient-name">Recipient Name</label>
    <input type="text" id="recipient-name" name="recipient-name" placeholder="Enter recipient name" required />

    <label for="execution-date">Execution Date</label>
    <input type="date" id="execution-date" name="execution-date" onfocus="this.showPicker()" required />

    <label for="description">Description</label>
    <textarea id="description" name="description" placeholder="Enter a description" rows="4"></textarea>

    <button type="submit">Submit Transaction</button>
</form>
`;
}

export function addSubmitHandler(element) {
  element.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const amount = document.getElementById("amount");

    const iban = document.getElementById("iban");

    const recipientName = document.getElementById("recipient-name");

    const executionDate = document.getElementById("execution-date");

    const description = document.getElementById("description");

    alert(`Transaction submitted successfully!

Amount: ${amount.value}
IBAN: ${iban.value}
Recipient Name: ${recipientName.value}
Execution Date: ${executionDate.value}
Description: ${description.value}
`);

    element.reset(); // Optionally reset the form
  });
}
