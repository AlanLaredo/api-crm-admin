module.exports = {
  apps: [{
    script: './dist/src/main.js',
    env: {
      SYSTEM_MONGO_ID: '6168770f43ca602d2e63cf02',
      DEFAULT_PASSWORD: 'root',
      JWT_SECRET: 'secret',
      JWT_EXPIRES_IN: '10d',
      SYSTEM_PORT: 3001,
      MONGO_INITDB_ROOT_USERNAME: 'm0ng0db',
      MONGO_INITDB_ROOT_PASSWORD: 'm0ng0dbpr3pr0d',
      MONGO_AUTH_DATABASE: 'admin',
      MONGO_DEFAULT_DATABASE: 'jarboss_centercomm',
      MONGO_CONNECTION: 'mongodb',
      MONGO_PORT: 27017,
      MONGO_HOST: '52.117.21.213',
      MONGO_HOST_REPLICATE: '',
      MONGO_PATH_TO_CA_CERT: '',
      MAILER_DIR_TEMPLATE: './src/mail/templates/',
      TRANSPORT_CONFIGURATION: 'smtps://santiagoalan1@gmail.com:cotpmnxdtviuxmof@smtp.gmail.com',
      MAILDEV_INCOMING_USER: 'santiagoalan1@gmail.com',
      MAILDEV_INCOMING_PASS: 'cotpmnxdtviuxmof',
      SYSTEM_BILLING_PATH: './'
    }
  }]
}
