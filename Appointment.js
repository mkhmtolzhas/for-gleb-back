import mongoose from 'mongoose';

const Appointment = new mongoose.Schema({
    name: {type: String, required: true},
    phone : {type: String, required: true},
    date : {type: String, required: true},
});


export default mongoose.model('Appointment', Appointment);