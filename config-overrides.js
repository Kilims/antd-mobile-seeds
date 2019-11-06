const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');
const path = require('path')

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: true
    }),
    addLessLoader({
        modifyVars: {
            "@brand-primary": "#108ee9"
        }
    }),
    addWebpackAlias({
        ['@component']: path.resolve(__dirname, "src/test/Component")
    })
)