export default class ParkingLot {

    code: string;
    capacity: number;
    openHour: number;
    closeHour: number;
    occupiedSpaces: number;

    constructor(code: string, capacity: number, openHour: number, closeHour: number, occupiedSpaces: number) {
        this.code = code;
        this.capacity = capacity;
        this.openHour = openHour;
        this.closeHour = closeHour;
        this.occupiedSpaces = occupiedSpaces
    }

    isOpen(date: Date) {
        const hour = date.getHours();
        console.log('hour', hour, 'this.openHour', this.openHour,  this.closeHour)
        return (hour < this.openHour && hour > this.closeHour);
    } 

    isFull() {
        return this.capacity === this.occupiedSpaces;
    }

}