//Basic Particle Simulation
//Author: Brandon John-Freso

$(function() {
	var W, H,
	canvas, ctx,
	particleCount = 100,
		speedBaseline = 10, sizeBaseline = 1,
		sizeVariance = 0.5, speedVariance = 0,
		particles = [],
		particleX,
		colorArray = ["#1abc9c", "#f39c12", "#27ae60", "#d35400", "#2980b9", "#c0392b", "#8e44ad", "#bdc3c7"];

	canvas = $("#canvas").get(0);

	ctx = canvas.getContext("2d");
	window.addEventListener('resize', windowResizeHandler, false);
	windowResizeHandler();

	function windowResizeHandler() {
		W = window.innerWidth;
		H = window.innerHeight;
		canvas.width = W;
		canvas.height = H;
	}

	//Setup particle class

	function Particle() {
		this.id = null;
		this.x = Math.random() * W;
		this.y = Math.random() * H;
		this.direction = {
			"x": -1 + Math.random() * 2,
			"y": -1 + Math.random() * 2
		};
		this.vx = speedVariance * Math.random() + speedBaseline;
		this.vy = speedVariance * Math.random() + speedBaseline;
		this.radius = sizeVariance * Math.random() + sizeBaseline;
		//this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
		this.color = "black";
		this.move = function() {
			this.x += this.vx * this.direction.x;
			this.y += this.vy * this.direction.y;
		};
		this.changeDirection = function(axis) {
			this.direction[axis] *= -1;
		};
		this.draw = function() {
			ctx.beginPath();
			ctx.fillStyle = this.color;
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			ctx.fill();
		};
		this.boundaryCheck = function() {
			if (this.x + this.radius >= W) {
				this.x = W - this.radius;
				this.changeDirection("x");
			} else if (this.x - this.radius <= 0) {
				this.x = 0 + this.radius;
				this.changeDirection("x");
			}
			if (this.y + this.radius >= H) {
				this.y = H - this.radius;
				this.changeDirection("y");
			} else if (this.y - this.radius <= 0) {
				this.y = 0 + this.radius;
				this.changeDirection("y");
			}

		};
	} //end particle class

	function clearCanvas() {
		ctx.clearRect(0, 0, W, H);
	} //end clear canvas

	function createParticles() {
		for (var i = particleCount - 1; i >= 0; i--) {
			p = new Particle();
			p.id = i;
			particles.push(p);
		}
		particleX = particles[0];
		particleX.color = "red";
	} // end createParticles

	function streamParticles() {
		for (var i = particles.length - 1; i >= 0; i--) {}
	}

	function drawParticles() {
		for (var i = particleCount - 1; i >= 0; i--) {
			p = particles[i];
			p.draw();
		}
	} //end drawParticles


	function getDistance(p1, p2) {
		var dx = p1.x - p2.x;
		var dy = p1.y - p2.y;
		var dist = Math.sqrt((Math.pow(dx, 2)) + (Math.pow(dy, 2)));
		return dist;
	}


	function updateParticles() {
		for (var i = particles.length - 1; i >= 0; i--) {
			p = particles[i];
			p.move();
			p.boundaryCheck();
		}
	} //end updateParticles

	function initParticleSystem() {
		createParticles();
		drawParticles();
	}

	function animateParticles() {
		clearCanvas();
		drawParticles();
		updateParticles();
	}

	initParticleSystem();
	setInterval(animateParticles, 1000 / 25);
	// setInterval(animateParticles,1000/25);

});