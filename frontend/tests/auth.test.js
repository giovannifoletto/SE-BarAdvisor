const { test, expect } = require('@playwright/test');
// const mockData = require('./mockData');
const casual = require('casual');

/**
 * BlackBox e2e Tesing del flow di registrazione di Cliente e Gestore Locale
 */

const mockData = {
  Cliente: {
    nome: casual.username,
    email: casual.email,
    password: casual.password
  },
  GestoreLocale: {
    nome: casual.username,
    email: casual.email,
    password: casual.password,
    locale: casual.company_name,
    posizione: casual.address
  }
}

test.describe("PAGE /signup", () => {

  test('/cliente ', async ({ page }) => {

    await page.goto(``);

    await expect(page.locator('text=Bar Advisor')).toHaveText('Bar Advisor');
    await page.locator('ul div:has-text("Login")').first().click();
    await expect(page).toHaveURL(`/login`);

    await page.locator('text=Crea Nuovo Account').click();
    await expect(page).toHaveURL(`/signup`);
    await page.locator('text=Sono un cliente').click();
    await expect(page).toHaveURL(`/signup/cliente`);

    await page.locator('[placeholder="Inserisci Email"]').click();
    await page.locator('[placeholder="Inserisci Email"]').fill(mockData["Cliente"]["nome"]);
    await page.locator('[placeholder="Inserisci Email"]').press('Tab');
    await page.locator('[placeholder="Enter email"]').fill(mockData["Cliente"]["email"]);
    await page.locator('[placeholder="Enter email"]').press('Tab');
    await page.locator('#password1').fill(mockData["Cliente"]["password"]);
    await page.locator('#password1').press('Tab');
    await page.locator('#password2').fill(mockData["Cliente"]["password"]);
    await page.locator('text=Registrati').click();

    const [redirect] = await Promise.all([
      page.waitForNavigation(/*{ url: `/login/' }*/),
      page.locator('text=Registrati').click()
    ]);

    await expect(page).toHaveURL('/login/');
  });

  test('Creazione Nuovo Gestore Locale', async ({ page }) => {

    await page.goto(``);
    await page.locator('text=Login').click();
    await expect(page).toHaveURL(`/login`);

    await page.locator('text=Crea Nuovo Account').click();
    await expect(page).toHaveURL(`/signup`);

    await page.locator('text=Sono un gestore di locale').click();
    await expect(page).toHaveURL(`/signup/gestorelocale`);

    await page.locator('[placeholder="Nome Utente"]').click();
    await page.locator('[placeholder="Nome Utente"]').fill(mockData["GestoreLocale"]["nome"]);
    await page.locator('[placeholder="Nome Utente"]').press('Tab');
    await page.locator('[placeholder="Email"]').fill(mockData["GestoreLocale"]["email"]);
    await page.locator('[placeholder="Email"]').press('Tab');
    await page.locator('#password1').fill(mockData["GestoreLocale"]["password"]);
    await page.locator('#password1').press('Tab');
    await page.locator('#password2').fill(mockData["GestoreLocale"]["password"]);
    await page.locator('#password2').press('Tab');
    await page.locator('[placeholder="Nome Locale"]').fill(mockData["GestoreLocale"]["locale"]);
    await page.locator('[placeholder="Nome Locale"]').press('Tab');
    await page.locator('[placeholder="Positione"]').fill(mockData["GestoreLocale"]["posizione"]);


    const [redirect] = await Promise.all([
      page.waitForNavigation(/*{ url: `/login/' }*/),
      page.locator('text=Registrati').click()
    ]);

    await expect(page).toHaveURL(`/login/`);
  });
})

test.describe('PAGE /login', () => {

  test('Login Cliente - Session Storage', async ({ page, context }) => {

    await page.goto('/');
    await page.locator('text=Login').click();
    await expect(page).toHaveURL('/login');

    await page.locator('[placeholder="Inserisci email"]').click();
    await page.locator('[placeholder="Inserisci email"]').fill(mockData["Cliente"]["email"]);
    await page.locator('[placeholder="Inserisci Password"]').click();
    await page.locator('[placeholder="Inserisci Password"]').fill(mockData["Cliente"]["password"]);
    await page.locator('button:has-text("Login")').click();

    await page.waitForNavigation(/*{ url: `${STARTING_URL}/login/' }*/)
    await expect(page).toHaveURL(`/`);

    const sessionStorage = await page.evaluate(() => JSON.stringify(sessionStorage));
    // console.log(sessionStorage)

    expect(sessionStorage).toContain('authToken')
    expect(sessionStorage).toContain('user')
  });

  test("Login Cliente - LocalStorage", async ({page, context}) => {
    await page.goto('/');
    await page.locator('text=Login').click();
    await expect(page).toHaveURL('/login');

    await page.locator('[placeholder="Inserisci email"]').click();
    await page.locator('[placeholder="Inserisci email"]').fill(mockData["Cliente"]["email"]);
    await page.locator('[placeholder="Inserisci Password"]').click();
    await page.locator('[placeholder="Inserisci Password"]').fill(mockData["Cliente"]["password"]);
    await page.locator('button:has-text("Login")').click();

    await page.locator('input[type="checkbox"]').check();

    await page.waitForNavigation(/*{ url: `${STARTING_URL}/login/' }*/)
    await expect(page).toHaveURL(`/`);

    const localStorage = await page.evaluate(() => JSON.stringify(localStorage));
    // console.log(sessionStorage)

    expect(localStorage).toContain('authToken')
    expect(localStorage).toContain('user')
  });

  test("Logout", async ({page, context}) => {
    await page.goto('http://localhost/');
    await page.locator('text=Logout').click();
    
    const localStorage = await page.evaluate(() => JSON.stringify(localStorage));
    const sessionStorage = await page.evaluate(() => JSON.stringify(sessionStorage));

    expect(localStorage.length).toEqual(0)
    expect(sessionStorage.length).toEqual(0)
  })
})