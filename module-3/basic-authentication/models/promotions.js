const mongoose = require('mongoose')
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency


const promoSchema = new Schema({
  name:
  {
    type: String,
    required: true,
    unique: true
  },
  image:
  {
    type: String,
    require: true
  },
  label:
    {
    type: String,
    default: 'Just label'
    },
  price:
    {
    type: Currency,
    required: true,
    min: 0
    },
  description:
  {
    type: String,
    required: true  
  }
})

var Promotions = mongoose.model('Promo', promoSchema)

module.exports = Promotions