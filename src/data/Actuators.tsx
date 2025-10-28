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
    },
    {
        id: 'a',
        name: 'Foco',
        icon: icons.lightBulbIcon,
        commandOn: 'a',
        commandOff: 'b',
        state: 'Off'
    },
    {
        id: 'b',
        name: 'Puerta',
        icon: icons.doorIcon,
        commandOn: 'c',
        commandOff: 'd',
        state: 'On'
    },
    {
        id: 'c',
        name: 'Foco',
        icon: icons.lightBulbIcon,
        commandOn: 'a',
        commandOff: 'b',
        state: 'Off'
    },
    {
        id: 'd',
        name: 'Puerta',
        icon: icons.doorIcon,
        commandOn: 'c',
        commandOff: 'd',
        state: 'On'
    },
    {
        id: 'e',
        name: 'Foco',
        icon: icons.lightBulbIcon,
        commandOn: 'a',
        commandOff: 'b',
        state: 'Off'
    },
    {
        id: 'f',
        name: 'Puerta',
        icon: icons.doorIcon,
        commandOn: 'c',
        commandOff: 'd',
        state: 'On'
    }
]