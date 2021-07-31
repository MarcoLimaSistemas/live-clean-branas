import ParkingLot from "../entity/ParkingLote";

export default interface ParkingLotRepository {

    getParkingLot(code: string): Promise<ParkingLot>;
    saveParkedCar(code: string, plate: string, date: Date)
}