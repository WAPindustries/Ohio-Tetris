//game class
class Game{

	constructor({

		width, height,
		tiles_width, tiles_height,
		speed,
		scale,
		offset,
		current_piece=null,
		pieces = [],
		blocks = [],
		end=false
	}){
		this.end = end
		this.blocks = blocks
		this.pieces = pieces
		this.width = width, this.height = height
		this.tiles_width = tiles_width, this.tiles_height = tiles_height
		this.speed = speed
		this.scale = scale
		this.offset = offset
		this.current_piece = current_piece
	}

	init(){			

		canvas.width = this.width
		canvas.height = this.height
		canvas.style.width = this.width
		canvas.style.height = this.height

		canvas.style.left = innerWidth/2-canvas.width/2
		canvas.style.top = innerHeight/2-canvas.height/2

		pieces.forEach((piece)=>{
			piece.blocks = piece.rot_pos[0]
		})

	}

	render_grid(){
		for (var i=0;i<this.width;i++){
			context.strokeStyle = "grey"
			context.beginPath()
			context.moveTo(i*this.scale, 0)
			context.lineTo(i*this.scale, this.height)
			context.stroke()
		}
		for (var j=0;j<this.tiles_height;j++){
			context.strokeStyle = "grey"
			context.beginPath()
			context.moveTo(0, j*this.scale)
			context.lineTo(canvas.width, j*this.scale)
			context.stroke()
		}
	}


}