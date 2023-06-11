const { model, Schema } = require("mongoose")

const CarModel = model(
  "cars",
  new Schema({
    registrationNumber: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    category: { type: String, required: true },
    color: { type: String, required: true },
  })
)

module.exports = { CarModel }
