const MongoLib = require('../lib/mongo')

class ApiKeysService {
  constructor() {
    this.collection = 'api-keys'
    this.mongoDb = new MongoLib()
  }

  async getApiKey({ token }) {
    const [apiKey] = await this.mongoDb.getAll(this.collection, { token })
    return apiKey
  }
}
module.exports = ApiKeysService