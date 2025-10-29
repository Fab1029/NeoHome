import icons from "../constants/icons";
import { Actuator } from "../models/Actuator";


export const actuators: Actuator[] = [
    {
        id: 'light',
        name: 'Foco',
        icon: icons.lightBulbIcon,
        commandOn: 'a',
        commandOff: 'b',
        state: 'Off'
    },
    {
        id: 'door',
        name: 'Puerta',
        icon: icons.doorIcon,
        commandOn: 'c',
        commandOff: 'd',
        state: 'On'
    }
]