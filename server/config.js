module.exports = {
  name : 'LMS',
  version : '0.0.1',
  env : process.env.NODE_ENV || 'development',
  port : process.env.PORT || 8080,
  base_url : process.env.BASE_URL || 'http://localhost:8080',
  lms_url : process.env.LMS_URL || 'http://localhost:8545',
};
