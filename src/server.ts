import config from './config/config'
import server from './app'

const PORT : number = +config.server.port

server.listen(PORT, () => console.log(`listening at port ${PORT}`))