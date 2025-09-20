const { test, expect } = require('@playwright/test')

test('register_new_user', async({page}) => {
    await page.goto('https://www.blazedemo.com')
    await expect(page).toHaveURL('https://www.blazedemo.com') // Valida a URL
    await expect(page.locator('h1')).toHaveText('Welcome to the Simple Travel Agency!') // Valida o texto na página inicial


    // Criando constante para a sessão de home
    const section_home = page.getByRole('link', { name: 'home' });
    await expect(section_home).toHaveText('home') 
    await section_home.click() // Indo para a sessão home
    await expect(page).toHaveURL('https://www.blazedemo.com/login') // Valida URL

    // Criando constante para a sessão Register (cadastrar usuário)
    const section_register = page.getByRole('link', {name: 'Register'})
    await expect(section_register).toHaveText('Register')
    await section_register.click() // Indo para a sessão Register
    await expect(page).toHaveURL('https://www.blazedemo.com/register') // Valida URL
    await expect(page.locator('.panel-heading')).toHaveText('Register')

    // Preenchendo dados do novo usuário
    await page.locator('#name').fill('Nathalia Escossio')
    await page.locator('#company').fill('List 07 Company')
    await page.locator('#email').fill('nathalia@email.com')
    await page.locator('#password').fill('123456')
    await page.locator('#password-confirm').fill('123456')

    // Clicando no botão para registrar e validando mensagem final
    const botao_register = page.locator('.btn.btn-primary')
    await expect(botao_register).toHaveText('Register')
    await botao_register.click()
    await expect(page.locator('.message')).toHaveText('Page Expired')

})