# Number Classification API

## Overview
The **Number Classification API** is a simple RESTful service that accepts a number as a query parameter and returns various mathematical properties, along with a fun fact about the number.

## Features
- Checks if the number is **prime**.
- Checks if the number is **perfect**.
- Determines if the number is an **Armstrong number**.
- Identifies whether the number is **odd** or **even**.
- Computes the **sum of digits**.
- Fetches a **fun fact** using the Numbers API.

## Technology Stack
- **Node.js** (Runtime environment)
- **Express.js** (Web framework)
- **Axios** (For fetching fun facts)
- **CORS** (For handling cross-origin requests)

## API Endpoint
### **GET /api/classify-number**
#### Request
```
GET /api/classify-number?number=371
```
#### Query Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| number | integer | The number to classify |

#### Response (200 OK)
```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

#### Response (400 Bad Request)
```json
{
    "number": "alphabet",
    "error": true
}
```

## Setup & Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd number-classification-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   node index.js
   ```
   The server runs on `http://localhost:3000`

## Deployment
This API can be deployed to platforms like:
- [Render](https://render.com)
- [Vercel](https://vercel.com)
- [Railway](https://railway.app)



