import * as dotenv from 'dotenv'

class Configs {

    _jwtSecret: string = ''

    setup(path: string) {
        dotenv.config({ path })
        this._jwtSecret = process.env.jwt_secret!
    }
    
    public get jwtSecret() : string {
        return this._jwtSecret
    }
}

export default new Configs()