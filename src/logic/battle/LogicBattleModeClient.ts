import {Libg} from "../../libs/Libg";
import {LogicTileMap} from "./level/LogicTileMap";

const LogicBattleModeClient_getOwnCharacter = new NativeFunction( // "spray_def_atk" (not sure)
    Libg.offset(0xD685AC, 0x4BB024), 'pointer', ['pointer']
);

const LogicBattleModeClient_getTileMap = new NativeFunction(
    Libg.offset(0xD6852C, 0x3D925C), 'pointer', ['pointer']
);

const LogicBattleModeClient_tileMapOffset = 248;
export const LogicBattleModeClient_gameModeVariationOffset = 292;
export const LogicBattleModeClient_underdogOffset = 334;

export class LogicBattleModeClient {
    static self: LogicBattleModeClient;

    private instance: NativePointer;

    constructor(instance: NativePointer) {
        this.instance = instance;

        LogicBattleModeClient.self = this;
    }

    static getOwnCharacter(logicBattleModeClient: NativePointer): NativePointer {
        return LogicBattleModeClient_getOwnCharacter(logicBattleModeClient);
    }

    static getTileMap(logicBattleModeClient: NativePointer): LogicTileMap {
        return new LogicTileMap(
            LogicBattleModeClient_getTileMap(logicBattleModeClient)
        );
    }

    static isUnderdog(self: NativePointer): boolean {
        return Boolean(self.add(LogicBattleModeClient_underdogOffset).readU8());
    }
}