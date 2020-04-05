const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    'content-script': path.resolve('src', 'content-script.tsx'),
  },
  output: {
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new CopyPlugin([
      { from: 'src/manifest.json' }
    ])
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
