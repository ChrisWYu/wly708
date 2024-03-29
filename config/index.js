'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');
const myIp = require("my-ip");
module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': {
                //target: 'http://10.0.134.187:72/', //正式服务器
                target: 'http://218.89.67.51:85/', //外部服务器
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
        //   proxyTable: {
        //       '/node': {
        //           target: 'http://222.188.80.210', //正式服务器
        //           changeOrigin: true, //是否跨域
        //           pathRewrite: {
        //               '^/api': '/node'
        //           }
        //       }
        //   },
        // Various Dev Server settings
        // host: 'localhost', // can be overwritten by process.env.HOST
        host: '172.16.2.223', // can be overwritten by process.env.HOST 五粮 液
        //host: '10.2.5.232', // can be overwritten by process.env.HOST 五粮 液
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../scanexpPC/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../scanexpPC'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/scanexp/pc/',

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
