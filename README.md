# README

## Setup

- run the database: `docker-compose up -d`
- Download all the dependencies by running `npm install`.
- If you don't need auto reload, use `npm start`.
- If you want to quickly reset the DB to pick up the changes to the tables: `curl "localhost:3134/db/reset"`

> make sure you have docker compose installed. [How to install docker-compose](https://docs.docker.com/compose/install/)

## Database Diagram

![High level Database Diagram](./diagram/MRM%20Database.png "High level Database Diagram")

### Updating the diagram

To update the diagram you would go to [online diagram maker tool](https://app.diagrams.net/) and import the file `./diagram/MRM Database.png` in this repo. There you can modify the diagram at will.

Once you are done modifying the diagram:

- Export it as png with borders set to `100`
- Replace the file `./diagram/MRM Database.png` with the png you just exported (make sure to use the same name, that way this README file will be updated automatically).
- Use the save function for the new diagram choosing the .xml format in the online diagram maker tool
- Replace the file `./diagram/MRM Database.xml` with the .xml you just saved.
- Stage, commit and push your changes to our GitHub repo

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
  "period": 30,
  "durationMode": "30DAYS",
  "paymentType": "Boleto",
  "paymentComment": "Payment comment for Contract 4",
  "workingHours": "24H",
  "deliveryMode": "PICKUP",
  "installments": "1",
  "additivesEndDate": "2021-05-10",
  "deliveryCost": 50,
  "invoiceStatus": "pending",
  "invoiceUrl": "invoiceurl.com",
  "value": 1300,
  "status": "APPROVED",
  "customerId": 1,
  "comment": "Contract 1",
  "itemRentals": [
    {
      "leftAt": null,
      "ReturnedAt": null,
      "value": 100,
      "stockItemId": 1,
      "comment": "itemRental 1"
    },
    {
      "leftAt": null,
      "ReturnedAt": null,
      "value": 200,
      "stockItemId": 2,
      "comment": "itemRental 2"
    }
  ]
}
```

### Additive

This will also update the endDate of the rentContract associated with this additive

```json
{
  "startDate": "2021-05-10",
  "endDate": "2021-06-10",
  "approvalDate": "2021-05-05",
  "paymentDueDate": "2021-06-20",
  "paidAt": null,
  "receiptUrl": "urlforthereceit.com",
  "contractUrl": "urlforthecontract.com",
  "value": 1200.20,
  "status": "APPROVED",
  "comment": "Additive 1",
  "invoiceStatus": "pendente",
  "invoiceUrl": "invoiceurl.com",
  "period": 31,
  "paymentType": "CREDIT",
  "paymentComment": "Payment comment",
  "installments": 1,
  "rentContractId": 2
}
```

### ItemRental

```json
{
  "leftAt": null,
  "ReturnedAt": null,
  "value": 900,
  "stockItemId": 9,
  "rentContractId": 3,
  "comment": "itemRental 9 - Contract 3"
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
  "rentValue": 500.50,
  "replacementCost": 10000.50,
  "pressure": "2000",
  "throughput": "450",
  "voltage": "110",
  "serialNumber": "3215462",
  "code": "334134254",
  "active": true,
  "comment": "Comment about Stock Item 1",
  "statusComment": "Just purchased. Sending straight to inventory",
  "supplierId": 2
}
```
