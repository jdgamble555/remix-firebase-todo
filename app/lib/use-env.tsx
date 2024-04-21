import { useState } from "react";
import { useShared } from "./use-shared";

function _useEnv(state?: Record<string, string>) {

    const envs = useState(state);

    return envs;
}

export const useEnv = (state?: Record<string, string>) => useShared('env', _useEnv, state);