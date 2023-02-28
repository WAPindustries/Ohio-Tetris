// moving piece down
function drop_pieces(){

	if (get_lowest_piece()+game.current_piece.position.y>=game.tiles_height-1) return
	if (check_collision()) return
	drop(game.current_piece)
}

function drop(piece){
	piece.position.y+=1
}


// get boundary pieces

function get_highest_piece(piece=game.current_piece){
	var lowest_y = null

	for (var i=0;i<piece.blocks.length;i++){
		if (lowest_y==null || piece.blocks[i].y<lowest_y) lowest_y = piece.blocks[i].y
	}
	return lowest_y
}


function get_lowest_piece(piece=game.current_piece){

	var lowest_y = null

	for (var i=0;i<piece.blocks.length;i++){
		if (lowest_y==null || piece.blocks[i].y>lowest_y) lowest_y = piece.blocks[i].y
	}
	return lowest_y
}

function get_nearest_piece(piece=game.current_piece){
	var lowest_x = null

	for (var i=0;i<piece.blocks.length;i++){
		if (lowest_x==null || piece.blocks[i].x<lowest_x)lowest_x = piece.blocks[i].x
	}
	return lowest_x
}

function get_furthest_piece(piece=game.current_piece){
	var lowest_x = null

	for (var i=0;i<piece.blocks.length;i++){
		if (lowest_x==null || piece.blocks[i].x>lowest_x) lowest_x = piece.blocks[i].x
	}
	return lowest_x
}


//draw pieces on board
function render_piece(piece){
	piece.blocks.forEach((block)=>{

		context.fillStyle = piece.color

		context.fillRect(
			(block.x+piece.position.x)*game.scale,
			(block.y+piece.position.y)*game.scale,
			game.scale,
			game.scale
		)
	})
}


//rotate piece
function rotate(piece){
	piece.rotation = (piece.rotation<piece.rot_pos.length-1 ? piece.rotation+1:0)
	piece.blocks = piece.rot_pos[piece.rotation]
}

function move(pos, val){

	switch (pos){
		case "x":
			if (
				(get_nearest_piece()+game.current_piece.position.x<=0 && val<0) 
				|| (get_furthest_piece()+game.current_piece.position.x>=game.tiles_width-1 && val>0)
				|| (search_left(game.current_piece) && val<0)
				|| (search_right(game.current_piece) && val>0)
			) return
		break;
		case "y":
				drop(game.current_piece)
			return
		break;
	}

	game.current_piece.position[pos]+=val
}

function search_left(piece){

	var block_x = get_nearest_piece()+game.current_piece.position.x-1
	var block_y = get_lowest_piece()+game.current_piece.position.y

	for (var curr_piece in game.pieces){

		for (var block in game.pieces[curr_piece].blocks){

			if (
				game.pieces[curr_piece].blocks[block].x+game.pieces[curr_piece].position.x==block_x
				&& game.pieces[curr_piece].blocks[block].y+game.pieces[curr_piece].position.y==block_y
				&& game.pieces[curr_piece]!=game.current_piece
			) return true
		}
	}
	return false
}

function search_right(piece){

	var block_x = get_furthest_piece()+game.current_piece.position.x+1
	var block_y = get_lowest_piece()+game.current_piece.position.y

	for (var curr_piece in game.pieces){

		for (var block in game.pieces[curr_piece].blocks){

			if (
				game.pieces[curr_piece].blocks[block].x+game.pieces[curr_piece].position.x==block_x
				&& game.pieces[curr_piece].blocks[block].y+game.pieces[curr_piece].position.y==block_y
				&& game.pieces[curr_piece]!=game.current_piece
			) return true
		}
	}
	return false
}


//check collision between pieces
function check_collision(){

	for (var block in game.current_piece.blocks){
		var ref_block = game.current_piece.blocks[block]

		for (var piece in game.pieces){
			var curr_piece = game.pieces[piece]

			if (curr_piece==game.current_piece) continue

			for (var collide_block in curr_piece.blocks){

				var curr_block = curr_piece.blocks[collide_block]

				if (
					ref_block.y+game.current_piece.position.y==curr_block.y+curr_piece.position.y-1
					&& ref_block.x+game.current_piece.position.x==curr_block.x+curr_piece.position.x
				) return true
			}
		}
	}
	return false
}



//generate next piece
function gen_piece(){

	var rand_piece = pieces[Math.floor(Math.random()*pieces.length)]
	// rand_piece = dick_piece
	
	var new_piece = JSON.parse(JSON.stringify(rand_piece))
	new_piece.position.x = game.tiles_width/2
	new_piece.position.y = -5

	new_piece.rot_pos.forEach((array)=>{
		array.forEach((block)=>{
			block.ref_block = new_piece
		})
	})
	new_piece.blocks.forEach((block)=>{
		block.ref_block = new_piece
	})

	game.current_piece = new_piece

	game.pieces.push(new_piece)
	game.blocks.push(...new_piece.blocks)
}



// clear filled lines

function sortByKey(array, key) {

	var clone_array = [...array]

    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function clear_lines(){

	var lines = search_lines()

	lines.forEach((line)=>{
		for (var i=0;i<game.tiles_width;i++){
				
			var block_x = i
			var block_y = line	

			for (var piece in game.pieces){
				for (var block in game.pieces[piece].blocks){
					var curr_block = game.pieces[piece].blocks[block]
					if (curr_block.x+game.pieces[piece].position.x==block_x 
						&& curr_block.y+game.pieces[piece].position.y==block_y){
						game.pieces[piece].blocks.splice(
							game.pieces[piece].blocks.indexOf(curr_block), 1
						)
					}
				}
			}
		}
		fall_piece(block_y)
	})
}


// shift piece down when line is cleared
function fall_piece(height){
	game.pieces.forEach((piece)=>{
		piece.blocks.forEach((block)=>{
			if (block.y+piece.position.y<height && block.ref_block!=game.current_piece)block.y++
		})
	})
}

function get_lowest_block(piece, illegal){
	var lowest_y = null
	var lowest_block = null

	for (var i=0;i<piece.blocks.length;i++){
		if ((lowest_y==null || piece.blocks[i].y>lowest_y) && (lowest_block==null && !illegal.includes(lowest_block))) {
			lowest_y = piece.blocks[i].y
			lowest_block = piece.blocks[i]
		}
	}
	return lowest_block
}


function search_lines(){
	
	var blocks = []
	for (var piece in game.pieces){
		game.pieces[piece].blocks.forEach((block)=>{
			blocks.push(block)
		})
	}

	var clone_array = sortByKey(blocks, "y")

	var match_count = 0
	var lines_cleared = []
	for (var i=0;i<game.tiles_height;i++){
		for (var j=0;j<game.tiles_width;j++){
			for (var k=0;k<clone_array.length;k++){
				if (clone_array[k].x+clone_array[k].ref_block.position.x==j 
					&& clone_array[k].y+clone_array[k].ref_block.position.y==i) match_count++
				
				if (match_count>=game.tiles_width) break
			}
		}

		if (match_count>=game.tiles_width) lines_cleared.push(i)
		match_count = 0
	}

	return lines_cleared
}



function search_loss(piece){
	if (piece.position.y<=0){
		alert("L skill issue")
		game.end = true
	}
}