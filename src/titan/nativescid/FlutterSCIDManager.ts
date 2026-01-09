import {Libg} from "../../libs/Libg";

const FlutterSCIDManager_instance = Libg.offset(0x115E610, 0x0); // Server didn't reply to to the LoginMessage

const FlutterSCIDManager_openWindow = new NativeFunction(
    Libg.offset(0xBB49E4, 0x0), 'void', ['pointer', 'pointer'] // "scid_button_tutorial"
);

export class FlutterSCIDManager {
    static get instance(): NativePointer {
        return FlutterSCIDManager_instance.readPointer();
    }

    static openWindow(window: string): void {
        FlutterSCIDManager_openWindow(this.instance, window.scptr());
    }
}