module.exports = {
  database: {
    host: 'localhost',
    port: 27017,
    databaseNane: 'contentstack',
    user: 'contentstack',
    pass: '123456',
    get stringConnection() {
      return `mongodb://${this.host}:${this.port}/${this.databaseNane}`
    }
  }
}