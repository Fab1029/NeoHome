import icons from "../constants/icons";
import { Sensor } from "../models/Sensors";

export const sensors: Sensor[] = [
    {
        id: 'humidity',
        name: 'Humedad',
        icon: icons.humidityIcon,
        command: 'z'
    },

    {
        id: 'movement',
        name: 'Movimiento',
        icon: icons.movementIcon,
        command: 'y'
    },

    {
        id: 'gas',
        name: 'Gas',
        icon: icons.gasICon,
        command: 'x'
    }
]