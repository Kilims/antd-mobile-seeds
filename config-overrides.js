const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');
const path = require('path')

module.exports = override(
    fixBabelImports('import', {
        // libraryName: 'antd-mobile',
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            // "@brand-primary": "#108ee9"  // this is for antd-mobile
            '@primary-color': '#40a9ff'
        }
    }),
    addWebpackAlias({
        ['@context']: path.resolve(__dirname, "src/context"),
        ['@components']: path.resolve(__dirname, "src/components"),
        ['@api']: path.resolve(__dirname, "src/services"),
        ['@utils']: path.resolve(__dirname, "src/utils")
    })
)