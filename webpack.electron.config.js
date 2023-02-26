const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', 'jsx', '.js'],
  },
  devtool: 'inline-source-map',
  entry: './src/main/index.ts',
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'DocketeerElectron.js',
  },
};
