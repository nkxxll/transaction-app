import "./validators.js";

export function createForm(element) {
  element.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    let isValid = true;

    // Validate Amount
    const amount = document.getElementById("amount");
    const amountError = document.getElementById("amount-error");
    if (!amount.value || Number(amount.value) <= 0) {
      amountError.style.display = "block";
      isValid = false;
    } else {
      amountError.style.display = "none";
    }

    // Validate IBAN
    const iban = document.getElementById("iban");
    const ibanError = document.getElementById("iban-error");
    const ibanPattern =
      /[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}/;
    if (!ibanPattern.test(iban.value)) {
      ibanError.style.display = "block";
      isValid = false;
    } else {
      ibanError.style.display = "none";
    }

    // Validate Recipient Name
    const recipientName = document.getElementById("recipient-name");
    const recipientError = document.getElementById("recipient-error");
    if (!recipientName.value.trim()) {
      recipientError.style.display = "block";
      isValid = false;
    } else {
      recipientError.style.display = "none";
    }

    // Validate Execution Date
    const executionDate = document.getElementById("execution-date");
    const dateError = document.getElementById("date-error");
    const today = new Date().toISOString().split("T")[0];
    if (!executionDate.value || executionDate.value < today) {
      dateError.style.display = "block";
      isValid = false;
    } else {
      dateError.style.display = "none";
    }

    // Validate Description
    const description = document.getElementById("description");
    const descriptionError = document.getElementById("description-error");
    if (description.value.length > 250) {
      descriptionError.style.display = "block";
      isValid = false;
    } else {
      descriptionError.style.display = "none";
    }

    // If all fields are valid, submit the form
    if (isValid) {
      alert("Transaction submitted successfully!");
      element.reset(); // Optionally reset the form
    }
  });
  element.innerHTML = `
<form id="transaction-form" novalidate>
    <h2>Transaction Details</h2>

    <label for="amount">Amount</label>
    <input type="number" id="amount" name="amount" placeholder="Enter amount" required />
    <span id="amount-error" class="error">Amount is required and must be greater than 0.</span>

    <label for="iban">IBAN</label>
    <input type="text" id="iban" name="iban" placeholder="Enter IBAN" required pattern="[A-Za-z0-9]{15,34}" />
    <span id="iban-error" class="error">Please enter a valid IBAN.</span>

    <label for="recipient-name">Recipient Name</label>
    <input type="text" id="recipient-name" name="recipient-name" placeholder="Enter recipient name" required />
    <span id="recipient-error" class="error">Recipient name is required.</span>

    <label for="execution-date">Execution Date</label>
    <input type="date" id="execution-date" name="execution-date" required />
    <span id="date-error" class="error">Execution date is required and must not be in the past.</span>

    <label for="description">Description</label>
    <textarea id="description" name="description" placeholder="Enter a description" rows="4"></textarea>
    <span id="description-error" class="error">Description must be less than 250 characters.</span>

    <button type="submit">Submit Transaction</button>
</form>
`;
}
