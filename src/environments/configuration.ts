import { registerAs } from '@nestjs/config'

export default registerAs('config', () => {
  return {
    security: {
      jwtSecret: process.env.JWT_SECRET,
      jwtExpiresIn: process.env.JWT_EXPIRES_IN
    },
    mongo: {
      systemId: process.env.SYSTEM_MONGO_ID,
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      connection: process.env.MONGO_CONNECTION,
      dbName: process.env.MONGO_INITDB_DATABASE,
      authDb: process.env.MONGO_AUTH_DATABASE,
      defaultDb: process.env.MONGO_DEFAULT_DATABASE,
      port: parseInt(process.env.MONGO_PORT, 10),
      host: process.env.MONGO_HOST,
      hostReplicate: process.env.MONGO_HOST_REPLICATE,
      pathToCaCert: process.env.MONGO_PATH_TO_CA_CERT
    },
    mailing: {
      templateFolder: process.env.MAILER_DIR_TEMPLATE,
      transportConfiguration: process.env.TRANSPORT_CONFIGURATION,
      incomingPasswordUsers: process.env.MAILDEV_INCOMING_USER,
      incomingPasswordPassword: process.env.MAILDEV_INCOMING_PASS
    }
  }
})
