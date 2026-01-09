import {Libg} from "../../libs/Libg";

const AllianceManager_instance = Libg.offset(0x115DBD8, 0x0);

const AllianceManager_doStartSpectate = new NativeFunction( // "TID_ERROR_SPECTATE_WAITING"
    Libg.offset(0x593708, 0x0), 'void', ['pointer', 'pointer']
);

const AllianceManager_showPopup = new NativeFunction(
    Libg.offset(0x593908, 0xC82B8), 'void', ['pointer']
);

export class AllianceManager {
    static getInstance(): NativePointer {
        return AllianceManager_instance.readPointer();
    }

    static startSpectate(logicLong: NativePointer) {
        AllianceManager_doStartSpectate(this.getInstance(), logicLong);
    }

    static showPopup(popupInstance: NativePointer) {
        AllianceManager_showPopup(popupInstance);
    }
}
