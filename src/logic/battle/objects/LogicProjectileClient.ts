import {LogicProjectileData} from "../../data/LogicProjectileData";
import {LogicGameObjectClient} from "./LogicGameObjectClient";

export class LogicProjectileClient extends LogicGameObjectClient {
    getData(): LogicProjectileData {
        const rawdata = super.getData()
        return new LogicProjectileData(rawdata.instance)
    }
}