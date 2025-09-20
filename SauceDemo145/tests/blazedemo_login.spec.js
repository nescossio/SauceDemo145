const { test, expect } = require('@playwright/test')

test('fazer_login', async({page}) => {
    await page.goto('https://www.blazedemo.com')
    await expect(page).toHaveURL('https://www.blazedemo.com') // Valida URL
    await expect(page.locator('h1')).toHaveText('Welcome to the Simple Travel Agency!')

    // Criando constante para a sessão home
    const section_home = page.getByRole('link', { name: 'home' }) 
    await expect(section_home).toHaveText('home')
    await section_home.click()

    // Valida redirecionamento para a sessão home
    await expect(page).toHaveURL('https://www.blazedemo.com/login')
    await expect(page.locator('.panel-heading')).toHaveText('Login')

    // Preenche dados do usuário para login
    await page.locator('#email').fill('nathalia@email')
    await page.locator('#password').fill('123456')

    const rememberCheckbox = page.locator('input[name="remember"]');
    // Espera que esteja desmarcado
    await expect(rememberCheckbox).not.toBeChecked();
    // Marca o checkbox
    await rememberCheckbox.check();
    // Espera que agora esteja marcado
    await expect(rememberCheckbox).toBeChecked();

    const botao_login = page.locator('.btn.btn-primary')
    await expect(botao_login).toHaveText('Login')
    await botao_login.click() // Clicando no botão de login

    await expect(page.locator('.message')).toHaveText('Page Expired') // Validando mensagem final

})

