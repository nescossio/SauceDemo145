// 1 - Referência e bibliotecas
// Declara um objeto chamado test que é importado do módulo '@playwright/test'
const { test, expect } = require('@playwright/test')

// 2 - Classe ou Funções ou Métodos
// Um script pode executar de forma:
// - Síncrona: simultâneo.
// - Assíncrona: separados. 
test('Realizar o fluxo de compra da mochila', async({page}) => {
    await page.goto('/') // Acessa a página
    await expect(page).toHaveURL('/') // Valida a URL
    const botao_login = page.locator('#login-button') // Localiza o botão de login
    await expect(botao_login).toHaveText('Login') // Verifica se o texto do botão é "Login"

    // Realiza o login
    await page.locator('#user-name').fill('standard_user') // Preenche o campo de usuário
    await page.locator('#password').fill('secret_sauce') // Preenche o campo de senha
    await botao_login.click() // Clica no botão de login

    // Valida o redirecionamento para a página de produtos
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html') // Valida a URL
    const titulo_produtos = page.locator('.title') // Localiza o título da página
    await expect(titulo_produtos).toHaveText('Products') // Verifica se o título é "Products"

    // Adiciona a mochila ao carrinho
    const botao_add_mochila = page.locator('#add-to-cart-sauce-labs-backpack') // Localiza o botão de adicionar a mochila
    await expect(botao_add_mochila).toHaveText('Add to cart') // Verifica se o texto do botão é "Add to cart"
    await botao_add_mochila.click() // Clica no botão de adicionar a mochila

    // Verificar se exibe o número 1 no carrinho
    const icone_carrinho = page.locator('span.shopping_cart_badge') // Localiza o ícone do carrinho
    await expect(icone_carrinho).toHaveText('1') // Verifica se o número 1 está visível no ícone do carrinho
    await icone_carrinho.click() // Clica no ícone do carrinho

    // Valida o redirecionamento para a página do carrinho
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html') // Valida a URL
    await expect(page.locator('.title')).toHaveText('Your Cart') // Verifica se o título é "Your Cart"
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack') // Verifica se o nome do produto é "Sauce Labs Backpack"
    const checkout_button = page.locator('#checkout')
    await expect(checkout_button).toHaveText('Checkout') // Verifica se o texto do botão é "Checkout"
    await checkout_button.click() // Clica no botão "Checkout"
    // Valida o redirecionamento para a página de informações do cliente

    // Preenche o formulário de informações do cliente
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html') // Valida a URL
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information') // Verifica se o título é "Checkout: our Information"
    await page.locator('#first-name').fill('Nathalia') // Preenche o campo de nome
    await page.locator('#last-name').fill('Cavalcante') // Preenche o campo de sobrenome
    await page.locator('#postal-code').fill('01234-567') // Preenche o campo de código postal
    const botao_continue = page.locator('#continue') // Localiza o botão "Continue"
    await expect(botao_continue).toHaveText('Continue') // Verifica se o texto do botão é "Continue"
    await botao_continue.click() // Clica no botão "Continue"

    // Valida o redirecionamento para a página de overview
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html') // Valida a URL
    await expect(page.locator('.title')).toHaveText('Checkout: Overview') // Verifica se o título é "Checkout: Overview"
    await expect(page.locator('.inventory_item_price')).toHaveText('$29.99') // Verifica se o preço do produto é "$29.99"
    const botao_finish = page.locator('#finish') // Localiza o botão "Finish"
    await expect(botao_finish).toHaveText('Finish') // Verifica se o texto do botão é "Finish"
    await botao_finish.click() // Clica no botão "Finish"

    // Valida o redirecionamento para a página de confirmação
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html') // Valida a URL
    await expect(page.locator('.title')).toHaveText('Checkout: Complete!') // Verifica se o título é "Checkout: Complete!"
    await expect(page.locator('h2.complete-header')).toHaveText('Thank you for your order!') // Verifica se o texto é "Thank you for your order!"

}) // Fim do teste
