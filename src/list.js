import { showOverlay } from "./details.js";
/**
 * Creates the transaction list container with a dynamic empty list placeholder.
 * Returns references to the list and placeholder elements.
 *
 * @returns {Object} An object containing references to the list and placeholder elements.
 */
export function createList(anchor) {
  // Create the container element for the transaction list
  anchor.id = "transaction-list-anchor";

  // Create the placeholder element for when the list is empty
  const placeholder = document.createElement("div");
  placeholder.id = "empty-placeholder";
  placeholder.classList.add("empty-list-placeholder");
  placeholder.textContent = "No transactions to display.";

  // Create the list element to hold the transactions
  const list = document.createElement("ul");
  list.id = "transaction-list";
  list.classList.add("transaction-list");

  // Append the placeholder and list to the anchor
  anchor.appendChild(placeholder);
  anchor.appendChild(list);

  // Return references to the list and placeholder
  return {
    list,
    placeholder,
  };
}

/**
 * Updates the list of transactions in the provided HTML element.
 * Also provides delete and show details button functionality for each item.
 *
 * @param {HTMLElement} listElement - The HTML element containing the transaction list.
 * @param {HTMLElement} placeholderElement - The HTML element containing the transaction list placeholder.
 * @param {Array} list - The list of transactions to be displayed.
 * @returns {Function} A closure that can be called each time the list needs to be updated.
 */
export function updateList(listElement, placeholderElement, list) {
  // Helper function to create the HTML for a single transaction item
  function createTransactionItem(transaction, index) {
    const listItem = document.createElement("li");
    listItem.classList.add("transaction-item");

    // Transaction details (amount, IBAN, name, etc.)
    listItem.innerHTML = `
      <span class="bottom-line first">Amount: ${transaction.amount.toString()} EUR</span>
      <span class="bottom-line">IBAN: ${transaction.iban}</span>
      <span class="bottom-line">Recipient: ${transaction.recipientName}</span>
      <span class="bottom-line">Date: ${transaction.executionDate.toLocaleDateString()}</span>
      <span class="last">Description: ${transaction.description}</span>
      <button class="btn-details">Show Details</button>
      <button class="btn-delete">Delete</button>
    `;

    // Button to delete the transaction
    listItem.querySelector(".btn-delete").addEventListener("click", () => {
      list.splice(index, 1); // Remove the transaction from the list
      updateList(listElement, placeholderElement, list); // Re-render the updated list
    });

    // Button to show details (out of scope for now)
    listItem.querySelector(".btn-details").addEventListener("click", () => {
      showOverlay(transaction);
    });

    return listItem;
  }

  // Clear existing list
  listElement.innerHTML = "";
  if (list.length === 0) {
    placeholderElement.style.display = "block";
    listElement.style.display = "none";
  } else {
    listElement.style.display = "block";
    placeholderElement.style.display = "none";
    // Generate the list of transaction items
    list.forEach((transaction, index) => {
      const transactionItem = createTransactionItem(transaction, index);
      listElement.appendChild(transactionItem);
    });
  }

  // Return closure that takes a new transaction and appends it to the list
  return (newTransaction) => {
    list.push(newTransaction); // Add the new transaction to the list
    updateList(listElement, placeholderElement, list); // Re-render the updated list
  };
}
