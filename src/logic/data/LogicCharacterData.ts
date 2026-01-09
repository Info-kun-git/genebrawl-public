import {Configuration} from "../../gene/Configuration";
import {Libg} from "../../libs/Libg";
import {LogicData} from "./LogicData";

const LogicCharacterData_useColorMod = new NativeFunction( // "UseColorMod"
    Libg.offset(0xC2C4AC, 0x0), 'int', ['pointer'] // in Character::update, "<= 0.0" check
);

const LogicCharacterData_getRedAdd = new NativeFunction( // "RedAdd"
    Libg.offset(0xC2C4BC, 0x0), 'int', ['pointer'] // first after LogicCharacterData::useColorMod check in Character::update
);

export class LogicCharacterData extends LogicData {
    constructor(instance: NativePointer) {
        super(instance);
    }

    static useColorMod(logicCharacterData: NativePointer) {
        return LogicCharacterData_useColorMod(logicCharacterData);
    }

    static getRedAdd(logicCharacterData: NativePointer) {
        return LogicCharacterData_getRedAdd(logicCharacterData);
    }

    static patch() {
        Interceptor.replace(LogicCharacterData_useColorMod, new NativeCallback(function (logicCharacterData) {
            const name = LogicCharacterData.getName(logicCharacterData);

            if (name == "NinjaFake" && Configuration.markFakeNinja)
                return 1;

            return LogicCharacterData.useColorMod(logicCharacterData);
        }, 'int', ['pointer']));

        Interceptor.replace(LogicCharacterData_getRedAdd, new NativeCallback(function (logicCharacterData) {
            const name = LogicCharacterData.getName(logicCharacterData);

            if (name == "NinjaFake" && Configuration.markFakeNinja)
                return 255;

            return LogicCharacterData.getRedAdd(logicCharacterData);
        }, 'int', ['pointer']));
    }
}