export interface Actuator {
    id: string;
    name: string;
    icon: any;
    commandOn: string;
    commandOff: string;
    commandMove?: string;
    angleValue?: string;
    intensity?: string;
    state: string;
}
