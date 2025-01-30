/**
 * Validates the amount of a transaction.
 *
 * @param {string} amountString - The transaction amount in euros.
 * @returns {boolean} - Returns true if the amount is valid, otherwise false.
 */
export function validateAmount(amountString) {
  if (!/^\d+(\.\d{1,2})?$/.test(amountString)) {
    return false;
  }

  const amount = parseInt(amountString, 10);

  if (isNaN(amount) || typeof amount !== "number") {
    return false;
  }

  if (amount <= 0) {
    return false;
  }

  return true;
}

/**
 * Validates the recipient's name.
 *
 * @param {string} name - The recipient's full name.
 * @returns {boolean} - Returns true if the name is valid, otherwise false.
 */
export function validateRecipientName(name) {
  if (typeof name !== "string") {
    return false;
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    return false;
  }

  const isValidFormat = /^[A-Za-zÄÖÜäöüß\s]+$/.test(trimmedName);

  return isValidFormat;
}

/**
 * A map of country-specific IBAN lengths according to ISO 13616.
 */
const IBAN_LENGTHS = {
  AL: 28,
  AD: 24,
  AT: 20,
  AZ: 28,
  BE: 16,
  BH: 22,
  BA: 20,
  BR: 29,
  BG: 22,
  CR: 21,
  HR: 21,
  CY: 28,
  CZ: 24,
  DK: 18,
  DO: 28,
  EE: 20,
  FO: 18,
  FI: 18,
  FR: 27,
  GE: 22,
  DE: 22,
  GI: 23,
  GR: 27,
  GL: 18,
  GT: 28,
  HU: 28,
  IS: 26,
  IE: 22,
  IL: 23,
  IT: 27,
  KZ: 20,
  KW: 30,
  LV: 21,
  LB: 28,
  LI: 21,
  LT: 20,
  LU: 20,
  MT: 31,
  MR: 27,
  MU: 30,
  MD: 24,
  MC: 27,
  ME: 22,
  NL: 18,
  NO: 15,
  PK: 24,
  PS: 29,
  PL: 28,
  PT: 25,
  RO: 24,
  SM: 27,
  SA: 24,
  RS: 22,
  SK: 24,
  SI: 19,
  ES: 24,
  SE: 24,
  CH: 21,
  TN: 24,
  TR: 26,
  AE: 23,
  GB: 22,
  VG: 24,
};

/**
 * Validates an IBAN according to ISO 13616.
 *
 * @param {string} iban - The IBAN to validate.
 * @returns {boolean} - Returns true if the IBAN is valid, otherwise false.
 */
export function validateIBAN(iban) {
  if (typeof iban !== "string") {
    return false;
  }

  // Remove spaces and convert to uppercase for consistency
  const cleanedIBAN = iban.replace(/\s+/g, "").toUpperCase();

  // Extract country code and check if IBAN length is correct
  const countryCode = cleanedIBAN.slice(0, 2);
  if (
    !IBAN_LENGTHS[countryCode] ||
    cleanedIBAN.length !== IBAN_LENGTHS[countryCode]
  ) {
    return false;
  }

  // Move first 4 characters to the end
  const rearranged = cleanedIBAN.slice(4) + cleanedIBAN.slice(0, 4);

  // Replace letters with their numeric equivalent (A = 10, B = 11, ..., Z = 35)
  const numericIBAN = rearranged
    .split("")
    .map((char) => (/[A-Z]/.test(char) ? char.charCodeAt(0) - 55 : char))
    .join("");

  // Convert to a large integer and perform modulo 97 check
  const ibanNumber = BigInt(numericIBAN);
  return ibanNumber % 97n === 1n;
}

/**
 * Validates the execution date of a transaction.
 *
 * @param {string} dateString - The execution date in YYYY-MM-DD format.
 * @returns {boolean} - Returns true if the date is valid and in the future (or today), otherwise false.
 */
export function validateExecutionDate(dateString) {
  if (typeof dateString !== "string") {
    return false;
  }

  const date = new Date(dateString);

  if (!(date instanceof Date && !isNaN(date))) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date >= today;
}

/**
 * Validates the description of a transaction.
 *
 * @param {string} description - The description text.
 * @returns {boolean} - Returns true if the description is not empty, otherwise false.
 */
export function validateDescription(description) {
  if (typeof description !== "string") {
    return false;
  }

  const trimmedDescription = description.trim();

  return trimmedDescription.length > 0;
}
