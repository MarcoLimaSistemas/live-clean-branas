import ParkingLotRepository from "../repository/ParkingLotRepository";

export default class GetParkingLot {
    parkingLoteRepository: ParkingLotRepository;
    constructor(parkingLoteRepository: ParkingLotRepository) {
        this.parkingLoteRepository = parkingLoteRepository;
    }

    execute(code: string) {
      return  this.parkingLoteRepository.getParkingLot(code);
    }
}