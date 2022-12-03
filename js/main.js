//Recovering html div values
const color1 = document.getElementById('c1')
const color2 = document.getElementById('c2')
const color3 = document.getElementById('c3')
const color4 = document.getElementById('c4')
const btnStart = document.getElementById('btnStart')
const maxLevel = 5
const t_i = document.getElementById('t_i')
	

//Creating class
class SS_Game {
	//Init/Constructor
	constructor() {
		this.start = this.start.bind(this)
		this.start()
		this.secuence()
		setTimeout(this.nextLevel, 500) 
  	}

  	start() {
		this.nextLevel = this.nextLevel.bind(this)
		this.chooseColor = this.chooseColor.bind(this)
		this.BtnStart()
		this.instructions()
		this.level = 1
		this.colores = {
			color1,
			color2,
			color3,
			color4
		}
  }
  	//Showing startButton
	BtnStart() {
		if (btnStart.classList.contains('hide')) {
			btnStart.classList.remove('hide')
		}else {
			btnStart.classList.add('hide')
		  }
	  }

	//Showing instructions
	instructions() {
		if (t_i.classList.contains('hide')) {
			t_i.classList.remove('hide')
		}else {
			t_i.classList.add('hide')
		  }
	  }
	
	
	secuence() {
		this.secuencia =  new Array(maxLevel).fill(0).map( n => Math.floor(Math.random() * 4))
	  }
	
	nextLevel() {
		this.subnivel = 0 
		this.iluminateSecuence()
		this.addEventsClick()
	  }
	
	num_to_color(numero) {
		switch (numero) {
			case 0:
				return 'color1'
			case 1:
				return 'color2'
			case 2:
				return 'color3'
			case 3:
				return 'color4'        
		  }
	  }
	
	color_to_num(numero) {
		switch (numero) {
			case 'color1':
				return 0
			case 'color2':
				return 1
			case 'color3':
				return 2
			case 'color4':
				return 3       
		}
	}
	
	iluminateSecuence() {
		for (let i = 0; i < this.level; i++) {
			   const color = this.num_to_color(this.secuencia[i])
			   setTimeout (() => this.iluminateColor(color), 1000 * i) 
		   }
	  }
	
	iluminateColor(color) {
		this.colores[color].classList.add('light')
		setTimeout (() => this.offColor(color), 350)
	  }
	
	offColor(color) {
		this.colores[color].classList.remove('light')
	  }
	
	addEventsClick() {
		this.colores.color1.addEventListener('click', this.chooseColor)
		this.colores.color4.addEventListener('click', this.chooseColor)
		this.colores.color2.addEventListener('click', this.chooseColor)
		this.colores.color3.addEventListener('click', this.chooseColor)
	  }
	
	delEventsClick() {
		this.colores.color1.removeEventListener('click', this.chooseColor)
		this.colores.color4.removeEventListener('click', this.chooseColor)
		this.colores.color2.removeEventListener('click', this.chooseColor)
		this.colores.color3.removeEventListener('click', this.chooseColor)
	  }
	
	chooseColor(ev) {
		const nombreColor = ev.target.dataset.color
		const numeroColor = this.color_to_num(nombreColor)
		this.iluminateColor(nombreColor)
		if (numeroColor === this.secuencia[this.subnivel]) {
			this.subnivel++
			if(this.subnivel === this.level) {
				this.level++
				this.delEventsClick()
				if (this.level === (maxLevel + 1)) {
					this.ganoELJuego()
				} else {
					setTimeout(this.nextLevel, 1000)
				  }
			  }
		  }else {
			this.loose_game()
		  }
	  }

	//Plugin de sweetAlert
	win_game() {
		swal('VICTORY','You won the game :D', 'success')
		.then(this.start)
	  }
	
	loose_game() {
		swal('DEFEAT','You loose, try again :(', 'error')
		.then (()=> {
			this.delEventsClick()
			this.start()
		})
	}
	}
	
	function startGame() {
		console.log('Git repository check')
		window.game = new SS_Game()
	}

