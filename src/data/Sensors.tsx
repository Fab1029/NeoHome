import icons from "../constants/icons";
import { Sensor } from "../models/Sensors";

export const sensorLevels = [
  'NORMAL', 'WARNING', 'DANGER'
]

export const sensors: Sensor[] = [
  /*{
    id: 'movement',
    name: 'Movimiento',ß
    icon: icons.movementIcon,
    command: 'y'
  },*/
  {
    id: 'gas',
    name: 'Gas',
    icon: icons.gasICon,
    command: 'i'
  },
  {
    id: 'light',
    name: 'Luz',
    icon: icons.lightIcon,
    command: 'h'
  },
  {
    id: 'water',
    name: 'Agua',
    icon: icons.waterIcon,
    command: 'k'
  },
  {
    id: 'soil',
    name: 'Suelo',
    icon: icons.soilIcon,
    command: 'j'
  }
]