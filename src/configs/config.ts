import * as dotenv from 'dotenv'

class Configs {

    private _jwtSecret: string = ''
    private _sessionSecret: string = ''
    private _database: string = ''

    setup(path: string) {
        dotenv.config({ path })
        this._jwtSecret = process.env.jwt_secret!
        this._sessionSecret = process.env.session_secret!
        this._database = process.env.sqlite_path!
    }
    
    public get jwtSecret() : string {
        return this._jwtSecret
    }

    public get sessionSecret(): string {
        return this._sessionSecret
    }

    public get database(): string {
        return this._database 
    }
}

export default new Configs()