const { UserApi } = require("./user")
const { CarApi } = require("./car")

const BackendApi = {
  user: UserApi,
  car: CarApi,
}

module.exports = { BackendApi }
