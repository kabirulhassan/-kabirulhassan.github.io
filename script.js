
class Calculator
{
	constructor(prevText,currText)
	{
		this.prevText = prevText;
		this.currText = currText;
		this.prevText.innerText='';
		this.currText.innerText='';
		this.clear();
	}
	clear()
	{
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;
	}
	delete()
	{
		this.currentOperand = this.currentOperand.toString().slice(0,-1);
	}
	append(number)
	{
		if(number==='.' && this.currentOperand.includes('.'))
			return;
		this.currentOperand = this.currentOperand.toString()+number.toString();
	}
	chooseOperation(operation)
	{
		if(this.currentOperand==='')
			return;
		if(this.previousOperand!=='')
			this.compute();
		this.operation = operation;
		this.previousOperand = this.currentOperand+operation.toString();
		this.currentOperand = '';
	}
	compute()
	{
		let computation;
		const prev = parseFloat(this.previousOperand);
		const curr = parseFloat(this.currentOperand);
		if(isNaN(prev)||isNaN(curr))
			return;
		switch(this.operation)
		{
			case '+':
				computation = prev + curr;
				break;
			case '-':
				computation = prev - curr;
				break;
			case '*':
				computation = prev * curr;
				break;
			case '/':
				computation = prev / curr;
				break;
			default:
				return;
		}
		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = '';
	}
	dectobin()
	{
		if(this.currentOperand==="")
			return;
		var bin="";
		var n = parseInt(this.currentOperand);
		while(n!=0)
		{
			var f=n%2;
			bin = bin + f;
			n=Math.floor(n/2);			
		}
		var t=""
		for(var i=bin.length-1;i>=0;i--)
		{
			t=t+bin[i];
		}
		this.currentOperand=t;
	}
	bintodec()
	{
		if(this.currentOperand==="")
			return;
		var s=this.currentOperand.toString();
		var dec=0;
		var j=0;
		for(var i=s.length-1;i>=0;i--)
		{
			var c=s.charAt(i);
			if(!(c==='1'||c==='0'))
				return;
			dec+=parseInt(c)*Math.floor(Math.pow(2,j++));
		}
		this.currentOperand=dec.toString();
	}
	display()
	{
		this.currText.innerText = this.currentOperand
		this.prevText.innerText = this.previousOperand
		if(this.operation != null)
		{
			this.prevText.innerText = this.previousOperand.toString()
		}
// 		if(this.currText.innerText==="108")
// 			this.prevText.innerText="Taposher"
// 		if(this.currText.innerText==="420")
// 			this.prevText.innerText="Sunit"
// 		if(this.currText.innerText==="69")
// 			this.prevText.innerText="Borolok Loves"
	}
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const acButton = document.querySelector('[data-ac]')
const prevText = document.querySelector('[data-prev]')
const currText = document.querySelector('[data-curr]')
const delButton = document.querySelector('[data-del]')
const binButton = document.querySelector('[data-bin]')
const decButton = document.querySelector('[data-dec]')

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
	calculator.clear();
	calculator.display();
})

binButton.addEventListener('click',buton =>
{
	calculator.dectobin();
	calculator.display();
})

decButton.addEventListener('click',buton =>
{
	calculator.bintodec();
	calculator.display();
})
