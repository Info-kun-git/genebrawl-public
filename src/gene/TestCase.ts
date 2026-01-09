import {GUI} from "../titan/flash/gui/GUI";
import {INativeDialogListener} from "../titan/utils/INativeDialogListener";
import {NativeDialog} from "../titan/utils/NativeDialog";
import {RGBA} from "./features/RGBA";

const libc = Module.getGlobalExportByName('opendir');
const readdir = Module.getGlobalExportByName('readdir');
const closedir = Module.getGlobalExportByName('closedir');

export class TestCase {
    static async doCase() {

    }

    static test() {

    }

    static dialogListener: INativeDialogListener = new INativeDialogListener(TestCase.listenerTest);

    static nativeDialogListenerTest() {
        NativeDialog.showNativeDialog(TestCase.dialogListener, "Hello world!", "Press da button", "guacamole", "bomb", 'penis');
    }

    static listenerTest(listener: NativePointer, buttonIndex: number) {
        GUI.showFloaterText("You pressed on " + buttonIndex + "!", RGBA.green);
    }
}
