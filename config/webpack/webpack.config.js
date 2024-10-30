const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const SRC_PATH = path.resolve(__dirname, '../../src');
const DIST_PATH = path.resolve(__dirname, '../../build');
const PUBLIC_PATH = path.resolve(__dirname, '../../public');

module.exports = {
  context: __dirname,
  entry: path.join(SRC_PATH, "index.js"),
  output: {
    path: DIST_PATH,
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
        {
            // Match `.js`, `.jsx`, `.ts` or `.tsx` files
            test: /\.[jt]sx?$/,
            loader: 'esbuild-loader',
            options: {
                // JavaScript version to compile to
                target: 'es2015'
            }
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
            test: /\.svg$/,
            use: [{
                loader: '@svgr/webpack',
                options: {
                    svgoConfig: {
                        plugins: [{removeViewBox: false}]
                    }
                }
            }]
        }
    ]
  },
  devServer: {
    compress: true,
    port: 3000,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin({})],
    alias: {
      'react': "preact/compat",
      'react-dom/test-utils': "preact/test-utils",
      'react-dom': "preact/compat",     // Must be below test-utils
      'react/jsx-runtime': "preact/jsx-runtime"
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: PUBLIC_PATH,
          to: DIST_PATH,
          globOptions: {
            // dot: true,
            // gitignore: true,
            ignore: ["**/*.html"],
          },
        },
      ],
    }),
    new HTMLWebpackPlugin({
      inject: 'body',
      template: path.resolve(PUBLIC_PATH, 'index.html'),
    }),
    new BundleAnalyzerPlugin({ analyzerMode: 'disabled' }),
  ]
};
