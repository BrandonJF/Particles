//Basic Particle Simulation
//Author: Brandon John-Freso
$(function() {
	var W, H,
	canvas, ctx,
	particleCount = 100,
		speedBaseline = 20, sizeBaseline = 2,
		sizeVariance = 0, speedVariance = 1,
		particles = [],
		particleX, minDist = 2,
		colorArray = ["#1abc9c", "#f39c12", "#27ae60", "#d35400", "#2980b9", "#c0392b", "#8e44ad", "#bdc3c7"];

	//W = window.innerWidth * 0.98;
	//H = window.innerHeight * 0.98;
	canvas = $("#canvas").get(0);
	canvas.width = W;
	canvas.height = H;
	ctx = canvas.getContext("2d");
	console.log(ctx);

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
		this.v = Math.round( Math.sqrt(Math.pow(this.vx,2) + Math.pow(this.vy,2)) );
		this.radius = sizeVariance * Math.random() + sizeBaseline;
		//this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
		this.color = "grey";
		this.move = function() {
			this.x += this.vx * this.direction.x;
			this.y += this.vy * this.direction.y;
		};
		this.calculateVelocity = function(){ this.v = Math.round( Math.sqrt(Math.pow(this.vx,2) + Math.pow(this.vy,2)) );};
		this.changeDirection = function(axis) {
			this.direction[axis] *= -1;
		};
		this.draw = function() {
			ctx.beginPath();
			ctx.fillStyle = this.color;
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			ctx.fill();
			ctx.beginPath();
			ctx.font = "6 px sans-serif";
			//ctx.fillText(this.v, this.x + 2, this.y);

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
		//particleX.color = "red";
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

	function attractionCheck() {
		for (var i = 0; i < particleCount - 1; i++) {
			var p = particles[i];
			for (var j = i + 1; j < particleCount; j++) {
				var p2 = particles[j];
				dist = getDistance(p, p2) ;
				if (dist< minDist) {
					attractParticles(p, p2, dist);
				}
			}
		}
	}

	function attractParticles(p, p2, dist) {
		p.vx -= p.vx * 0.00008 * dist;
		p.vy -= p.vy * 0.00008 * dist;
		p2.vx -= p2.vx * 0.00008 * dist;
		p2.vy -= p2.vy * 0.00008 * dist;
		//ctx.beginPath();
		//ctx.moveTo(p.x, p.y);
		//ctx.lineTo(p2.x, p2.y);
		//ctx.stroke();
	}


	function updateParticles() {
		for (var i = particles.length - 1; i >= 0; i--) {
			p = particles[i];
			p.calculateVelocity();
			p.move();
			//distanceCheck(p);
			p.boundaryCheck();
			attractionCheck();
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