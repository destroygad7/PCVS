const express = require('express');
const User = require('./models/user');
const Centre = require('./models/centre');
const Batch = require('./models/batch')
const Vaccination = require('./models/vaccination')
const mongoose = require("mongoose");

const app = express()

mongoose.connect("mongodb+srv://max:FfcmlsYqJG7PiUcg@cluster0.ujapb.mongodb.net/pcvs?retryWrites=true&w=majority")
  .then(() =>{
    console.log('Connected to database');
  })
  .catch (()=>{
    console.log('Connection failed');
  })

app.use(express.json());

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,PUT,DELETE,OPTIONS");
  next();
})

app.post("/api/users",(req,res,next)=>{
  const user = new User({
    userID: req.body.userID,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    acctype: req.body.acctype,

    centreID: req.body.centreID,
    staffID: req.body.staffID,

    ID: req.body.ID,
    IDtype: req.body.IDtype,
    phone: req.body.phone,
    first: req.body.first
  });
  console.log(user);
  user.save();
  res.status(201).json({
    message: 'users added successfully'
  });
})

app.get('/api/users',(req,res,next)=>{
  User.find().then(documents => {
    res.status(200).json({
      message: 'User fetched successfully',
      users: documents
    });
  })
});

app.post("/api/batches",(req,res,next)=>{
  const batch = new Batch({
    batchID: req.body.batchID,
    batchNumber: req.body.batchNumber,
    expiry: req.body.expiry,
    quantity: req.body.quantity,
    pending: req.body.pending,
    administered: req.body.administered,
    centre: req.body.centre,
    vaccine: req.body.vaccine
  });
  console.log(batch);
  batch.save();
  res.status(201).json({
    message: 'batches added successfully'
  });
})

app.put("/api/batches/:id",(req,res,next) => {
  const batch = new Batch({
    _id: req.body.id,
    batchID: req.body.batchID,
    batchNumber: req.body.batchNumber,
    expiry: req.body.expiry,
    quantity: req.body.quantity,
    pending: req.body.pending,
    administered: req.body.administered,
    centre: req.body.centre,
    vaccine: req.body.vaccine
  });
  Batch.updateOne({ _id: req.params.id}, batch).then(result => {
    console.log(result);
    res.status(200).json({message: "Update successful!"});
  });
});

app.get('/api/batches',(req,res,next)=>{
  Batch.find().then(documents => {
    res.status(200).json({
      message: 'batches fetched successfully',
      batches: documents
    });
  })
});

app.post("/api/centres",(req,res,next)=>{
  const centre = new Centre({
    centreID: req.body.centreID,
    centreName: req.body.centreName,
    centreAddress: req.body.centreAddress,
    centrePos: req.body.centrePos,
    centreState:req.body.centreState
  })
  console.log(centre);
  centre.save();
  res.status(201).json({
    message: 'centres added successfully'
  });
})

app.get('/api/centres',(req,res,next)=>{
  Centre.find().then(documents => {
    res.status(200).json({
      message: 'Centres fetched successfully',
      centres: documents
    });
  })
});

app.post("/api/vaccinations",(req,res,next)=>{
  const vaccination = new Vaccination({
    vaccinationID: req.body.vaccinationID,
    batch: req.body.batch,
    centre: req.body.centre,
    user: req.body.user,
    status: req.body.status,
    Appointdate: req.body.Appointdate,
  })
  console.log(vaccination);
  vaccination.save();
  res.status(201).json({
    message: 'vaccination added successfully'
  });
})

app.put("/api/vaccinations/:id",(req,res,next) => {
  const vaccination = new Vaccination({
    _id: req.body.id,
    vaccinationID: req.body.vaccinationID,
    batch: req.body.batch,
    centre: req.body.centre,
    user: req.body.user,
    status: req.body.status,
    Appointdate: req.body.Appointdate,
  });
  Vaccination.updateOne({ _id: req.params.id}, vaccination).then(result => {
    console.log(result);
    res.status(200).json({message: "Update successful!"});
  });
});

app.get('/api/vaccinations',(req,res,next)=>{
  Vaccination.find().then(documents => {
    res.status(200).json({
      message: 'Vaccination fetched successfully',
      vaccinations: documents
    });
  })
});

module.exports = app;
