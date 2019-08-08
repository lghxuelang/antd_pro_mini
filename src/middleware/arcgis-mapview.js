import { INIT_MAP, INIT_CURTAIN_MAP } from "@/consts/map-types";

import * as jsapi from "../utils/jsapi";
import { synchronizeViews } from "@/utils/synchronizeView";

const ags2d = {};
const leftags = {};
const rightags = {};

async function prepare() {
  const [esriConfig] = await jsapi.load(["esri/config"]);
  //   esriConfig.request.proxyUrl = env.getProxyUrl();
  //   esriConfig.portalUrl = env.getPortal();
}

async function initWebMapView() {
  const [Map, Mapview, Home] = await jsapi.load([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Home"
  ]);
  const webmap = new Map({
    basemap: "topo"
  });
  debugger;
  ags2d.view = new Mapview({
    container: ags2d.container,
    map: webmap,
    ui: {
      components: []
    }
  });
  const home = new Home({
    view: ags2d.view
  });
  ags2d.view.ui.add(home, "top-left");
}
//构造卷帘主地图
async function initLeftWebmap() {
  const [Map, Mapview, Home] = await jsapi.load([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Home"
  ]);
  const webmap = new Map({
    basemap: "topo"
  });
  leftags.view = new Mapview({
    container: leftags.container,
    map: webmap,
    ui: {
      components: []
    }
  });
  const home = new Home({
    view: leftags.view
  });
  leftags.view.ui.add(home, "top-left");
}
//构造卷帘辅地图
async function initRightWebmap() {
  const [Map, Mapview, Home] = await jsapi.load([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Home"
  ]);
  const webmap = new Map({
    basemap: "topo"
  });
  rightags.view = new Mapview({
    container: rightags.container,
    map: webmap,
    ui: {
      components: []
    }
  });
  const home = new Home({
    view: rightags.view
  });
  // rightags.view.ui.add(home, "top-left");
}

function createMapView(opts = {}) {
  // Detect if 'createLogger' was passed directly to 'applyMiddleware'.
  if (opts.getState && opts.dispatch) {
    return () => next => action => next(action);
  }

  return () => next => async action => {
    switch (action.type) {
      case INIT_MAP: {
        const { payload } = action;
        const { container } = payload;
        if (!container) break;

        // if sceneview container is already initialized, just add it back to the DOM.
        if (ags2d.container) {
          container.appendChild(ags2d.container);
          break;
        }
        // Otherwise, create a new container element and a new scene view.
        ags2d.container = document.createElement("div");
        ags2d.container.style.height = "100%";
        ags2d.container.style.width = "100%";
        ags2d.container.style.margin = "0";
        ags2d.container.style.padding = "0";
        container.appendChild(ags2d.container);

        await prepare();
        await initWebMapView();
        // When initialized...
        return ags2d.view.when(() => {
          window.ags2d = ags2d;
        });
      }
      case INIT_CURTAIN_MAP: {
        const [watchUtils,FeatureLayer] = await jsapi.load(["esri/core/watchUtils",'esri/layers/FeatureLayer']);
        const { payload } = action;
        const { container } = payload;
        if (!container) break;
        const layer = new FeatureLayer({
          // URL to the service
          url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/0"
        });
        // if sceneview container is already initialized, just add it back to the DOM.
        if (leftags.container) {
          container.appendChild(leftags.container);
          break;
        }
        // Otherwise, create a new container element and a new scene view.
        leftags.container = document.createElement("div");
        leftags.container.style.height = "100%";
        leftags.container.style.width = "100%";
        leftags.container.style.margin = "0";
        leftags.container.style.padding = "0";
        container.appendChild(leftags.container);

        rightags.container = document.createElement("div");
        rightags.container.style.height = "100%";
        rightags.container.style.width = "100%";
        rightags.container.style.margin = "0";
        rightags.container.style.padding = "0";
        rightags.container.style.position = "relative"; //使两个地图重合
        rightags.container.style.top = "-100%";
        container.appendChild(rightags.container);

        await prepare();
        await initLeftWebmap();
        await initRightWebmap();
        // When initialized...
        leftags.view.when(() => {
          window.leftags = leftags;
          leftags.view.map.add(layer);
        });
        rightags.view.when(() => {
          window.rightags = rightags;
        });
        synchronizeViews([leftags.view, rightags.view], watchUtils); //同步两个view
        break;
      }
      default: {
        next(action);
        break;
      }
    }
    return Promise.resolve();
  };
}

export default createMapView();
