

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

### Supplier

When creating a supplier instance, you can pass the address with it, but it is not part of the same table. They are related by a supplierId field in the address table

```json
{
  "name": "Supplier 1 Name",
  "commercialName": "Supplier 1 Commercial Name",
  "cnpj": "XX.XXX.XXX/YYYY-ZZ",
  "mobilePhone": "(XX) XXX-XXX-XXX",
  "email": "supplier1@email.com",
  "active": true,
  "street": "Supplier 1 Street Name",
  "cep": "XXXXX-XXX",
  "city": "Supplier 1 City",
  "number": "Supplier 1 building number",
  "comment": "Comments related to Supplier 1"
}
```
