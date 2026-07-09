\# REST Get Country by Code



This project is a Spring Boot REST API that returns country details based on the country code.



It reads the country information from an XML configuration file and returns the matching country as a JSON response.



Endpoint:

GET /countries/{code}



Example:

GET /countries/in



Response:

{

&#x20; "code": "IN",

&#x20; "name": "India"

}

