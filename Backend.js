require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const api = require('./routes/api');


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', api);


const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> app.listen(PORT, ()=> console.log('API running on', PORT)))
.catch(err=> console.error(err));
