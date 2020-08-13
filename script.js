class Calculator {
    //take all the inputs and all function
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear // clears all inputs to default value
    }
    // funcion "Clear"
    clear(){
        this.currentOperand = ''  //empty string
        this.previousOperand = ''  //empty string
        this.operation = undefined  // dont have any operation selected if clear things
    }

    // fuction "Delete" to remove single number
    delete(){
        // current operand is made to string , slice chops off the very last value
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    // function appendNumber adds to the display every number pressed 
    appendNumber(number){
        // allows period key '.' to be only once
        if (number ==='.' && this.currentOperand.includes('.')) return;
        //this.currentOperand = number
        // adds the number to display
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    // functoion chooseOperation allows user select a operator
    chooseOperation(operation){
        // no value then returns
        if (this.currentOperand === '') return
        // if there is a vlaue it computes
        if (this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        // done with the current operand
        this.previousOperand = this.currentOperand
        // clear out the current operand
        this.currentOperand = ''

    }

    // funciton compute take the value and compute
    compute(){
        let computation;

        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        // no previous or currents value then returns which cancels this function completely
        if(isNaN(prev) || isNaN(current)) return
        // switch statement is bunch of 'if' statement chained after each other, allows to use bunch of 'if' statements at once
        switch (this.operation) {
            case '+':
                computation = prev + current
                // break not to follow any other case statement and leave this statement
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            //  default is naytime none these operation matches    
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    // Numbers are split with a ',' and digits before and after decimal
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ''
        }else{
            integerDisplay = integerDisplay.toLocaleString('en',{
                masimumFractionDigits: 0
            })
        }
        // if there is a decimal it diplays beofre after digits
        if (dicimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else {
        // no decimal displays integer
            return integerDisplay
        }
    }
    //updates the value on display
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        if(this.operation != null){
            //operator displayed with the previous value
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
        // clears the  previous operand  when equal clicked and display current value   
        } else {
            this.previousOperandTextElement.innerText = ''
        }
        //this.previousOperandTextElement.innerText = this.previousOperand
    }
}

//gets all the number elements
const numberButtons = document.querySelectorAll('[data-number]')
//gets all the operation elements
const operationButtons = document.querySelectorAll('[data-operation]')
//gets the equal element
const equalsButton = document.querySelector('[data-equals]')
//gets delete elements
const deleteButton = document.querySelector('[data-delete]')
//gets the clear elements
const allClearButton = document.querySelector('[data-all-clear]')
//gets previous elements
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
//gets current elements
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//create calculator
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// selects number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay();
    })
})

// selects operations
operationButtons.forEach(button => {
    button.addEventListener('click', () =>{
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
    })
})

// selects Equal
equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})

// selects Clear
allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

// selects Delete
deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})
