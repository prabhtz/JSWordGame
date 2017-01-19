(function(){


function getRandom(min, max) {
	return Math.floor(Math.random() * (max-min+1) + min);
}	

function Word() {
	this.x = 0;
	this.y = 0;
	this.dx = 0;
	this.dy = 0;
	this.element;
	this.span;
	this.spanArray = [];

	this.init = function() {
		this.element = document.createElement("div");
		this.element.setAttribute("class", "word");

		document.getElementById("container").appendChild(this.element);	
		this.draw();
	}

	this.draw = function() {
		this.element.style.top = this.y + "px";
		this.element.style.left = this.x + "px";
	}

	this.removeElement = function() {
		this.element.remove();
	}

	this.setWord = function() {
		var tempword = GenerateWords().split('');
		for (var i=0; i<tempword.length; i++) {
			this.span = document.createElement("span");
			this.span.setAttribute("class", "wordspan");
			this.span.innerHTML = tempword[i];
			this.element.appendChild(this.span);
			this.spanArray.push(this.span);
		}
	}
}

function GenerateWords() {
	var index = getRandom(0, wordArray.length);
	
	var tempWord = wordArray[index];
	
	return tempWord;
}


function Game() {
	var words = [];
	var intervalId;
	var counter = 0;
	var word = new Word();
	var element = document.getElementById("container");
	var speed = 0;
	

	this.init = function() {
		document.addEventListener("keydown", compare);
		intervalId = setInterval(run,35);
	}	
		
	var run = function() {
		counter++;
		if ((counter%100) == 0) {
			create();
		}
		move();
		check();
	}

	var create = function() {
	 
		var word = new Word();
		word.x = getRandom(0, 400);
		word.y = -50;
		word.init();
		word.setWord();
		word.draw();
		words.push(word);
		
	}

	var move = function() {
		for (var i=0; i<words.length; i++) {
			var word = words[i];
			word.y += 1 + speed;
			word.draw();
		}
	}


	var check = function() {
		for (var i=0; i<words.length; i++) {
			if (words[i].y > 500) {
				words[i].removeElement();
				words.shift();
				score -= 1;
			}
		}
	}

	function compare(event) {
		var wordFirst;
		var flag = false;

		for (var i=0; i<words.length; i++) {
			wordFirst = words[i];
			// console.log(String.fromCharCode(event.keyCode).toLowerCase());
			if ((wordFirst.spanArray[0].innerHTML == String.fromCharCode(event.keyCode).toLowerCase()) ||
				(wordFirst.spanArray[0].innerHTML == String.fromCharCode(event.keyCode))) {
				wordFirst.spanArray[0].style.color = "green";
				document.removeEventListener("keydown", compare);
				document.addEventListener("keydown", tempFunc);
				break;
			}
		}

		function tempFunc(e) {
			console.log("calling tempFunc");
			var temp = e.which;
			countKey += 1;
			flag = check(wordFirst, temp, countKey);
			console.log("called check");

			if (flag) {
				positive = 1;
				document.removeEventListener("keydown", tempFunc);
				document.addEventListener("keydown", compare);
			}
		}
	
		function check(wordFirst, e, k) {
			console.log("checking further",e);
			for (var i=positive; i<wordFirst.spanArray.length; i++) {
				console.log(positive);
				if (wordFirst.spanArray[i].innerHTML == String.fromCharCode(e).toLowerCase()) {
					wordFirst.spanArray[i].style.color = "green";
					positive += 1;
					break;
				} else {
					score -= 1;
					document.getElementById("score").innerHTML = "Score is : " + score;
					// console.log(score);
					positive = 1;
					var position = words.indexOf(wordFirst);
					console.log(position);
					words[position].removeElement();
					words.splice(position, 1);
					speed += 0.25;
					return true;
				}
			}
			if (positive == wordFirst.spanArray.length) {
				score += 1;
				document.getElementById("score").innerHTML = "Score is : " + score;
				console.log(score);
				positive = 1;
				var position = words.indexOf(wordFirst);
				words[position].removeElement();
				words.splice(position, 1);
				return true;
			}
		} 
	}
	var positive = 1;
	var countKey = 0;
	var score = 0;
}

var sentence = "bemeaning publicness commentatorial roque rampike predeath raveningly sericterium meristic overserenity underlaundress chopsticks pentadactyl mythologic utahan northman japan antipsalmist heterocycle sone redeliberation superinnocence uncoifed excommunicative curragh overlive manley milady Rutherford dilapidate kleve benefaction prome metaleptic siderophilin columban fleyedly misappraised kirman unfended dulness numerator Simulacrum applicable catchpollery flavory isodynamic vinificator cradling hydrophobic dissoluble reformability swop aroid giftwrapping hyperemesis Grizzle wallpaper polygonum etcher duckling nonaccenting forenoon overclogged acculturationist easy poising chucklehead redissolved kitchenless";
var wordArray = sentence.split(' ');

var game = new Game();
game.init();


})();