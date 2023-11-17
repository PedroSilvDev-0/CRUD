function logout() {
    firebase.auth().signOut().then(() => {
        window.location.href = "index.html"
    }).catch(() => {
        alert('Erro ao fazer logout.')
    })
}

findTransactions()

function findTransactions() {
    setTimeout(() => {
        addTransactionsToScreen(fakeTransactions)
    }, 1000)
}

function addTransactionsToScreen(transactions) {
    const orderedList = document.getElementById('transactions')

    transactions.forEach(transaction => {
        const li = document.createElement('li')
        li.classList.add(transaction.type)

        const date = document.createElement('p')
        date.innerHTML = formatDate(transaction.date)
        li.appendChild(date) // appendChild = anexar filho

        const money = document.createElement('p')
        money.innerHTML = formatMoney(transaction.money)
        li.appendChild(money)

        const type = document.createElement('p')
        type.innerHTML = transaction.transactionType
        li.appendChild(type)

        if (transaction.description) {
            const description = document.createElement('p')
            description.innerHTML = transaction.description
            li.appendChild(description)
        }

        orderedList.appendChild(li)
    })
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br')
}

function formatMoney(money) {
    return `${money.currency} ${money.value.toFixed(2)}`
}

const fakeTransactions = [{
    type: 'expense',
    date: '2023-01-04',
    money: {
        currency: 'R$',
        value: 150
    },
    transactionType: 'Supermercado'
},  {
    type: 'income',
    date: '2023-04-17',
    money: {
        currency: 'R$',
        value: 1300
    },
    transactionType: 'Salário',
    description: 'Empresa A'
},  {
    type: 'expense',
    date: '2023-04-11',
    money: {
        currency: 'R$',
        value: 120
    },
    transactionType: 'Transporte',
    description: 'Gasolina'
},  {
    type: 'expense',
    date: '2023-05-24',
    money: {
        currency: 'R$',
        value: 200
    },
    transactionType: 'Aluguel',
    description: 'Mensalidade'
}]