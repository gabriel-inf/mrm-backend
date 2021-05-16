# README

## Setup

- run the database: `docker-compose up -d`
- Download all the dependencies by running `npm install`.
- If you don't need auto reload, use `npm start`.
- If you want to quickly reset the DB to pick up the changes to the tables: `curl "localhost:3134/db/reset"`

> make sure you have docker compose installed. [How to install docker-compose](https://docs.docker.com/compose/install/)

## Endpoints

### Additives

- `GET /api/additives` - Returns a list of all additives in the DB in json format with the information of the associated contract and its customer.
- `GET /api/additives/:id` - Returns the additive with id = `:id`, if one exists, with the information of the associated contract, its customer and all its item rentals.
- `POST /api/additives` - Creates a new additive. Requires a description in json of the additive in the body
- `PUT /api/additives/:id` - Updates the fields of the additive with the id = `:id` in the DB. Requires a description in json of the additive, with the fields updated, in the body.
- `DELETE /api/additives/` - Deletes all the additives from the DB. Returns no response
- `DELETE /api/additives/:id` - Deletes the additive with the id = `:id` from the DB. Returns no response

### Addresses

- `GET /api/addresses` - Returns a list of all addresses in the DB in json format.
- `GET /api/addresses/:id` - Returns the address with id = `:id`, if one exists.
- `POST /api/addresses` - Creates a new address. Requires a description in json of the address in the body
- `PUT /api/addresses/:id` - Updates the fields of the address with the id = `:id` in the DB. Requires a description in json of the address, with the fields updated, in the body.
- `DELETE /api/addresses/` - Deletes all the addresses from the DB. Returns no response
- `DELETE /api/addresses/:id` - Deletes the address with the id = `:id` from the DB. Returns no response

### Customers

- `GET /api/customers` - Returns a list of all customers in the DB in json format with the address information.
- `GET /api/customers/:id` - Returns the customer with id = `:id`, if one exists,  with the information on address, rent contracts, additives, item rentals and stock items.
- `POST /api/customers` - Creates a new customer. Requires a description in json of the customer in the body
- `PUT /api/customers/:id` - Updates the fields of the customer with the id = `:id` in the DB. Requires a description in json of the customer, with the fields updated, in the body.
- `DELETE /api/customers/` - Deletes all the customers from the DB. Returns no response
- `DELETE /api/customers/:id` - Deletes the customer with the id = `:id` from the DB. Returns no response

### Item Rentals

- `GET /api/itemrentals` - Returns a list of all item rentals in the DB in json format with information on their stock item, rent contract and customer.
- `GET /api/itemrentals/:id` - Returns the item rental with id = `:id`, if one exists,  with information on its stock item, rent contract and customer.
- `POST /api/itemrentals` - Creates a new item rental. Requires a description in json of the item rental in the body
- `PUT /api/itemrentals/:id` - Updates the fields of the item rental with the id = `:id` in the DB. Requires a description in json of the item rental, with the fields updated, in the body.
- `DELETE /api/itemrentals/` - Deletes all the item rentals from the DB. Returns no response
- `DELETE /api/itemrentals/:id` - Deletes the item rental with the id = `:id` from the DB. Returns no response

### Rent Contracts

- `GET /api/rentcontracts` - Returns a list of all rent contracts in the DB in json format with information on their customer.
- `GET /api/rentcontracts/:id` - Returns the rent contract with id = `:id`, if one exists,  with information on its item rentals, stock items, additives and customer.
- `POST /api/rentcontracts` - Creates a new rent contract. Requires a description in json of the rent contract in the body
- `PUT /api/rentcontracts/:id` - Updates the fields of the rent contract with the id = `:id` in the DB. Requires a description in json of the rent contract, with the fields updated, in the body.
- `DELETE /api/rentcontracts/` - Deletes all the rent contracts from the DB. Returns no response
- `DELETE /api/rentcontracts/:id` - Deletes the rent contract with the id = `:id` from the DB. Returns no response

### Stock Items

- `GET /api/stockitems` - Returns a list of all stock items in the DB in json format
- `GET /api/stockitems/:id` - Returns the stock item with id = `:id`, if one exists, including all of its stock item events and supplier information.
- `GET /api/stockitems/:id/events` - Returns a list of all stock item events for the stock item with id = `:id` in the DB in json format
- `POST /api/stockitems` - Creates a new stock item. Requires a description in json of the stock item in the body
- `PUT /api/stockitems/:id` - Updates the fields of the stock item with the id = `:id` in the DB. Requires a description in json of the stock item, with the fields updated, in the body.
- `DELETE /api/stockitems/` - Deletes all the stock items from the DB. Returns no response
- `DELETE /api/stockitems/:id` - Deletes the stock item with the id = `:id` from the DB. Returns no response

### Stock Item Events

- `GET /api/stockitemevents` - Returns a list of all stock item events in the DB in json format with information on the associated stock item.
- `GET /api/stockitemevents/:id` - Returns the stock item event with id = `:id`, if one exists, with information on the associated stock item and its supplier.
- `GET /api/stockitems/:id/events` - Returns a list of all stock item events for the stock item with id = `:id` in the DB in json format
- `POST /api/stockitemevents` - Creates a new stock item event. Requires a description in json of the stock item event in the body
- `PUT /api/stockitemevents/:id` - Updates the fields of the stock item event with the id = `:id` in the DB. Requires a description in json of the stock item event, with the fields updated, in the body.
- `DELETE /api/stockitemevents/` - Deletes all the stock item events from the DB. Returns no response
- `DELETE /api/stockitemevents/:id` - Deletes the stock item event with the id = `:id` from the DB. Returns no response

### Suppliers

- `GET /api/suppliers` - Returns a list of all suppliers in the DB in json format with the address information.
- `GET /api/suppliers/:id` - Returns the supplier with id = `:id`, if one exists,  with the address information.
- `POST /api/suppliers` - Creates a new supplier. Requires a description in json of the supplier in the body
- `PUT /api/suppliers/:id` - Updates the fields of the supplier with the id = `:id` in the DB. Requires a description in json of the supplier, with the fields updated, in the body.
- `DELETE /api/suppliers/` - Deletes all the suppliers from the DB. Returns no response
- `DELETE /api/suppliers/:id` - Deletes the supplier with the id = `:id` from the DB. Returns no response

## Database Diagram

![High level Database Diagram](./diagram/MRM%20Database.png "High level Database Diagram")

### Updating the diagram

To update the diagram you would go to [online diagram maker tool](https://app.diagrams.net/) and import the file `./diagram/MRM Database.png` in this repo. There you can modify the diagram at will.

Once you are done modifying the diagram:

- Export it as png with borders set to `10` and zoom set to `125%`
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
