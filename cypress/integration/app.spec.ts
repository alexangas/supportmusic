// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe("App", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the app", () => {
    cy.get("main").should("contain", "Support Music");
  });
});
