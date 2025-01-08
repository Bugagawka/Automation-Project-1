beforeEach(() => {
  cy.visit("cypress/fixtures/registration_form_3.html");
});

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Create test suite for visual tests for registration form 3 (describe block)
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns:
        * list of cities changes depending on the choice of country
        * if city is already chosen and country is updated, then city choice should be removed
    * checkboxes, their content and links
    * email format
 */
describe("Visual tests", () => {
  it("radio buttons and its content", () => {
    // Array of found elements with given selector has 4 elements in total
    cy.get("input[type=radio]").should("have.length", 4);
    // Verify labels of the radio buttons
    cy.get("input[type=radio]").next().eq(0).should("have.text", "Daily");
    cy.get("input[type=radio]").next().eq(1).should("have.text", "Weekly");
    cy.get("input[type=radio]").next().eq(2).should("have.text", "Monthly");
    cy.get("input[type=radio]").next().eq(3).should("have.text", "Never");
    //Verify default state of radio buttons
    cy.get('input[type="radio"]').eq(0).should("not.be.checked");
    cy.get('input[type="radio"]').eq(1).should("not.be.checked");
    cy.get('input[type="radio"]').eq(2).should("not.be.checked");
    cy.get('input[type="radio"]').eq(3).should("not.be.checked");
    // Selecting one will remove selection from the other radio button
    cy.get('input[type="radio"]').eq(0).check().should("be.checked");
    cy.get('input[type="radio"]').eq(1).check().should("be.checked");
    cy.get('input[type="radio"]').eq(0).should("not.be.checked");
  });
  it("dependencies between 2 dropdowns", () => {
    // check dependencies between 2 dropdowns
    cy.get("#country").find("option").should("have.length", 4);
    cy.get("#city").find("option").should("have.length", 1);
    cy.get("#country").select("Spain");
    cy.get("#city").select("Malaga");
    cy.get("#country").select("Estonia");
    cy.get("#city").select("Tartu");
    cy.get("#country").select("Austria");
    cy.get("#city").select("Vienna");
    //check dropdowns
    cy.get("#country").select("Spain");
    // cy.screenshot("Full page screenshot");
    cy.get("#city").find("option").eq(0).should("have.text", "");
    cy.get("#city").find("option").eq(1).should("have.text", "Malaga");
    cy.get("#city").find("option").eq(2).should("have.text", "Madrid");
    cy.get("#city").find("option").eq(3).should("have.text", "Valencia");
    cy.get("#city").find("option").eq(4).should("have.text", "Corralejo");

    cy.get("#country").select("Estonia");
    //  cy.screenshot("Full page screenshot");
    cy.get("#city").find("option").eq(0).should("have.text", "");
    cy.get("#city").find("option").eq(1).should("have.text", "Tallinn");
    cy.get("#city").find("option").eq(2).should("have.text", "Haapsalu");
    cy.get("#city").find("option").eq(3).should("have.text", "Tartu");

    cy.get("#country").select("Austria");
    //  cy.screenshot("Full page screenshot");
    cy.get("#city").find("option").eq(0).should("have.text", "");
    cy.get("#city").find("option").eq(1).should("have.text", "Vienna");
    cy.get("#city").find("option").eq(2).should("have.text", "Salzburg");
    cy.get("#city").find("option").eq(3).should("have.text", "Innsbruck");

    //Check  that first element in the dropdown has empty text and following have country names
    cy.get("#country").find("option").eq(0).should("have.text", "");
    cy.get("#country").find("option").eq(1).should("have.text", "Spain");
    cy.get("#country").find("option").eq(2).should("have.text", "Estonia");
    cy.get("#country").find("option").eq(3).should("have.text", "Austria");

    // When country is changed, cities drop-down must also update with the list of cities in that country
    cy.get("#country").select("Spain");
    //cy.screenshot("Full page screenshot");
    cy.get("#city").find("option").eq(0).should("have.text", "");
    cy.get("#city").find("option").eq(1).should("have.text", "Malaga");
    cy.get("#city").find("option").eq(2).should("have.text", "Madrid");
    cy.get("#city").find("option").eq(3).should("have.text", "Valencia");
    cy.get("#city").find("option").eq(4).should("have.text", "Corralejo");

    cy.get("#country").select("Estonia");
    // cy.screenshot("Full page screenshot");
    cy.get("#city").find("option").eq(0).should("have.text", "");
    cy.get("#city").find("option").eq(1).should("have.text", "Tallinn");
    cy.get("#city").find("option").eq(2).should("have.text", "Haapsalu");
    cy.get("#city").find("option").eq(3).should("have.text", "Tartu");

    cy.get("#country").select("Austria");
    // cy.screenshot("Full page screenshot");
    cy.get("#city").find("option").eq(0).should("have.text", "");
    cy.get("#city").find("option").eq(1).should("have.text", "Vienna");
    cy.get("#city").find("option").eq(2).should("have.text", "Salzburg");
    cy.get("#city").find("option").eq(3).should("have.text", "Innsbruck");
  });
  it('[type="checkbox"]', () => {
    // Array of found elements with given selector has 2 elements in total
    cy.get('input[type="checkbox"]')
      .should("have.length", 2)
      .should("not.be.checked");

    cy.get('input[type="checkbox"]').eq(0).check().should("be.checked");
    cy.get('input[type="checkbox"]').eq(0).should("be.checked");

    cy.get('input[type="checkbox"]').eq(1).check().should("be.checked");
    cy.get('input[type="checkbox"]').eq(0).should("be.checked");

    cy.get("button").should("have.text", "Accept our cookie policySubmit file");
    cy.get("button")
      .children()
      .should("be.visible")
      .and("have.attr", "href", "cookiePolicy.html")
      .click();
    // Check that currently opened URL is correct
    cy.url().should("contain", "/cookiePolicy.html");

    cy.go("back");
    cy.log("Back again in registration form 3");
  });

  it("email format", () => {
    //cy.get('input[name="email"]').should("have.attr", "pattern");
    cy.get('input[type="email"]').should("have.attr", "required");
    cy.get('input[type="email"]').type("invalid");
    cy.get('[ng-show="myForm.email.$error.email"]')
      .should("be.visible")
      .should("contain", "Invalid email address.");
    cy.get('input[type="email"]').clear().type(" ");
    cy.get('[ng-show="myForm.email.$error.required"]')
      .should("be.visible")
      .should("contain", "Email is required.");
  });

  it("Check that logo is correct and has correct size", () => {
    cy.log("Will check logo source and size");
    cy.get('img[data-testid="picture"]')
      .should("have.attr", "src")
      .should("include", "cerebrum_hub_logo.png");
    // get element and check its parameter height, to less than 178 and greater than 100
    cy.get('img[data-testid="picture"]')
      .invoke("height")
      .should("be.lessThan", 178)
      .and("be.greaterThan", 100);
  });
});

/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + corresponding assertions
    * only mandatory fields are filled in + corresponding assertions
    * mandatory fields are absent + corresponding assertions (try using function)
    * add file functionlity(google yourself for solution!)
 */

//discribe("Functional tests", () => {});
