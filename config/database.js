module.exports = {
  hrPool: {
    user: process.env.DEV_USER,
    password: process.env.DEV_PASSWORD,
    connectString: process.env.DEV_CONNECTIONSTRING,
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  }
};

