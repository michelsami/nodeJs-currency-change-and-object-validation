# nodeJs-currency-change-and-object-validation
Currency change application from USD to all other currencies - pure NodeJs - no Express - also object validation using ZOD

In order to test : please use cur as parameter in the URL and choose the currency you want 
example 1 in get request : localhost:8080/?cur=eur

example 2 in post request :
{
  "title": "New Product",
  "price": 10,
  "description": "A description",
  "categoryId": 1,
  "images": ["https://placeimg.com/640/480/any"]
}
