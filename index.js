import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Sign from "./Sign.js";
import bodyparser from 'body-parser';
import Appointment from "./Appointment.js";

const app = express();
const PORT = 3000;

const DB_URL = "mongodb+srv://gleb:123@cluster.uw5bnc6.mongodb.net/?retryWrites=true&w=majority&appName=cluster";

app.use(cors())
app.use(bodyparser.json());



app.listen(PORT, async (error) => {
    await mongoose.connect(DB_URL)
    if(!error) {
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    } else { 
        console.log("Error occurred, server can't start", error);
    }
    }
);


app.get('/api/signs', async (req, res) => {
    try {
        const signs = await Sign.find()
        return res.json(signs)
    } catch (e) {
        console.log(e)
    }
})

app.post('/api/new', async (req, res) => {
    const { name, phone, date, additional_data } = req.body;

    if (!phone || !name || !date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const data = {
            name,
            date,
            phone,
            additional_data,
        };

        const sign = new Sign(data);
        await sign.save();

        res.status(201).json({ message: 'Created', sign });
    } catch (error) {
        console.error('Error creating sign:', error);
        res.status(500).json({ error: 'Failed to create sign' });
    }
})

app.post('/api/appointment', (req, res) => {
    try {
        const {name, phone, date} = req.body;
        console.log(name, phone, date);
        const appointment = Appointment.create({name, phone, date});
        return res.json(appointment);
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/api/appointment', (req, res) => {
    try {
        console.log('get appointments');
        const appointments = Appointment.find();
        return res.json(appointments);
    } catch (error) {
        console.error(error.message);
    }
});


