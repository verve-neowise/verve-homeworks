import * as dotenv from 'dotenv'

class Configs {

    private _jwtSecret: string = ''
    private _sessionSecret: string = ''

    setup(path: string) {
        dotenv.config({ path })
        this._jwtSecret = process.env.jwt_secret!
        this._sessionSecret = process.env.session_secret!
    }
    
    public get jwtSecret() : string {
        return this._jwtSecret
    }

    public get sessionSecret(): string {
        return this._sessionSecret
    }
}

export default new Configs()