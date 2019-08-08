import esriLoader from "esri-loader";

const apiRoot = "https://js.arcgis.com/4.12/";
const dojoConfig = {
  async: true,
  // for jsapi ver. >= 4.9
  deps: ["@dojo/framework/shim/main"],
  // for jsapi ver. <= 4.8
  // deps: ['@dojo/shim/main'],
  packages: [
    // {
    //   name: 'sample',
    //   location: 'sample/demo'
    // },
  ],

  has: {
    "esri-promise-compatibility": 1, // Use native Promises by default
    "esri-featurelayer-webgl": 1 // Enable FeatureLayer WebGL capabilities
  }
};

function configEsriLoader() {
  esriLoader.utils.Promise = Promise;
}

export function load(modules) {
  configEsriLoader();
  return esriLoader.loadModules(modules, {
    dojoConfig: dojoConfig,
    url: apiRoot
  });
}
export default {};
