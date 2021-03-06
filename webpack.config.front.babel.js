import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'
import precss from 'precss'
const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  context: __dirname,
  entry: {
    '/js/app': './srcfront/app'
  },
  output: {
    path: __dirname + '/binfront',
    filename: '[name].js',
    library: "fg"
  },
  devtool: "cheap-inline-module-source-map",
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "/js/common"
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new ExtractTextPlugin('/css/app.css')
  ],
  
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /\/node_modules\//,
      loader: 'babel',
      query: {
        presets: ['react','es2015'],
        plugins: [
          ["transform-runtime", {
            "polyfill": true,
            "regenerator": true
          }]
        ]
      }
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!sass!postcss-loader')
    },
    {
      test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
      include: /\/node_modules\//,
      loader: 'file?name=[1].[ext]&regExp=node_modules/(.*)'
    },
    {
      test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
      exclude: /\/node_modules\//,
      loader: 'file?name=[path][name].[ext]'
    }
    ]
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
};