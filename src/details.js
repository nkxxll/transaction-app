export function showOverlay(transaction) {
  const overlay = document.getElementById("overlay");
  const overlayContent = document.getElementById("overlay-content");
  overlay.style.display = "flex";

  // Set the transaction details in the overlay content
  overlayContent.innerHTML = `
    <h3>Transaction Details</h3>
    <span><strong>Amount:</strong> ${transaction.amount.toString()} EUR</span>
    <span><strong>IBAN:</strong> ${transaction.iban}</span>
    <span><strong>Recipient Name:</strong> ${transaction.recipientName}</span>
    <span><strong>Execution Date:</strong> ${transaction.executionDate.toLocaleDateString()}</span>
    <span><strong>Description:</strong> ${transaction.description}</span>
    <button id="close-overlay">Close</button>
  `;

  // Close the overlay when the close button is clicked
  document.getElementById("close-overlay").addEventListener("click", () => {
    overlay.style.display = "none";
  });
}
