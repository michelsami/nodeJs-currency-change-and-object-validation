// import { write } from 'fs';
// import http, { request } from 'http'

// import { uid } from 'uid';

// const toDoList = [
	
// ]

// const server = http.createServer((request, response)=>{

// 	if(request.method === "GET"){
// 		response.setHeader('Content-Type', 'application/json')
// 		response.writeHead(200)
// 		response.write(JSON.stringify(toDoList))
// 		response.end()
// 	}

// 	if(request.method === "POST"){
// 		const chuncks = []
// 		request.on('data', (chunck)=>{
// 			chuncks.push(chunck)
// 		})

// 		request.on('end', ()=>{
// 			//console.log(JSON.parse(chuncks))
			
// 			const toDo = JSON.parse(chuncks.toString());

		
// 			toDoList.push({finished: false, ...toDo, id: uid()})	

			
// 			response.setHeader('Content-Type', 'application/json')
// 			response.writeHead(201)
// 			response.write(JSON.stringify(toDoList))
// 			response.end()
// 		})
		
// 		request.on('error', (error)=>{
// 			response.setHeader('Content-Type', 'text')
// 			response.writeHead(400)
// 			response.write(error.message)
// 			response.end()
// 		})
// 	}

// 	if (request.method === "PATCH"){
// 		const toDoId = request.url.split('/').at(-1);
// 		const matchedToDo = toDoList.findIndex((toDoObject)=> toDoObject.id === toDoId)

// 		if (matchedToDo !== -1){
// 			toDoList[matchedToDo].finished = true
// 		}
					
// 		response.setHeader('Content-Type', 'application/json')
// 		response.writeHead(204)
// 		//response.write(JSON.stringify(toDoList))

// 		response.end()
// 	}


// })


// server.listen(8080, ()=>{
// 	console.log("Server listening on http://localhost:8080/")
// })