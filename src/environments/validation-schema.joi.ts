import * as Joi from 'joi'

export const JOI_VALIDATION_SCHEMA = Joi.object({
  SYSTEM_MONGO_ID: Joi.string().required(),
  SYSTEM_PORT: Joi.number().required(),

  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().optional().default('1d'),

  MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
  MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
  MONGO_AUTH_DATABASE: Joi.string().required(),
  MONGO_DEFAULT_DATABASE: Joi.string().required(),
  MONGO_CONNECTION: Joi.string().required(),
  MONGO_PORT: Joi.number().required(),
  MONGO_HOST: Joi.string().required(),
  MONGO_HOST_REPLICATE: Joi.optional(),
  MONGO_PATH_TO_CA_CERT: Joi.optional(),

  MAILER_DIR_TEMPLATE: Joi.string().required(),
  TRANSPORT_CONFIGURATION: Joi.string().required(),
  MAILDEV_INCOMING_USER: Joi.string().required(),
  MAILDEV_INCOMING_PASS: Joi.string().required()
})
