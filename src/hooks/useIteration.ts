import { useState } from "react";
import { useTick } from "@inlet/react-pixi";

const useIteration = (inc = 0.1) => {
    const [i, setI] = useState(0);
    
    useTick((delta) => {
      setI(i => i + inc * (delta ? delta : 0));
    });
  
    return i;
};

export default useIteration;
