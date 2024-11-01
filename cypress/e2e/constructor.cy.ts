import tokensJson from '../fixtures/tokens.json';
import { setCookie, deleteCookie, getCookie } from '../../src/utils/cookie';

beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
  cy.visit('http://localhost:4000/');
  cy.wait('@getIngredients'); // ожидание загрузки данных
});

describe('[Конструктор бургера]', () => {
  it('Добавление ингредиента из списка в конструктор.', () => {
    const button = cy
      .get(`[data-cy=643d69a5c3f7b9001cfa093c] button`)
      .contains('Добавить');
    button.click();
  });


  it('Добавление соуса из списка в конструктор.', () => {
    const button = cy
      .get(`[data-cy=643d69a5c3f7b9001cfa0942] button`)
      .contains('Добавить');
    button.click();
    cy.get('[data-cy=constructor-item]')
      .should('have.length', 1)
      .last()
      .should('contain.text', 'Соус Spicy-X');
  });

  it('Добавление булки из списка в конструктор.', () => {
    const button = cy
      .get(`[data-cy=643d69a5c3f7b9001cfa093c] button`)
      .contains('Добавить');
    button.click();
    cy.get('[data-cy=bun-item]')
      .should('have.length', 1)
      .last()
      .should('contain.text', 'Краторная булка N-200i');
  });
});

describe('[Модальные окна]', () => {
  beforeEach(() => {
    const ingredientCard = cy.get('[data-cy=643d69a5c3f7b9001cfa0941]');
    ingredientCard.click();
  });

  it('Открытие модального окна', () => {
    cy.get('[data-cy=modal]')
      .should('exist')
      .should('contain.text', 'Биокотлета из марсианской Магнолии');
  });

  it('Закрытие модального окна при клике на крестик.', () => {
    cy.get('[data-cy=modal]')
      .should('exist')
      .find('[data-cy=close-button]')
      .click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Закрытие модального окна при клике на оверлей.', () => {
    cy.get('[data-cy=modal]').should('exist');
    cy.get('body').click(0, 0);
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

describe('[Создание заказа]', () => {
  before(() => {
    localStorage.setItem('refreshToken', tokensJson.refreshToken);
    setCookie('accessToken', tokensJson.accessToken);
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
  });

  it('Создание заказа', () => {
    // сборка бургера
    const buttonMain = cy
      .get(`[data-cy=643d69a5c3f7b9001cfa0941] button`)
      .contains('Добавить');
    const buttonSauce = cy
      .get(`[data-cy=643d69a5c3f7b9001cfa0942] button`)
      .contains('Добавить');
    const buttonBun = cy
      .get(`[data-cy=643d69a5c3f7b9001cfa093c] button`)
      .contains('Добавить');
    buttonMain.click();
    buttonSauce.click();
    buttonBun.click();
    cy.get('[data-cy=submit-order]').contains('Оформить заказ').click();
    // проверка модального окна
    cy.get('[data-cy=modal]')
      .should('exist')
      .should('contain.text', 'Ваш заказ начали готовить')
      .find('[data-cy=order-id]')
      .should('have.text', '44414');
    cy.get('[data-cy=modal]').find('[data-cy=close-button]').click();
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get('[data-cy=constructor-item]').should('have.length', 0);
  });

  after(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  });
});
