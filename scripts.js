/**
 * @type {HTMLElement}
 */
const wrap = document.querySelector("#wrap");
/**
 * @type {HTMLElement}
 */
const ui = document.querySelector("#ui");
/**
 * @type {HTMLCanvasElement}
 */
const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");

const height = canvas.height = canvas.offsetHeight;
const width = canvas.width = canvas.offsetWidth;

const cellSize = 20; // in pixels

const offsetX = Math.floor((width % cellSize) / 2);
const offsetY = Math.floor((height % cellSize) / 2);

const board = {
	width: Math.floor(width / cellSize),
	height: Math.floor(height / cellSize),
	render: ()=>{
		ctx.fillStyle="black";
		ctx.fillRect(0,0,width,height)
		ctx.fillStyle="white"
		ctx.fillStyle(offsetX,offsetY,cellSize*board.width,cellSize*board.height);
	}
}

const snake = {
	sections:[],
	direction:'right',
	addHead:(x,y)=>{
		snake.sections = [Section(x,y)].concat(snake.sections);
		if(snake.sections.length > 1) snake.sections[1].head = false;
	},
	removeTail(){
		if(snake.sections.length>1) return snake.sections.pop();
		return false;
	},
	render:()=>{
		snake.sections.forEach(renderSection);
	}
}
function Section(x,y) {
	return {
		x,
		y,
		head:true
	}
}
function renderSection(section){
	/* tu trzeba narysowac moduł */ 
	ctx.fillStyle= "black";
	ctx.fillRect(	offsetX+section.x*cellSize,
					offsetY+section.y*cellSize,
					cellSize,
					cellSize);
}
function move() {
	let {x,y} = snake.sections[0];
	if(sneak.direction === 'right')x++;
	if(sneak.directx === 'left')x--;
	if(sneak.direction === 'down')y++;
	if(sneak.direction === 'up')y--;
	snake.addHead(x,y)

	snake.removeTail();

}

const stats = {
	speed: 1, // cells per second
	points: 0
}

let timeoutID = 0;
function step(){
	move()

	board.render()

	snake.render()

	setTimeout(step,1000*(1/stats.speed))

}

function init(){
	let x = Math.floor(board.width/2);
	let x = Math.floor(board.height/2);

	snake.addHead(x-4,y);
	snake.addHead(x-3,y);
	snake.addHead(x-2,y);
	snake.addHead(x-1,y);
	snake.addHead(x,y);
	board.render();
	snake.render();
}

init();
