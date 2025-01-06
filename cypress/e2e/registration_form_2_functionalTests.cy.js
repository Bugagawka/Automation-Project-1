beforeEach(() => {
  cy.visit("cypress/fixtures/registration_form_2.html");
});

/*
Assignement 4: add content to the following tests
*/

describe("Functional tests", () => {
  it.only("User can use only same both first and validation passwords", () => {
    // Add test steps for filling in only mandatory fields
    cy.get("#username").type("Bugagawka");
    cy.get("#email").type("bugagawka@mail.com");
    cy.get('[name="name"]').type("Roman");
    cy.get('[name="lastName"]').type("Kazakov");
    cy.get('[data-testid="phoneNumberTestId"]').type("123456789");
    // Type confirmation password which is different from first password
    cy.get('input[name="password"]').type("Defender1");
    cy.get('[name="confirm"]').type("Defender");
    // Assert that submit button is not enabled
    cy.get(".submit_button").should("be.disabled");
    // Assert that successful message is not visible
    cy.get("#success_message").should("not.be.visible");
    // Assert that error message is visible
    cy.get("#input_error_message")
      .should("be.visible")
      .should("contain", "Mandatory input field is not valid or empty!");
    // Change the test, so the passwords would match
    // Add assertion, that error message is not visible anymore
    // Add assertion, that submit button is now enabled
    cy.get("h2").contains("Password").click();
    cy.get(".submit_button").should("be.enabled");
    cy.get(".submit_button").click();
  });

  it("User can submit form with all fields added", () => {
    // Add test steps for filling in ALL fields
    // Assert that submit button is enabled
    // Assert that after submitting the form system show successful message
  });

  it("User can submit form with valid data and only mandatory fields added", () => {
    // Add test steps for filling in ONLY mandatory fields
    // Assert that submit button is enabled
    // Assert that after submitting the form system shows successful message

    // example, how to use function, which fills in all mandatory data
    // in order to see the content of the function, scroll to the end of the file
    inputValidMandatoryData("johnDoe");
  });

  // Add at least 1 test for checking some mandatory field's absence
});

function inputValidMandatoryData(username) {
  cy.log("Username will be filled");
  cy.get('input[data-testid="user"]').type(username);
  cy.get("#email").type("validemail@yeap.com");
  cy.get('[data-cy="name"]').type("John");
  cy.get("#lastName").type("Doe");
  cy.get('[data-testid="phoneNumberTestId"]').type("10203040");
  cy.get("#password").type("MyPass");
  cy.get("#confirm").type("MyPass");
  cy.get("h2").contains("Password").click();
}
