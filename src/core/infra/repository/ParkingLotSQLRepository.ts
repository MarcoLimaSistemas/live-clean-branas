import ParkingLotAdapter from "../../../adapter/ParkingLotAdapter";
import ParkingLote from "../../entity/ParkingLote";
import ParkingLotRepository from "../../repository/ParkingLotRepository";
import db from "../database/database";
export default class ParkingLotSQLRepository implements ParkingLotRepository {
    async getParkingLot(code: string): Promise<ParkingLote> {
        const parkingLotData = await db.oneOrNone("select *, (select count(*) from public.parked_cars pc where code = pl.code)::int as occupied_spaces from public.parking_lots pl where code = $1", code)
  
        return ParkingLotAdapter.create(parkingLotData.code, parkingLotData.capacity, parkingLotData.open_hour, parkingLotData.close_hour, parkingLotData.occupied_spaces)
    }
    async saveParkedCar(code: string, plate: string, date: Date) {
        await db.none("insert into public.parking_lots (code, plate, date) values ($1, $2, $3)", [code, plate, date.toISOString()])
    }

}