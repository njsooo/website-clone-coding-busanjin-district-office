module.exports = (env) => {
  const isProduction = env.mode === 'production' ? true : false;
  return {
    plugins: [isProduction ? require('autoprefixer') : false],
  };
};
