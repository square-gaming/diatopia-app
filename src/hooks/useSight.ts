import { useMemo } from "react";
import Camera from "../controllers/Camera";
import Sight from "../controllers/Sight";
import Vector from "../math/Vector";

const useSight = (camera: Camera, bound: Vector) => {
  return useMemo(() => new Sight(camera, bound), [bound, camera]);
};

export default useSight;
