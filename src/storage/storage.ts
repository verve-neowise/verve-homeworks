import sqlite3 from 'sqlite3'

import config from '../configs/config'

sqlite3.verbose()


class Storage {

    constructor(private db: sqlite3.Database) {
    }

    all<T>(query: string, params: any[] = []) {
        return new Promise<T[]>((resolve, reject) => {
            this.db.all(query, params, (err, rows) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(rows)
                }
            })
        })
    }

    get<T>(query: string, params: any[] = []) {
        return new Promise<T>((resolve, reject) => {
            this.db.get(query, params, (err, row) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(row)
                }
            })
        })
    }

    run(query: string, params: any[]) {
        return new Promise<void>((resolve, reject) => {
            this.db.run(query, params, (err) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve()
                }
            })
        })
    }
}

export default new Storage(new sqlite3.Database(config.database))