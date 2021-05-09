

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

When creating a customer instance, you can pass the address with it, but it is not part of the same table. They are related by a customerId field in the address table

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

### Supplier

When creating a supplier instance, you can pass the address with it, but it is not part of the same table. They are related by a supplierId field in the address table

```json
{
  "name": "Supplier 1 Name",
  "commercialName": "Supplier 1 Commercial Name",
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

### RentContract

```json
{
  "startDate": "2021-04-10",
  "endDate": "2021-05-10",
  "approvalDate": "2021-04-05",
  "paymentDueDate": "2021-05-20",
  "paidAt": null,
  "receiptUrl": "urlforthereceit.com",
  "contractUrl": "urlforthecontract.com",
  "durationMode": "30DAYS",
  "value": 800,
  "status": "APPROVED",
  "customerId": 1,
  "comment": "Contract with customer 1 has discount for loyalty"
}
```

### StockItem

Anytime the 'status' field is changed, a stockItemEvent is created to record it. You can see the stockItemEvents of a stockItem by using the `get /api/stockitems/:id` endpoint

```json
{
  "name": "Stock Item 1 Name",
  "type": "Stock Item 1 Type",
  "power": "Stock Item 1 Power",
  "brand": "Stock Item 1 Brand",
  "model": "Stock Item 1 Model",
  "status": "INVENTORY",
  "numberOfUses": 15,
  "lastMaintenance": "2021-04-01",
  "acquisitionDate": "2020-07-01",
  "needsMaintenance": false,
  "imageURL": "imageURL",
  "rentValue": 500,
  "replacementCost": 10000,
  "code": "334134254",
  "comment": "Comment about Stock Item 1",
  "statusComment": "Just purchased. Sending straight to inventory",
  "supplierId": 2
}
```
