import icons from "../constants/icons";
import { Actuator } from "../models/Actuator";


export const actuators: Actuator[] = [
  {
    id: 'hallLight',  //PIN 12
    name: 'Foco Sala',
    icon: icons.lightBulbIcon,
    commandOn: 'a',
    commandOff: 'b',
    state: 'Off'
  },
  {
    id: 'beedromLight',  //pin 5
    name: 'Foco Dormitorio',
    icon: icons.lightBulbIcon,
    commandOn: 'p',
    commandOff: 'q',
    state: 'Off'
  },
  {
    id: 'rele',  //activa el rele PIN 13
    name: 'Rele',
    icon: icons.releIcon,
    commandOn: 'c',
    commandOff: 'd',
    state: 'Off'
  },
  {
    id: 'birthdaySong',
    name: 'Cancion Cumpleaños',
    icon: icons.birthdaySongIcon,
    commandOn: 'e',
    commandOff: 'g',  //detener musica pin 3
    state: 'Off'
  },
  {
    id: 'odeToJoySong',
    name: 'Cancion Alegria',
    icon: icons.odeToJoySongIcon,
    commandOn: 'f',
    commandOff: 'g',  //detener musica pin 3
    state: 'Off'
  },
  {
    id: 'Door',  //PIN 9
    name: 'Puerta',
    icon: icons.doorIcon,
    commandOn: 'l', //abrir 180 grados
    commandOff: 'm', //cerrar 0 grados
    commandMove: 't',
    angleValue: 't0#',
    state: 'Off'
  },
  {
    id: 'Window', //PIN 10
    name: 'Ventana',
    icon: icons.windowIcon,
    commandOn: 'n', //abrir 180 grados 
    commandOff: 'o', //cerrar 0 grados
    angleValue: 'u0#', //'u' se mueve
    state: 'Off'
  },
  {
    id: 'fan',
    name: 'Ventilador',
    icon: icons.fanIcon,
    commandOn: 'r',
    commandOff: 's',
    intensity: 'w#50',
    state: 'Off'
  },
  {
    id: 'led',  //revisar
    name: 'Led',
    icon: icons.lightBulbIcon,
    commandOn: 'v125#',
    commandOff: 'v0#', 
    intensity: 'v125#',
    state: 'Off'
  },
]


/*
NOTAS:
h -> lee el sensor e imprime el valor de la variable light
i -> lee el sensor imprime el valor de la variable gas
j -> lee el sensor imprime el valor de la variable soil
k -> lee el sensor imprime el valor de la variable water

*/