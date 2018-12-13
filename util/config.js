module.exports = {
    PORT : process.env.PORT || 3000,
    DB: {
        DB_NAME: 'job_board',
        USER: 'root',
        PASSWORD: '',
        PORT: 3306,
        HOST: 'localhost'
    },
    SESSION: {
        SECRET: 'someSecret'
    }
}