import * as validators from "./validators.js";

export function createForm(element) {
  element.innerHTML = `
<form id="transaction-form" novalidators.validate>
    <h2>Transaction Details</h2>

    <label for="amount">Amount</label>
    <input type="number" step=".01" id="amount" name="amount" placeholder="Enter amount" required />

    <label for="iban">IBAN</label>
    <input type="text" id="iban" name="iban" placeholder="Enter IBAN" required />

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
    event.preventDefault();

    const amount = document.getElementById("amount");
    const iban = document.getElementById("iban");
    const recipientName = document.getElementById("recipient-name");
    const executionDate = document.getElementById("execution-date");
    const description = document.getElementById("description");

    document.querySelectorAll(".error-message").forEach((el) => el.remove());

    let isValid = true;

    if (!validators.validateAmount(amount.value)) {
      showError(
        amount,
        "Invalid amount. Please enter a valid number greater than 0.",
      );
      isValid = false;
    }

    if (!validators.validateIBAN(iban.value)) {
      showError(
        iban,
        "Invalid IBAN. Please enter a valid IBAN according to ISO 13616.",
      );
      isValid = false;
    }

    if (!validators.validateRecipientName(recipientName.value)) {
      showError(
        recipientName,
        "Invalid name. Avoid numbers and special characters.",
      );
      isValid = false;
    }

    if (!validators.validateExecutionDate(executionDate.value)) {
      showError(executionDate, "Invalid date. Please enter a future date.");
      isValid = false;
    }

    if (!validators.validateDescription(description.value)) {
      showError(description, "Description cannot be empty.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    alert(`Transaction submitted successfully!

Amount: ${amount.value}
IBAN: ${iban.value}
Recipient Name: ${recipientName.value}
Execution Date: ${executionDate.value}
Description: ${description.value}
`);

    element.reset();
  });
}

/**
 * Displays an error message below the input field.
 * @param {HTMLElement} input - The input field where the error occurred.
 * @param {string} message - The error message to display.
 */
function showError(input, message) {
  const error = document.createElement("div");
  error.className = "error-message";
  error.textContent = message;
  input.parentNode.appendChild(error);
}
