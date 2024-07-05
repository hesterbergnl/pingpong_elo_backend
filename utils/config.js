require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URL = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URL
const DEFAULT_IMG = process.env.DEFAULT_IMG

module.exports = {
  MONGODB_URL,
  PORT,
  DEFAULT_IMG
}