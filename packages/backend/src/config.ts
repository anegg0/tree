const result = require('dotenv').config();
export const config = {
  secret: 'shhhh', // TODO Put in process.env
  algorithms: ['HS256']

};
