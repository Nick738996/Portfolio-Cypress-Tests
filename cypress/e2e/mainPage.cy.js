describe('Test main page', function () {
  beforeEach(function () {
    cy.visit('/');
  });
  it('validate containers', function () {
    cy.get('.home__container').then(homeContainer => {
      cy.wrap(homeContainer)
        .should('have.css', 'background-color', 'rgb(50, 13, 119)')
        .find('[alt="Diego Sarmiento profile"]')
        .should('be.visible');
      cy.wrap(homeContainer).find('.project__container').should('be.visible');
    });
    cy.percySnapshot('Home container');
  });
  it('validate all buttons', function () {
    cy.get('.button__container').each((buttonsBox, index) => {
      const text = ['Get in touch', 'CV / Resumé', 'Send me an email'];
      const href = [
        'https://api.whatsapp.com/send?phone=573142968917',
        'https://diegosarmientocv.s3.amazonaws.com/Diego+Sarmiento+(2).pdf',
        'mailto:me@diegosarmiento.co',
      ];
      cy.wrap(buttonsBox)
        .contains('a', text[index])
        .should('have.attr', 'href', href[index]);
    });
  });
  it('validate navigation list', function () {
    const text = ['Projects', 'Who am i?', 'Contact me'];
    const href = ['#PROJECTTARGET', '#WHOAMITARGET', '#CONTACTMETARGET'];
    const landingTitle = [
      '1. Landingpage for enproa.co',
      'Choosing the rigth candidate could be overwhelmed , right?',
      'So, ¿How can i help you?',
    ];
    cy.get('.navbar__container')
      .first('ul')
      .find('li.list')
      .each((list, index) => {
        cy.wrap(list)
          .contains('a', text[index])
          .should('have.attr', 'href', href[index])
          .click();
        cy.get('.home__container').contains(landingTitle[index]);
      });
  });
  it('validate footer', function () {
    let shouldStop = false;
    cy.get('.aboutme__container').find('div').should('be.visible');
    cy.get('[alt="Diego Sarmiento stack images"]').should('have.length', '9');
    cy.get('.skills_title')
      .parents()
      .each((skills, index) => {
        cy.then(() => {
          if (shouldStop) {
            return;
          }
        });
        const text = ['Hard skills', 'Core skills'];
        if (index == 1) {
          cy.wrap(skills)
            .find('.skills__container')
            .eq(index)
            .find('.skills')
            .should('have.length', '3')
            .and('be.visible');
          cy.wrap(skills)
            .find('.skills_title')
            .eq(index)
            .invoke('prop', 'innerText')
            .should('contain', text[index]);
          shouldStop = true;
        }
      });

    cy.get('.footer__container').each((footer, index) => {
      const href = [
        'https://github.com/diegosarmiento11',
        'https://www.figma.com/file/iO3Nl0D7lpjdQf6Cn0kuTO/Untitled?node-id=11%3A0',
        'https://api.whatsapp.com/send?phone=573142968917',
      ];
      cy.wrap(footer)
        .find('a')
        .should('have.length', '3')
        .and('have.attr', 'href', href[index])
        .find('img')
        .should('have.attr', 'src');
    });
    cy.contains(
      'p',
      'Designed, builded and shared by Diego Sarmiento 👌🏻😁 with ❤️ from 🇨🇴 - 2021'
    );
  });
});
