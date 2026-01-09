import {Libg} from "../../libs/Libg";
import {TextField} from "./TextField";

const MovieClipHelper_autoAdjustChildTexts = new NativeFunction( // "TID_SETTINGS_BUTTON_WECHAT_LOGIN", then function lower with 4 args 
    Libg.offset(0x928988, 0x0), 'void', [ 'pointer', 'bool', 'bool', 'bool' ]
);

const MovieClipHelper_autoAdjustText = new NativeFunction( // In MovieClipHelper::autoAdjustChildTexts, first function in loop.
    Libg.offset(0x927B1C, 0x0), 'void', ['pointer', 'bool', 'bool', 'bool']
);

const MovieClipHelper_setTextAndScaleIfNecessary = new NativeFunction( // under "TID_BATTLE_END_WAITING"
    Libg.offset(0x927CFC, 0x0), 'void', [ 'pointer', 'pointer', 'bool', 'bool' ]
);

export class MovieClipHelper {
    static autoAdjustChildTexts(movieClip: NativePointer) {
        MovieClipHelper_autoAdjustChildTexts(movieClip, 1, 0, 1);
    }

    static autoAdjustText(textField: TextField) {
        MovieClipHelper_autoAdjustText(textField.instance, 0, 1, 1);
    }

    static setTextAndScaleIfNecessary(textField: TextField, text: string) {
        MovieClipHelper_setTextAndScaleIfNecessary(textField.instance, text.scptr(), 0, 0);
    }
}