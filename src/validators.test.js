import { describe, it, expect } from "vitest";
import {
  validateAmount,
  validateRecipientName,
  validateIBAN,
  validateExecutionDate,
  validateDescription,
} from "./validators.js"; // Adjust the import path as needed

describe("validateAmount", () => {
  it("should return true for valid amounts", () => {
    expect(validateAmount(10)).toBe(true);
    expect(validateAmount(10.5)).toBe(true);
    expect(validateAmount(999.99)).toBe(true);
  });

  it("should return false for invalid amounts", () => {
    expect(validateAmount(-10)).toBe(false);
    expect(validateAmount(0)).toBe(false);
    expect(validateAmount("10")).toBe(false);
    expect(validateAmount(null)).toBe(false);
    expect(validateAmount(undefined)).toBe(false);
  });
});

describe("validateRecipientName", () => {
  it("should return true for valid names", () => {
    expect(validateRecipientName("John Doe")).toBe(true);
    expect(validateRecipientName("Alice Müller")).toBe(true);
  });

  it("should return false for invalid names", () => {
    expect(validateRecipientName("J1")).toBe(false); // Contains number
    expect(validateRecipientName(" ")).toBe(false); // Empty string after trim
    expect(validateRecipientName("123456")).toBe(false); // All numbers
    expect(validateRecipientName("")).toBe(false);
  });
});

describe("validateIBAN", () => {
  it("should return true for valid IBANs", () => {
    expect(validateIBAN("DE44500105175407324931")).toBe(true);
    expect(validateIBAN("DE96500105179166864157")).toBe(true);
    expect(validateIBAN("DE12500105173365790951")).toBe(true);
    expect(validateIBAN("DE13500105173924751784")).toBe(true);
    expect(validateIBAN("DE42500105170525257834")).toBe(true);
    expect(validateIBAN("DE48500105174152692327")).toBe(true);
    expect(validateIBAN("FR1420041010050500013M02606")).toBe(true);
    expect(validateIBAN("FR703249005693AQL1NORWH1E90")).toBe(true);
    expect(validateIBAN("FR616660750939NWQTEYKI46514")).toBe(true);
    expect(validateIBAN("FR066889252589IBN5LDF7AB303")).toBe(true);
    expect(validateIBAN("FR495818245978QZV01AGJQRJ06")).toBe(true);
    expect(validateIBAN("FR3046964745094VGIENBYNJE09")).toBe(true);
    expect(validateIBAN("AT172060435636320568")).toBe(true);
    expect(validateIBAN("AT311200008108641186")).toBe(true);
    expect(validateIBAN("AT901936078581658304")).toBe(true);
    expect(validateIBAN("AT855400060957027999")).toBe(true);
    expect(validateIBAN("AT921947007623409514")).toBe(true);
  });

  it("should return false for invalid IBANs", () => {
    expect(validateIBAN("12345678")).toBe(false);
    expect(validateIBAN("XX001234567890")).toBe(false); // Invalid country code
    expect(validateIBAN("")).toBe(false);
    expect(validateIBAN(null)).toBe(false);
  });
});

describe("validateExecutionDate", () => {
  it("should return true for today or future dates", () => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    const futureDate = "2030-12-31";

    expect(validateExecutionDate(today)).toBe(true);
    expect(validateExecutionDate(futureDate)).toBe(true);
  });

  it("should return false for past dates", () => {
    expect(validateExecutionDate("2000-01-01")).toBe(false);
    expect(validateExecutionDate("2020-12-31")).toBe(false);
  });

  it("should return false for invalid dates", () => {
    expect(validateExecutionDate("not-a-date")).toBe(false);
    expect(validateExecutionDate("2024-02-30")).toBe(false); // Invalid day
    expect(validateExecutionDate("")).toBe(false);
  });
});

describe("validateDescription", () => {
  it("should return true for non-empty descriptions", () => {
    expect(validateDescription("Payment for invoice")).toBe(true);
    expect(validateDescription("Groceries")).toBe(true);
  });

  it("should return false for empty or whitespace descriptions", () => {
    expect(validateDescription("")).toBe(false);
    expect(validateDescription("   ")).toBe(false);
    expect(validateDescription(null)).toBe(false);
    expect(validateDescription(undefined)).toBe(false);
  });
});
