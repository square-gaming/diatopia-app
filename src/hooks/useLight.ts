import { useMemo } from "react";
import Camera from "../controllers/Camera";
import Light from "../controllers/Light";
import Vector from "../math/Vector";
import { Layer } from "../types";

const useLight = (
  camera: Camera,
  bound: Vector,
  lightLayer: Layer,
  segment: number
) => {
  return useMemo(
    () => new Light(camera, bound, lightLayer, segment),
    [bound, camera, lightLayer, segment]
  );
};

export default useLight;
