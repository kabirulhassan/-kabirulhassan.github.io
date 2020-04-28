
class Calculator
{
	constructor(prevText,currText)
	{
		this.prevText = prevText
		this.currText = currText
		this.clear()
	}
	clear()
	{
		this.currentOperand = ''
		this.previousOperand = ''
		this.operation = undefined
	}
	delete()
	{
		this.currentOperand = this.currentOperand.toString().slice(0,-1)
	}
	append(number)
	{
		if(number==='.' && this.currentOperand.includes('.'))
			return
		this.currentOperand = this.currentOperand.toString()+number.toString()
	}
	chooseOperation(operation)
	{
		if(this.currentOperand==='')
			return
		if(this.previousOperand!=='')
			this.compute();
		this.operation = operation
		this.previousOperand = this.currentOperand
		this.currentOperand = ''
	}
	compute()
	{
		let computation
		const prev = parseFloat(this.previousOperand)
		const curr = parseFloat(this.currentOperand)
		if(isNaN(prev)||isNaN(curr))
			return
		switch(this.operation)
		{
			case '+':
				computation = prev + curr
				break
			case '-':
				computation = prev - curr
				break
			case '*':
				computation = prev * curr
				break
			case '/':
				computation = prev / curr
				break
			default:
				return
		}
		this.currentOperand = computation
		this.operation = undefined
		this.previousOperand = ''
	}
	display()
	{
		this.currText.innerText = this.currentOperand
		if(this.operation != null)
		{
			this.prevText.innerText = this.previousOperand.toString()+this.operation.toString() 
		}
		if(currText.innerText==="108")
		{
			prevText.innerText="Taposher"
		}
//		this.prevText.innerText = this.previousOperand
	}
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const acButton = document.querySelector('[data-ac]')
const prevText = document.querySelector('[data-prev]')
const currText = document.querySelector('[data-curr]')
const delButton = document.querySelector('[data-del]')

const calculator = new Calculator(prevText,currText)

numberButtons.forEach(button =>
{
	button.addEventListener('click',()=>
	{
		calculator.append(button.innerText)
		calculator.display()
	})
})

operationButtons.forEach(button =>
{
	button.addEventListener('click',()=>
	{
		calculator.chooseOperation(button.innerText)
		calculator.display()
	})
})

equalsButton.addEventListener('click',buton =>
{
	calculator.compute()
	calculator.display()
})

delButton.addEventListener('click',buton =>
{
	calculator.delete()
	calculator.display()
})

acButton.addEventListener('click',buton =>
{
	delete calculator
	const calculator = new Calculator(prevText,currText)
	calculator.display()
})