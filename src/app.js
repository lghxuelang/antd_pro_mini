import createMapView from "@/middleware/arcgis-mapview";

export const dva = {
  config: {
    onAction: [createMapView],
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    }
  }
};

export default {};
