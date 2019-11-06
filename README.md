This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

<p align="center">
  <a><img src="https://img.shields.io/badge/create--react--app-3.2.0-brightgreen"></a>
  <a><img src="https://img.shields.io/badge/babel--plugin--import-1.12.1-brightgreen"></a>
  <a><img src="https://img.shields.io/badge/antd--mobile-2.3.1-brightgreen"></a>
  <a><img src="https://img.shields.io/badge/css--loader-3.2.0-brightgreen"></a>
  <a><img src="https://img.shields.io/badge/customize--cra-0.8.0-brightgreen"></a>
  <a><img src="https://img.shields.io/badge/less-3.10.3-brightgreen"></a>
  <a><img src="https://img.shields.io/badge/less--loader-5.0.0-brightgreen"></a>
  <a><img src="https://img.shields.io/badge/style--loader-1.0.0-brightgreen"></a>
  <a><img src="https://img.shields.io/badge/react--app--rewired-2.1.4-brightgreen"></a>

</p>


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


## antd-mobile相关使用前的配置

### 引入antd-mobile并且按需加载

根据官网的guide一步步走，步骤包括：

1. 入口页面(html或者模板)相关设置
2. 引入 react-app-rewired 并修改 package.json 里的启动配置
3. 创建一个 config-overrides.js
4. 使用 babel-plugin-import
5. 修改 config-overrides.js并且更改引入方式

即可，一步步跟官网，无错  
https://mobile.ant.design/docs/react/use-with-create-react-app-cn

### 实现主题less修改

根据官网不能实现，经查资料实现步骤如下：

1.   `npm install --save-dev babel-plugin-import less less-loader style-loader css-loader`
2. 配置config-overrides.js，将 style值改为true，如下：

    ```javascript
    const { override, fixBabelImports } = require('customize-cra');

    module.exports = override(
        fixBabelImports('import', {
            libraryName: 'antd-mobile',
            style: true
        }),
    )
    ```

3. 继续配置config-overrides.js，查阅customize-cra文档，添加addLessLoader设置
    ```javascript
    const { override, fixBabelImports, addLessLoader } = require('customize-cra');

    module.exports = override(
        fixBabelImports('import', {
            libraryName: 'antd-mobile',
            style: true
        }),
        addLessLoader({
            modifyVars: {
                "@brand-primary": "#108ee9"  //参照node_modules\antd-mobile\lib\style\themes\default.less 可以查看到所有能修改的变量名字
            }
        })
    )
    ```


### webpack alias设置

配置config-overrides.js

```javascript
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
```



