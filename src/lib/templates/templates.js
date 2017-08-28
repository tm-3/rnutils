var Handlebars = require("handlebars");  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['AppTsx'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "import React from 'react';\nimport { StyleSheet, View, Text } from 'react-native';\n\nimport { observable } from 'mobx';\nimport { observer } from 'mobx-react';\n\ninterface IAppProps {\n    rootStore?: object;   \n}\n    \ninterface IAppState {\n\n}\n\n@observer\nexport class App extends React.Component<IAppProps, IAppState> {\n    render() {\n        return (\n            <View  style={styles.appContainer}>\n                <Text>Replace me with your app.</Text>\n            </View>\n        )\n    }\n}\n\n\nconst styles = StyleSheet.create({\n    appContainer: {\n        flex: 1,\n        justifyContent: 'center',\n        alignItems: 'center',\n        alignContent: 'center'\n    }\n})";
},"useData":true});
templates['BasicTest'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "import 'react-native';\nimport React from 'react';\nimport { App } from '../src/';\n\nimport renderer from 'react-test-renderer';\n\nit('renders correctly', () => {\n  const rendered = renderer.create(\n    <App />\n  );\n  expect(rendered).toMatchSnapshot();\n});";
},"useData":true});
templates['Component'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "import * as react from 'react';\nimport { View } from 'react-native';\nimport { observable } from 'mobx';\nimport { observer } from 'mobx-react';\n\nimport { I"
    + alias4(((helper = (helper = helpers.componentName || (depth0 != null ? depth0.componentName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"componentName","hash":{},"data":data}) : helper)))
    + "Props, I"
    + alias4(((helper = (helper = helpers.componentName || (depth0 != null ? depth0.componentName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"componentName","hash":{},"data":data}) : helper)))
    + "State } from './'\n\n@observer\nexport class "
    + alias4(((helper = (helper = helpers.componentName || (depth0 != null ? depth0.componentName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"componentName","hash":{},"data":data}) : helper)))
    + " extends react.Component<I"
    + alias4(((helper = (helper = helpers.componentName || (depth0 != null ? depth0.componentName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"componentName","hash":{},"data":data}) : helper)))
    + "Props, I"
    + alias4(((helper = (helper = helpers.componentName || (depth0 != null ? depth0.componentName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"componentName","hash":{},"data":data}) : helper)))
    + "State> {\n\n    render() {\n        return(\n            <View></View>\n        )\n    }\n}";
},"useData":true});
templates['ComponentIndex'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "export * from './"
    + container.escapeExpression(((helper = (helper = helpers.componentName || (depth0 != null ? depth0.componentName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"componentName","hash":{},"data":data}) : helper)))
    + "';";
},"useData":true});
templates['EntryPoint'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "import { AppRegistry } from 'react-native';\nimport { App } from './src';\nimport StorybookUI from './storybook';\n\nvar storybook = true;\n\nstorybook ? \nAppRegistry.registerComponent('"
    + alias4(((helper = (helper = helpers.projectName || (depth0 != null ? depth0.projectName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"projectName","hash":{},"data":data}) : helper)))
    + "', () => StorybookUI) :\nAppRegistry.registerComponent('"
    + alias4(((helper = (helper = helpers.projectName || (depth0 != null ? depth0.projectName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"projectName","hash":{},"data":data}) : helper)))
    + "', () => App);";
},"useData":true});
templates['IComponentProps'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "export interface I"
    + container.escapeExpression(((helper = (helper = helpers.componentName || (depth0 != null ? depth0.componentName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"componentName","hash":{},"data":data}) : helper)))
    + "Props {\n\n}";
},"useData":true});
templates['IComponentState'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "export interface I"
    + container.escapeExpression(((helper = (helper = helpers.componentName || (depth0 != null ? depth0.componentName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"componentName","hash":{},"data":data}) : helper)))
    + "State {\n\n}";
},"useData":true});
templates['RnCliConfig'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "module.exports = {\n    getTransformModulePath() {\n        return require.resolve('react-native-typescript-transformer');\n    },\n    getSourceExts() {\n        return [ 'ts', 'tsx' ]\n    }\n};";
},"useData":true});
templates['StatelessComponent'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "import * as react from 'react';\nimport { Text } from 'react-native';\n\n/**TODO: Replace the rendered JSX to meet your requirements.\n  *If you need a function passed in, create it in the interface like this:\n  *export interface I"
    + alias4(((helper = (helper = helpers.componentName || (depth0 != null ? depth0.componentName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"componentName","hash":{},"data":data}) : helper)))
    + "Props {\n  *   someFunction: () => any      \n  *}\n  */\n\nimport { I"
    + alias4(((helper = (helper = helpers.componentName || (depth0 != null ? depth0.componentName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"componentName","hash":{},"data":data}) : helper)))
    + "Props } from './'\n\nexport const "
    + alias4(((helper = (helper = helpers.componentName || (depth0 != null ? depth0.componentName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"componentName","hash":{},"data":data}) : helper)))
    + ": react.SFC<I"
    + alias4(((helper = (helper = helpers.componentName || (depth0 != null ? depth0.componentName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"componentName","hash":{},"data":data}) : helper)))
    + "Props> = (props) => {\n    return <Text>{props}</Text>;\n}";
},"useData":true});
