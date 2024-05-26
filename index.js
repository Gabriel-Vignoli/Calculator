const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "] //teclas permitidas


//vai pegar todos os elementos com a clase charKey, e para cada elemento ira adicionar uma função, que vai adicinar um evento de click ao botão e ao clicar ira fazer uma função, que vai pegar o valor da data e vai adicionar ao input
document.querySelectorAll('.charKey').forEach(function (charKeyBtn) {
    charKeyBtn.addEventListener('click', function () {
        const value = charKeyBtn.dataset.value //vai pegar o valor da data daquele botão
        input.value += value//e vai pegar o valor anterior do input e vai adiconando um valor na frente
    })
})



//vai pegar um elemento com o id clear e vai adicionar um evento de click nele passando uma função, que ao clicar no botão vai deixar o input vazio e vai dar um foco nele, ou seja, vai selecionar o input após clicar no botão
document.getElementById('clear').addEventListener('click', function () {
    input.value = "" //o valor do input vai ficar vazio
    input.focus() //vai dar um foco ao input
})




//esse keydow é um evento de quando pressionar uma tecla ira receber esse evento
input.addEventListener('keydown', function (ev) {
    ev.preventDefault() //vai previnir o comportamento padrão do evento, que é, se ele apertar uma tecla ela n será adiciona ao input, apenas se o if abaixo for verdadeiro

    if (allowedKeys.includes(ev.key /*key é a tecla que o usuario precionou nesse evento*/)) { //se essa tecla tiver incluida no array allowedKeys então ai sim ira adiconar a tecla ao input
        input.value += ev.key //vai pegar o valor do input e vai juntar com a tecla clicada 
        return //vai encerrar a função
    }

    if (ev.key === 'Backspace') /*se a tecla clicada for igual a tecla de apagar*/{
        input.value = input.value.slice(0, -1) //então vai adicionar um novo valor ao input, através do valor atual dele e cortando do ultimo numero até o penultimo, ou seja apagando um numero ou caracter por vez
    }

    if (ev.key === 'Enter') /*se a tecla clicada for igual a tecla enter*/{
        calculate()
    }
})

//vai selecionar o elemento com o id equal e vai adicionar um evento de clique a ele e vai passar uma função para ele toda vez q ele for clicado
document.getElementById('equal').addEventListener('click', calculate)


//essa função vai pegar o valor do input e vai avaliar ele e executar ele, e depois vai adicionar ele ao input de resultado, se o valor dele n for de erro
function calculate() {
    resultInput.value = 'ERROR' //vai adiconar o valor de erro
    resultInput.classList.add('error') //vai adiconar a classe do css error

    const result = eval(input.value) //o eval é uma função muito perigosa, pq pessoas mal podem deigitar codigos javascript e o programa vai rodar ele

    //se a função eval for executada então o programa vai ler o codigo abaixo, se não ele vai parar e vai mostrar erro
    resultInput.value = result //o valor do input do resultado vai ser igual ao valor que a função eval executar
    resultInput.classList.remove('error')
}


//essa função vai ser responsavel por trocar o tema da pagina através das variáveis do css
document.getElementById('themeSwitcher').addEventListener('click', function() {
    if (main.dataset.theme === 'dark') /*se o valor da data-theme for de dark então vai pegar as variaveis do root e vai muda-las */ {
        root.style.setProperty('--bg-color', '#f1f5f9') //vai acessar os estilos dentro do root e vai setar as propriedades indicadas, vai mudar o valor da variavel --bg-color para #f1f5f9
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--primary-color', '#0b1e70')
        main.dataset.theme = 'light' //vai mudar o valor data-theme do menu para light
    } else /*se o data-theme dor diferente de dar então vai pegar as variaveis do root e vai muda-las*/ {
        root.style.setProperty('--bg-color', '#212529')
        root.style.setProperty('--border-color', '#666')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--primary-color', '#4dff91')
        main.dataset.theme = 'dark' //vai mudar o valor do data-theme do menu para dark
    }
})


//essa função vai fazer com que ao clicar no botão ele vai mudar o nome, e a classe dele do css e vai copiar o valor do input de resultado
document.getElementById('copyToClipboard').addEventListener('click', function (ev) {
    const button = ev.currentTarget //vai receber o alvo clicado
    if (button.innerText === 'Copy') /*se o texto do botão for igual a copy então*/{
        button.innerText = 'Copied!' //vai mudar o texto dele para copied
        button.classList.add('success')//vai adicionar a classe do css success
        navigator.clipboard.writeText(resultInput.value)//e vai copiar o texto que está no valor no input de resultado
    } else {
        button.innerText = "Copy" //senão vai adicionar o texto copy ao botão
        button.classList.remove('success') //e vai remover a classe success do botão
    }
})