//block class
class Block{
	constructor(x, y, ref_block=null){
		this.x = x, this.y = y
		this.ref_block = ref_block
	}
}


// tetromino class
class Tetromino{

	constructor({

		position={x: 0, y: 0},
		blocks=[],
		rotation=0,
		rot_pos,
		color,
	}){
		this.rot_pos = rot_pos
		this.rotation = rotation
		this.position = position
		this.blocks = blocks
		this.color = color
	}
}



//tetrominos

const left_l_piece = new Tetromino({
	color: "blue",
	rot_pos: [
		[new Block(0,0), new Block(0,1), new Block(1,1), new Block(2,1)],
		[new Block(2,0), new Block(1,0), new Block(1,1), new Block(1,2)],
		[new Block(0,1), new Block(2,1), new Block(1,1), new Block(2,2)],
		[new Block(1,0), new Block(1,1), new Block(1,2), new Block(0,2)],
	]
})

const right_l_piece = new Tetromino({
	color: "orange",
	rot_pos: [
		[new Block(2,0), new Block(0,1), new Block(1,1), new Block(2,1)],
		[new Block(2,2), new Block(1,0), new Block(1,1), new Block(1,2)],
		[new Block(0,1), new Block(2,1), new Block(1,1), new Block(0,2)],
		[new Block(0,0), new Block(1,0), new Block(1,1), new Block(1,2)],
	]
})

const square_piece = new Tetromino({
	color: "yellow",
	rot_pos:[
		[new Block(0,0), new Block(1,0), new Block(0,1), new Block(1,1)]
	]
})

const t_piece = new Tetromino({
	color: "purple",
	rot_pos: [
		[new Block(1,0), new Block(0,1), new Block(1,1), new Block(2,1)],
		[new Block(1,0), new Block(1,1), new Block(2,1), new Block(1,2)],
		[new Block(0,1), new Block(1,1), new Block(2,1), new Block(1,2)],
		[new Block(0,1), new Block(1,0), new Block(1,1), new Block(1,2)],
	]
})

const line_piece = new Tetromino({
	color: "lightblue",
	rot_pos:[
		[new Block(0,1), new Block(1,1), new Block(2,1), new Block(3,1)],
		[new Block(2,0), new Block(2,1), new Block(2,2), new Block(2,3)],
		[new Block(0,2), new Block(1,2), new Block(2,2), new Block(3,2)],
		[new Block(1,0), new Block(1,1), new Block(1,2), new Block(1,3)],
	]
})

const z_piece = new Tetromino({
	color: "lightgreen",
	rot_pos: [
		[new Block(0,1), new Block(1,1), new Block(1,0), new Block(2,0)],
		[new Block(1,0), new Block(1,1), new Block(2,1), new Block(2,2)],
		[new Block(1,1), new Block(2,1), new Block(0,2), new Block(1,2)],
		[new Block(0,0), new Block(0,1), new Block(1,1), new Block(1,2)],
	]
})

const reverse_z_piece = new Tetromino({
	color: "red",
	rot_pos:[
		[new Block(0,0), new Block(1,0), new Block(1,1), new Block(2,1)],
		[new Block(2,0), new Block(2,1), new Block(1,1), new Block(1,2)],
		[new Block(0,1), new Block(1,1), new Block(1,2), new Block(2,2)],
		[new Block(1,0), new Block(1,1), new Block(0,1), new Block(0,2)],	
	],
})


const dick_piece = new Tetromino({
	color: "#E1C5C0",
	rot_pos:[
		[new Block(1,0), new Block(1,1), new Block(0,2), new Block(1,2), new Block(2,2)],
		[new Block(1,0), new Block(1,1), new Block(2,1), new Block(1,2), new Block(3,1)],
		[new Block(0,1), new Block(1,1), new Block(2,1), new Block(1,2), new Block(1,3)],
		[new Block(0,1), new Block(1,1), new Block(2,1), new Block(2,0), new Block(2,2)]	
	]
})

const condom_piece = new Tetromino({
	color: "#ADD8E6",
	rot_pos:[
		[new Block(1,0), new Block(0,1), new Block(1,1), new Block(2,1), new Block(0,2), new Block(2,2), new Block(0,3), new Block(2,3)]
	]
})


var pieces = [
	left_l_piece, right_l_piece, square_piece, t_piece, line_piece, z_piece, reverse_z_piece, 
	dick_piece, condom_piece
]