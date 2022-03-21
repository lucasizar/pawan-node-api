import dotenv from 'dotenv'

dotenv.config()

const SERVER_PORT = process.env.PORT || 3005

const SERVER = {
    port: SERVER_PORT
}

const config = {
    server: SERVER
}

export default config