
import {StartLoadingMessage} from "../../logic/message/battle/StartLoadingMessage";
import {Configuration} from "../Configuration";
import {LogicSkinData} from "../../logic/data/LogicSkinData";


// This class was stripped from the public source code, you have to implement it by yourself.
export class SkinChanger {
    static get available() {
        return Configuration.skinChanger;
    }

    public static load(message: StartLoadingMessage) {
        if (!SkinChanger.available)
            return;
    }

    public static patchSelectedSkins(logicDailyData: NativePointer) {

    }

    public static patchTeamEntry(teamMemberEntryArray: NativePointer) {
        if (!SkinChanger.available)
            return;

    }

    public static revertPatches() {

    }

    public static patch() {

    }
}

