// 1 - Importação de bibliotecas e desestruturação de objetos

const { test, expect } = require('@playwright/test')

// 2 - Definição do teste
// O primeiro argumento é o nome do teste
// O segundo argumento é uma função assíncrona que recebe um objeto desestruturado com a propriedade 'page', isto é, somente a propriedade 'page' do objeto completo (que interessa para o teste). 
test('Comprar viagem no Blaze Demo', async ({ page}) => {
    await page.goto('https://blazedemo.com') // Acessa a página
    await expect(page).toHaveURL('https://blazedemo.com/') // Valida a URL

    await expect(page.locator('h1')).toHaveText('Welcome to the Simple Travel Agency!') // Valida o título da página

    // Seleciona a cidade de origem
    const cidade_origem = page.locator('select[name = "fromPort"]') // Localiza o campo de seleção da cidade de origem
    await expect(cidade_origem).toBeVisible() // Verifica se o campo está visível
    await cidade_origem.selectOption('São Paolo') // Seleciona a cidade de origem
    await expect(cidade_origem).toHaveValue('São Paolo') // Verifica se a cidade de origem foi selecionada corretamente

    // Seleciona a cidade de destino
    const cidade_destino = page.locator('select[name = "toPort"]') // Localiza o campo de seleção da cidade de destino
    await expect(cidade_destino).toBeVisible() // Verifica se o campo está visível
    await cidade_destino.selectOption('New York') // Seleciona a cidade de destino
    await expect(cidade_destino).toHaveValue('New York') // Verifica se a cidade de destino foi selecionada corretamente  
    
    // Clica no botão "Find Flights"
    await page.locator('.btn.btn-primary').click() // Localiza e clica no botão "Find Flights"

    // Valida o redirecionamento para a página de seleção de voos
    await expect(page).toHaveURL('https://blazedemo.com/reserve.php')
    await expect(page.locator('h3')).toHaveText('Flights from São Paolo to New York:') // Valida o título da página de seleção de voos

    // Seleciona o primeiro voo da lista
    const botao_selecionar_voo = page.locator('.btn.btn-small').nth(2) // Localiza o botão de seleção do terceiro voo
    await expect(botao_selecionar_voo).toBeVisible() // Verifica se o botão está visível
    await botao_selecionar_voo.click() // Clica no botão de seleção do terceiro voo

    // Seleciona o voo e navega para a página de compra
    await expect(page).toHaveURL('https://blazedemo.com/purchase.php') // Valida o redirecionamento para a página de compra
    await expect(page.locator('h2')).toHaveText('Your flight from TLV to SFO has been reserved.') // Valida o título da página de compra

    // Preenche o formulário de compra
    await page.locator('#inputName').fill('Nathalia')
    await page.locator('#address').fill('Rua do Passeio, 123')
    await page.locator('#city').fill('São Paulo')
    await page.locator('#state').fill('SP')
    await page.locator('#zipCode').fill('01234-567')
    await page.locator('#cardType').selectOption('visa')
    await page.locator('#creditCardNumber').fill('12345678901234567')
    await page.locator('#creditCardMonth').fill('11')
    await page.locator('#creditCardYear').fill('2025')
    await page.locator('#nameOnCard').fill('Nathalia Cavalcante')

    // Clica no botão "Purchase Flight"
    const botao_purchase_flight = page.locator('.btn.btn-primary') // Localiza o botão "Purchase Flight"
    await expect(botao_purchase_flight).toBeVisible() // Verifica se o botão está visível
    await botao_purchase_flight.click() // Clica no botão "Purchase Flight"

    // Valida a confirmação da compra
    await expect(page).toHaveURL('https://blazedemo.com/confirmation.php')  // Valida o redirecionamento para a página de confirmação
    await expect(page.locator('h1')).toHaveText('Thank you for your purchase today!') // Valida o título da página de confirmação 


}) // Fim do teste simples
 