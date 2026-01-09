import {Libg} from "../../libs/Libg";
import {LogicData} from "./LogicData";
import {LogicThemeData} from "./LogicThemeData";
import {LogicCharacterData} from "./LogicCharacterData";
import {LogicPlayerTitleData} from "./LogicPlayerTitleData";
import {GlobalID} from "./GlobalID";
import {Configuration} from "../../gene/Configuration";
import {Constants} from "../../gene/Constants";
import {LogicSkinData} from "./LogicSkinData";

const LogicDataTables_getTable = new NativeFunction( // "TID_SHOP_GEM_PACKS"
    Libg.offset(0x0, 0x0), 'pointer', ['int']
);

const LogicDataTables_getMusicByName = new NativeFunction( // "Win_loop", then in check with 2 args (2nd one is 0)
    Libg.offset(0xC49EE8, 0x0), 'pointer', ['pointer', 'pointer']
);

const LogicDataTables_getThemeByName = new NativeFunction( // "Default"
    Libg.offset(0xC51D10, 0x0), 'pointer', ['pointer', 'pointer']
);

const LogicDataTables_getDataById = new NativeFunction( // seasonend_brawler before brawler_txt
    Libg.offset(0xC49D10, 0x3E8900), 'pointer', ['int']
);

const LogicDataTables_getMenuMusic = new NativeFunction( // "MenuMusic"
    Libg.offset(0xC50B50, 0x0), 'pointer', []
);

const LogicDataTables_getLocationThemeByName = new NativeFunction( // "HideIfNoCharacter", then function after function with dword in args
    Libg.offset(0x0, 0x0), 'pointer', ['pointer', 'pointer']
);

export class LogicDataTables {
    static getTable(table: number): NativePointer {
        return LogicDataTables_getTable(table);
    }

    static getMenuMusic(): NativePointer {
        return LogicDataTables_getMenuMusic();
    }

    static getMusicByName(musicName: string) {
        return LogicDataTables_getMusicByName(musicName.scptr(), NULL);
    }

    static getThemeByName(themeName: string): LogicThemeData {
        return new LogicThemeData(LogicDataTables_getThemeByName(themeName.scptr(), NULL));
    }

    static getDataById(classId: number, instanceId: number) {
        const table = LogicDataTables.getTable(classId);

        const data = new NativeFunction(table.readPointer().add(40).readPointer(), 'pointer', ['pointer', 'int'])(table, instanceId);

        switch (classId) {
            case 16:
                return new LogicCharacterData(data);
            case 29:
                return new LogicSkinData(data);
            case 41:
                return new LogicThemeData(data);
            case 76:
                return new LogicPlayerTitleData(data);
            default:
                console.log(`LogicDataTables.getDataById(${classId}, ${instanceId})`, "-", "unknown table id", classId);
                return new LogicData(data);
        }
    }

    static getByGlobalId(globalId: number) {
        return LogicDataTables_getDataById(globalId);
    }

    static patch() {
        Interceptor.replace(LogicDataTables_getDataById, new NativeCallback(function (globalId: number) {
            if (globalId === 0) {
                return LogicDataTables.getByGlobalId(globalId);
            }

            const classId = GlobalID.getClassID(globalId);

            switch (classId) {
                case 76:
                    const instanceId = GlobalID.getInstanceID(globalId);

                    if (instanceId >= 1000) {
                        return LogicDataTables.getByGlobalId(GlobalID.createGlobalID(76, 92));
                    }

                    return LogicDataTables.getByGlobalId(globalId);
                default:
                    return LogicDataTables.getByGlobalId(globalId);
            }
        }, "pointer", ["int"]));

        Interceptor.replace(LogicDataTables_getLocationThemeByName, new NativeCallback((namePtr, data) => {
            if (Configuration.darkTheme) {
                const name = namePtr.fromsc();

                if (name.includes("Showdown")) {
                    namePtr = Constants.DARK_THEME_SHOWDOWN_REPLACEMENT.scptr();
                } else {
                    namePtr = Constants.DARK_THEME_REPLACEMENT.scptr();
                }
            }

            return LogicDataTables_getLocationThemeByName(namePtr, data);
        }, 'pointer', ['pointer', 'pointer']));
    }
}