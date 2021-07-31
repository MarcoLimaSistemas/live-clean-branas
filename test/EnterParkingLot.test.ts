import ParkingLotRepositoryMemory from "../src/core/infra/repository/ParkingLotRepositoryMemory";
import ParkingLotSQLRepository from "../src/core/infra/repository/ParkingLotSQLRepository";
import EnterParkingLot from "../src/core/usecase/EnterParkingLot"
import GetParkingLot from "../src/core/usecase/GetParkingLot";



test("Should get a parking lot", async () => {
    const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
    const parkingLotSQLRepository = new ParkingLotSQLRepository();   
    const getParkingLot = new GetParkingLot(parkingLotSQLRepository);
    const parkingLot = await getParkingLot.execute('123');
    expect(parkingLot.code).toBe("123")
})

test("Should enter parking lot", async () => {
    const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
    const parkingLotSQLRepository = new ParkingLotSQLRepository();
    const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory);
    const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory);
    const parkingLotBeforeEnter = await getParkingLot.execute('shopping')
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0)

    await enterParkingLot.execute('shopping', "MMM-0001", new Date('2021-07-31T10:00:00'));
    const parkingLotAfterEnter = await getParkingLot.execute('shopping')
    expect(parkingLotAfterEnter.occupiedSpaces).toBe(1)
    /// expect(parkingLot.code).toBe("shopping")
})
test.skip("Should enter parking be closed", async () => {
    const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
    const parkingLotSQLRepository = new ParkingLotSQLRepository();
    const enterParkingLot = new EnterParkingLot(parkingLotRepositoryMemory);
    const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory);
    const parkingLotBeforeEnter = await getParkingLot.execute('shopping')
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0)

    await enterParkingLot.execute('shopping', "MMM-0001", new Date('2021-07-31T23:00:00'));
    
    /// expect(parkingLot.code).toBe("shopping")
})
test("Should enter parking be full", async () => {
    const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
    const parkingLotSQLRepository = new ParkingLotSQLRepository();
    const enterParkingLot = new EnterParkingLot(parkingLotSQLRepository);
    const getParkingLot = new GetParkingLot(parkingLotSQLRepository);
    const parkingLotBeforeEnter = await getParkingLot.execute('shopping')
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(1)

    await enterParkingLot.execute('shopping', "MMM-0001", new Date('2021-07-31T10:00:00'));
    await enterParkingLot.execute('shopping', "MMM-0002", new Date('2021-07-31T10:00:00'));
    await enterParkingLot.execute('shopping', "MMM-0003", new Date('2021-07-31T10:00:00'));
    await enterParkingLot.execute('shopping', "MMM-0004", new Date('2021-07-31T10:00:00'));
    await enterParkingLot.execute('shopping', "MMM-0005", new Date('2021-07-31T10:00:00'));
    await enterParkingLot.execute('shopping', "MMM-0006", new Date('2021-07-31T10:00:00'));
    const parkingLotAfterEnter = await getParkingLot.execute('shopping')
    expect(parkingLotAfterEnter.isFull()).toBe(true)
})