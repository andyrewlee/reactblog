module.exports = {
  applicationPort: 80,
  database: function() {
    return {
      host: 'localhost',
      port: 8889,
      database: 'reactblog',
      user: 'root',
      password: 'root'
    }
  }
}
