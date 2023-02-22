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

    it('Then and wrap methods!', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //Normal
        /*
        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        //Selenium Style
        //Cannot work like this because Cypress is Async
        const firstLocator = cy.contains('nb-card', 'Using the Grid')
        const secondLocator = cy.contains('nb-card', 'Basic form')
        firstLocator.find('[for="inputEmail1"]').should('contain', 'Email')
        firstLocator.find('[for="inputPassword2"]').should('contain', 'Password')
        secondLocator.find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        secondLocator.find('[for="exampleInputPassword1"]').should('contain', 'Password')
        */
        cy.contains('nb-card', 'Using the Grid').then(firstLocator => {
            const firstEmail = firstLocator.find('[for="inputEmail1"]').text()
            const firstPassword = firstLocator.find('[for="inputPassword2"]').text()
            expect(firstEmail).to.equal('Email')
            expect(firstPassword).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then(secondLocator => {
                const secondPassword = secondLocator.find('[for="exampleInputPassword1"]').text()
                expect(firstPassword).to.equal(secondPassword)

                //Wrap, change context of JQuery to Cypress
                cy.wrap(secondLocator).find('[for="exampleInputPassword1"]').should('contain', 'Password')
            })
        })



    })

    it('invoke commands', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2
        cy.get('[for="exampleInputEmail1"]').then(inputLabel => {
            expect(inputLabel.text()).to.equal('Email address')
        })

        //3 Invoke Command
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })

        //3.1
        cy.contains('nb-card', 'Basic form').find('nb-checkbox').click()
            .find('.custom-checkbox').invoke('attr', 'class')
            .//should('contain', 'checked') the same as below
            then(classValue => {
                expect(classValue).to.contain('checked')
            })
    })

    it('Invoke 3.2, Assert Property', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('17').click()
            cy.wrap(input).invoke('prop', 'value')
                .should('contain', 'Feb 17, 2023')

        })
    })

    it('Radio Buttons', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons).first().check({ force: true })
                .should('be.checked')

            cy.wrap(radioButtons).eq(1).check({ force: true })

            cy.wrap(radioButtons).first().should('not.be.checked')

            cy.wrap(radioButtons).last().should('be.disabled')

        })
    })

    it('Checkboxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').first().click({ force: true })
        cy.get('[type="checkbox"]').eq(1).check({ force: true })
        cy.get('[type="checkbox"]').last().click({ force: true })
    })

    it('List and Dropdown', () => {
        cy.visit('/')

        /*1
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')
        */

        //Using the list
        cy.get('nav nb-select').then(buttonDD => {
            cy.wrap(buttonDD).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim()
                const colors = {
                    'Light': 'rgb(255, 255, 255)',
                    'Dark': 'rgb(34, 43, 69)',
                    'Cosmic': 'rgb(50, 50, 89)',
                    'Corporate': 'rgb(255, 255, 255)'
                }

                cy.wrap(listItem).click()
                cy.wrap(buttonDD).should('contain', `${itemText}`)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])

                if (index < 3) {
                    cy.wrap(buttonDD).click()
                }
            })

        })





    })

    it('Web tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1
        cy.get('tbody').contains('tr', 'Larry').then(row => {
            cy.wrap(row).find('.nb-edit').click()
            cy.wrap(row).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(row).find('.nb-checkmark').click()
            cy.wrap(row).find('td').eq(6).should('contain', 25)
        })

        //2
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(row => {
            cy.wrap(row).find('[placeholder="First Name"]').type('Diego')
            cy.wrap(row).find('[placeholder="Last Name"]').type('Monterrey')
            cy.wrap(row).find('.nb-checkmark').click()
        })
        cy.get('tbody').find('tr').first().find('td').then(cols => {
            cy.wrap(cols).eq(2).should('contain', 'Diego')
            cy.wrap(cols).eq(3).should('contain', 'Monterrey')
        })

        //3
        const age = [20, 30, 40, 200]
        cy.wrap(age).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(trowd => {
                if (age == 200) {
                    cy.wrap(trowd).should('contain', 'No data found')
                } else {
                    cy.wrap(trowd).find('td').eq(6).should('contain', age)
                }
            })
        })
    })

    it.only('Date Picker enhance', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        cy.contains('nb-card', 'Common Datepicker').find('input').click()



        function clickOnDate(day) {
            let date = new Date()
            date.setDate(date.getDate() + day)
            cy.log(date.getDate())
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('defautl', { month: 'short' })
            let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()

            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                if (!dateAttribute.includes(futureMonth)) {
                    cy.get('[data-name="chevron-right"]').click()
                    clickOnDate(day)
                } else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        }




        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            let dateAssert = clickOnDate(300)
            cy.wrap(input).invoke('prop', 'value')
                .should('contain', dateAssert)

        })
    })
})



