const apiV1 = require("express")()
const { router: carRouter } = require("./car")
const { router: userRouter } = require("./users")

apiV1.use("/car", carRouter)
apiV1.use("/user", userRouter)

module.exports = { apiV1 }
