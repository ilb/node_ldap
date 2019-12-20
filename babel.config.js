module.exports = {
  presets: [
    ['@babel/env', {
      targets: {
        node: 'current',
        firefox: '52',
        chrome: '67',
        safari: '11.1',
      },
    }],
  ],
};
