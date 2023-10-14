import LoginValidation from "../support/pageobjects/loginValidation";
const loginObjValidation: LoginValidation = new LoginValidation();
import  CandidatePage  from "../support/pageobjects/CandidatePage";
const candidate: CandidatePage = new CandidatePage();
describe("Login Home Page", () => {
    beforeEach(function () {
        cy.fixture('login').as('data')
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
        cy.get('@data').then((infoData: any) => {
            loginObjValidation.fillData(infoData.valid.name, infoData.valid.password)
            loginObjValidation.checkPage(infoData.valid.message)
        })
    })

     it("Add Candidate Via API", () => {
        cy.request({
            method: 'Post',
            url: 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates',
            body:
            {
                "firstName": "Israa",
                "middleName": "M",
                "lastName": "Shtayeh",
                "email": "israash@gmail.com",
                "contactNumber": null,
                "keywords": null,
                "comment": null,
                "dateOfApplication": "2023-10-15",
                "consentToKeepData": false,
                "vacancyId": 4
            }

        }).then((resp) => {
            console.log(resp.body.data.id)
            const id = resp.body.data.id
            cy.request({
                method: 'Put',
                url: `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/${id}/shortlist`

            }).then(() => {
                cy.visit(`https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/addCandidate/${id}`)    
            }).then(()=>{
candidate.schedualeInterview()
            })

        })
    })
    // it("Sceduale Interview",()=>{
      
    //     cy.get('.oxd-button--success', { timeout: 30000 }).click({ force: true }).then(() => {
    //         cy.get('.oxd-date-input .oxd-icon').click({ force: true })
    //         cy.get('.oxd-calendar-wrapper').contains('Today').click({ force: true })
    //         cy.get(' .oxd-input', { timeout: 30000 }).eq(5).type("Interview1")
    //         cy.get('.oxd-autocomplete-text-input ').type("a")
    //         cy.get('.oxd-autocomplete-option').eq(1).click({ force: true })
    //         cy.get('.oxd-button--secondary').click({ force: true })
    //     }).then(() => {
    //         cy.get('.orangehrm-recruitment-status').should('contain', 'Status: Interview Scheduled')
    //     })

    // })
})