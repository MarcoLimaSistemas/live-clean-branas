import ParkingLotAdapter from "../../../adapter/ParkingLotAdapter";
import ParkingLot from "../../entity/ParkingLote";
import ParkingLote from "../../entity/ParkingLote";
import ParkingLotRepository from "../../repository/ParkingLotRepository";

export default class ParkingLotRepositoryMemory implements ParkingLotRepository {
    parkingLots = [
        {
            code: "shopping",
            capacity: 5,
            open_hour: 8,
            close_hour: 22
        }
    ]
    parkedCars = [];
    saveParkedCar(code: string, plate: string, date: Date) {
        this.parkedCars.push({ code, plate, date });
    }
    getParkingLot(code: string): Promise<ParkingLote> {
        const parkingLoteData = this.parkingLots.find(e => e.code == code);
        const occupiedSpaces = this.parkingLots.length
        const parkingLot = ParkingLotAdapter.create(parkingLoteData.code, parkingLoteData.capacity, parkingLoteData.open_hour, parkingLoteData.close_hour, occupiedSpaces);
        parkingLot.occupiedSpaces = this.parkedCars.length
        return Promise.resolve(parkingLot);
    }

}