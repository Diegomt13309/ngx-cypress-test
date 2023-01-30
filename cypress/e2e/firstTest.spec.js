/// <reference types= "cypress" />

/*describe('Our First Suite', () => {

    describe('Our Suite section', () => {
        beforeEach('code for every test', () => {
            //Repetitive code

        })
        it('Some test', () => {

        })
    })

    it('Our First test', () => {

    })
    it('Our Second test', () => {

    })
    it('Our Third test', () => {

    })

})

describe('Our Second Suite', () => {

    it('Our First test', () => {

    })
    it('Our Second test', () => {

    })
    it('Our Third test', () => {

    })

})*/

describe('Our First Suite', () => {

    it('Our First Test', () => {
        /*
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //by tag name
        cy.get('input')

        //by ID
        cy.get('#inputEmail1')

        //by Class Name
        cy.get('.input-full-width')

        //by Attribute Name
        cy.get('[placeholder]')

        //by Attribute Name and Value
        cy.get('[placeholder="Email"]')

        //by Class Value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //by tag Name and Atrribute with value
        cy.get('input[placeholder="Email"]')

        //by 2 differnt attributes
        cy.get('[placeholder="Email"][type="email"]')

        //by tag name, attribute with value, ID and class name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //The most recommended way by Cypress
        cy.get('[data-cy="imputEmail1"]')
        */
    })

    it('Second test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"')
        cy.contains('Sign in')
        //Cuando el selector diferenciador, ponerlo de primero
        cy.contains('[status="warning"]', 'Sign in')

        //Travel the DOM
        cy.get('#inputEmail3').parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form').find('nb-checkbox').click()

        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')

    })

})



