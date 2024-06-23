import mongoose from 'mongoose';

const Sign = new mongoose.Schema({
    name: {type: 'string', required: true},
    date: {type: 'string', required: true},
    phone: {type: 'string', required: true},
    additional_data: {type: 'string'}
})

export default mongoose.model('Sign', Sign)