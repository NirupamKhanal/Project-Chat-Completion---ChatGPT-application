const API_KEY = FileReader('READ_ME.txt', 4)
const modelgpt = FileReader('READ_ME.txt', 7)
const submitBotton = document.querySelector('#submit')
const outputElement = document.querySelector('#output')
const inputElement = document.querySelector('input')
const historyElement = document.querySelector('.history')
const buttonElement = document.querySelector('button')

function changeInput() {
    const inputElement = document.querySelector('input')
    inputElement.value = value
}

async function getMessage() { 
    console.log('clicked')  
    const options = {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: modelgpt,
            messages: [{role: "User", Content: inputElement.values}],
        })
    }
}

    try{
        const response = await fetch('https://api.openai.com/v1/completions', options)
        const data = await response.json()
        console.log(data)
        outputElement.textContent = data.choices[0].message.Content
        if (data.choices[0].message.Content && inputElement.value) {
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            historyElement.append(pElement)
        }
    } catch (error) {
        console.error(error)
    } 

function clearInput () {
    inputElement.value = ''
}

submitBotton.addEventListener('click', getMessage)

historyElement.addEventListener('click', clearInput)