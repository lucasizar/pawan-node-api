import server from "./server"

const port = process.env.port || 3005

server.listen(port, () => {
  console.log(`listening at port ${port}`)
})