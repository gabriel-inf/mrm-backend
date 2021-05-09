

## Setup

- run the database: `docker-compose up -d`
- Download all the dependencies by running `npm install`.
- If you don't need auto reload, use `npm start`.

> make sure you have docker compose installed (https://docs.docker.com/compose/install/)

## Todo

- [] Integrate with a real database.
- [] Create services that will have DAO layers associated that will make room for complex queries.
- [] Integrate with a real database.
- [] Integrate with a real database.

## Models

### Customer

```json
{
  "name": "Customer 1 Name",
  "commercialName": "Customer 1 Commercial Name",
  "cnpj": "XX.XXX.XXX/YYYY-ZZ",
  "mobilePhone": "(XX) XXX-XXX-XXX",
  "email": "supplier1@email.com",
  "active": true,
  "street": "Customer 1 Street Name",
  "cep": "XXXXX-XXX",
  "city": "Customer 1 City",
  "number": "Customer 1 building number",
  "comment": "Comments related to Customer 1"
}
```
