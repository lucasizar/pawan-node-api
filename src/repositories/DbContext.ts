import sql from 'mssql'
import logging from '../config/logging'

const config = {
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    server: process.env.DB_HOST!,
    database: process.env.DB_NAME!,
    options: {
        encrypt: true
    }
}

export default class DbContext {
    protected sqlInstance = sql

    protected async getConnection() : Promise<sql.ConnectionPool> {
        const pool = new sql.ConnectionPool(config)
        try{
            await pool.connect()

            logging.info('DATABASE', `Connected at ${config.server}`)

            return pool
        }catch(err : any){
            logging.error('DATABASE', 'Failed to connect', err)

            throw Error(err)
        }
    }

    protected async getRequest() : Promise<sql.Request> {
        try{
            const connection = await this.getConnection()
            
            return connection.request()
        }catch(err : any){
            logging.error('DATABASE', 'Failed to retrieve connection request', err)
            throw Error(err)
        }
    }
}