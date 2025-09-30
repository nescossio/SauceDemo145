// Bibliotecas nativas do Node.js
const fs = require('fs') // File System - Manipulação de arquivos (SO)
const path = require('path') // Path - Manipulação de caminhos (SO)

// Formatar número com zero na frente, se precisar
function pad2(number) {return String(number).padStart(2, '0')}

// Função para definir data e hora baseado no momento da execução do script
function compute_run_folder(baseDir){
    // Cria o carimbo de data via CI (Integração Contínua)
    if (process.env.RUN_TAG){
        const tag = process.env.RUN_TAG.replace(/[^\w-:.]/g, '_') // CI 
        const runDir = path.join(baseDir, tag)
        fs.mkdirSync(runDir, { recursive: true })
        return runDir
    }

    // Verifica a data e hora
    const now = new Date() // pergunta a data atual
    const yyyy = String(now.getFullYear()) // ano com 4 dígitos
    const MM = pad2(now.getMonth()) // mês com 2 dígitos
    const dd = pad2(now.getDate()) // dia com 2 dígitos
    const hh = pad2(now.getHours()) // hora com 2 dígitos
    const mm = pad2(now.getMinutes()) // minuto com 2 dígitos
    const ss = pad2(now.getSeconds()) // segundo com 2 dígitos

    // Cria a pasta de execução
    const runDir = path.join(baseDir, `${yyyy}-${MM}-${dd}_${hh}h${mm}m${ss}s`)
    fs.mkdirSync(runDir, { recursive: true })
    return runDir

    // Cria subpastas
    function ensure_subdirs(runDir){
        const dirs = {
            runDir,
            screenshots: path.join(runDir, 'screenshots'),
        }

        Object.values(dirs).forEach(d => {
            if (!fs.existsSync(d)) {
                fs.mkdirSync(d, { recursive: true })
            }
        })
        return dirs
    }
}

module.exports = { compute_run_folder, ensure_subdirs }