const bcrypt = require('bcrypt');
const fs = require('fs');
const mongoose = require('mongoose');
const database = 'DeliveryData';

use(database);

function getCollection(name) {
    if (!db.getCollectionNames().includes(name)) {
        db.createCollection(name);
    }
    coll = db.getCollection(name);
    coll.deleteMany({});
   coll.dropIndexes();
    return db.getCollection(name);
}
// const customers_coll = getCollection("customers");
// let data_customers = fs.readFileSync("Backend/fakeData/customers.json", 'utf-8');
// customers_coll.insertMany(JSON.parse(data_customers));
// const cargo_coll = getCollection("cargo");
// let data_cargo = fs.readFileSync("Backend/fakeData/cargo.json", 'utf-8');
// cargo_coll.insertMany(JSON.parse(data_cargo));

// const cargos_coll = getCollection("cargos");
// let data_cargos = fs.readFileSync("Backend/fakeData/cargo.json", 'utf-8');
// cargos_coll.insertMany(JSON.parse(data_cargos));

// const accounts_coll = getCollection("accounts");
// let data_accounts = fs.readFileSync("Backend/fakeData/accounts.json", 'utf-8');
// const data = JSON.parse(data_accounts);
// const saltRounds = 10;
// data.forEach( el => {
//     bcrypt
//   .genSalt(saltRounds)
//   .then(salt => {
//     return bcrypt.hash(el.password, salt)
//   })
//   .then(hash => {
//     el.password = hash;
//     console.log('hashpassword:', el.password);
    
//   })
//   .catch(err => console.error(err.message))
// })
// const seedDatabase = async () => {
//     try {
//       await accounts_coll.deleteMany({});
//       await accounts_coll.insertMany(data);
//       console.log('Seeding successful');
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   seedDatabase().then(() => {
//     mongoose.connection.close();
//   });
const points_coll = getCollection("points");
let data_points = fs.readFileSync("Backend/fakeData/points.json", 'utf-8');
points_coll.insertMany(JSON.parse(data_points));

const orders_coll = getCollection("orders");
data = fs.readFileSync("Backend/fakeData/orders.json", 'utf-8');
data = JSON.parse(data);
data.forEach(el => {
el.sentDate = new ISODate(el.sentDate);
     el.receivedDate = new ISODate(el.receivedDate); 
});
orders_coll.insertMany(data);