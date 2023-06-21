import http from "http"
import { z } from 'zod';


import  { getDataWithCustomisedCurrency } from './dataArrange.js'




const productSchema = z.object({
	title: z.string().min(2),
	price: z.number().int().min(0),
	description: z.string().min(2),
	categoryId: z.number().int().min(1),
	images: z.array(z.string()),
	
  });	

//   "title": "New Product",
//   "price": 10,
//   "description": "A description",
//   "categoryId": 1,
//   "images": ["https://placeimg.com/640/480/any"]

const server = http.createServer((req, res)=>{

	const responseToBe = {
		"title": "New Product",
		"price": 10,
		"description": "A description",
		"images": ["https://placeimg.com/640/480/any"],
		"category": {
		  "id": 1,
		  "name": "Clothes",
		  "image": "https://api.lorem.space/image/fashion?w=640&h=480&r=4278",
		  "creationAt": "2023-01-03T15:58:58.000Z",
		  "updatedAt": "2023-01-03T15:58:58.000Z"
		},
		"id": 210,
		"creationAt": "2023-01-03T16:51:33.000Z",
		"updatedAt": "2023-01-03T16:51:33.000Z"
	  };
	if(req.method === "GET"){


		async function sendResponseWithTheRequestedCurrency() {
			try {
			 	
				const requestedURL = new URL(`https://localhost/8080${req.url}`)
				const currencyRequested = requestedURL.searchParams.get("cur").toUpperCase();
				
				const responseReady = JSON.stringify(await getDataWithCustomisedCurrency(currencyRequested))
				//console.log(currencyRequested)

				res.setHeader('Content-type', 'application/json')		
				res.write(responseReady)
				res.end()
			} catch (error) {
			  console.error(error);
			}
		  }

		  sendResponseWithTheRequestedCurrency()
	}


	if(req.method === "POST"){

		const chuncks = []
		req.on('data', (chunck)=>{
			chuncks.push(chunck)
		})
	
		req.on('end', ()=>{
			const responseBody = JSON.parse(chuncks.toString());
			try {
				const product = productSchema.parse(responseBody);
				//console.log(product);

				res.setHeader('Content-type', 'application/json')		
				res.write(JSON.stringify(responseToBe))
				res.end()
			  } catch (error) {
				console.error(error);
				//console.error(`here : ${error["errors"][0].message}`);
				const arrayOfIssues = []

				
				res.setHeader('Content-type', 'application/json')	
				res.writeHead(400, "Please adhear to the instructions sent")
				for(let i =0; i < error["issues"].length ; i++){
					const errorObj = {
						issueKey : error["issues"][i].path[0],
						issueDetails : error["errors"][i].message
					}
					arrayOfIssues.push(errorObj)
				}
				res.write(JSON.stringify(arrayOfIssues))

				//res.write()

				
				res.end()
			  }
			
			//console.log(JSON.parse(chuncks))
		})

		
	}
})


server.listen(8080, ()=>{
	console.log("Server listening on http://localhost:8080/")
})