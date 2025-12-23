import React, { createContext, useContext, useState } from "react";
import { actuators } from "../data/Actuators";

export type ActuatorState = {
  id: string;
  state: "On" | "Off";
  intensity?: string; 
};

type ActuatorStateContextType = {
  actuatorStates: ActuatorState[];
  getActuator: (id: string) => ActuatorState | undefined;
  toggleActuatorState: (id: string) => void;
  setActuatorState: (id: string, newState: "On" | "Off") => void;
  setActuatorIntensity: (id: string, newIntensity: string) => void;
};

const ActuatorStateContext = createContext<ActuatorStateContextType | undefined>(undefined);


export const ActuatorStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [actuatorStates, setActuatorStates] = useState<ActuatorState[]>(
    actuators.map((a:any) => ({
      id: a.id,
      state: a.state,
      intensity: a.intensity, 
    }))
  );

  const toggleActuatorState = (id: string) => {
    setActuatorStates((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, state: a.state === "On" ? "Off" : "On" } : a
      )
    );
  };

  const setActuatorState = (id: string, newState: "On" | "Off") => {
    setActuatorStates((prev) =>
      prev.map((a) => (a.id === id ? { ...a, state: newState } : a))
    );
  };

  const setActuatorIntensity = (id: string, newIntensity: string) => {
    setActuatorStates((prev) =>
      prev.map((a) => (a.id === id ? { ...a, intensity: newIntensity } : a))
    );
  };

  const getActuator = (id: string) => {
    return actuatorStates.find((a) => a.id === id);
  };

  return (
    <ActuatorStateContext.Provider
      value={{ actuatorStates, toggleActuatorState, setActuatorState, setActuatorIntensity, getActuator}}
    >
      {children}
    </ActuatorStateContext.Provider>
  );
};

export const useActuatorState = () => {
  const context = useContext(ActuatorStateContext);
  if (!context) {
    throw new Error("useActuatorState debe usarse dentro de un ActuatorStateProvider");
  }
  return context;
};
