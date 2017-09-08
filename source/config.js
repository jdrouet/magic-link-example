// Could use nconf, but a bit overkill
module.exports = {
  port: process.env.PORT || 3200,
  host: process.env.HOST || 'http://localhost:3200',
  jwt: {
    secret: process.env.JWT_SECRET || 'i am your father',
  },
  database: {
    url: process.env.DATABASE_URL || 'postgres://omts:@localhost:5433/omts-magic-link',
  },
  mail: {
    url: process.env.MAIL_URL || 'smtp://localhost:2525',
  },
};
