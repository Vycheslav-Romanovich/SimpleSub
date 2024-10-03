export const isProdEnv = () => {
  // const env = process.env.NODE_ENV
  // if (!env || env.length === 0) return null
  // if (env === 'production') return true
  // if (env === 'development') return false

  return false;
};

export const environment = {
  url: isProdEnv() ? 'https://easy4learn.com' : 'https://dev.elang.app',
  translatedKey: 'b343f4eb2e1cf0d3f0f14ce30649db2fb1e0db28',
  website: isProdEnv()
    ? 'https://edu.elang.app'
    : 'https://edu-elang-app-development-gm4e3.ondigitalocean.app',
  cryptedIvkey: 'nuilaRSl6ZvkBAKG',
  cryptedKey: 'Rfp07QXaQPVo5W66Cyccu8Otd3SSZnIA',
};
