const { defineConfig } = require('@playwright/test')
module.exports = defineConfig({
    testDir: './tests', // Diretório onde estão os testes
    use: {
        baseURL: 'https://www.saucedemo.com',
        headless: false, // Executa os testes em modo headless (com interface gráfica)
        launchOptions: {
            slowMo: 1000 // Adiciona um atraso de 1000ms entre as ações
        } 
        

    }
})