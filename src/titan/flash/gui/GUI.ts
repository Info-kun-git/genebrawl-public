import {RGBA} from "../../../gene/features/RGBA";
import {Libg} from "../../../libs/Libg";
import {DisplayObject} from "../DisplayObject";

const GUI_instance = Libg.offset(0x115DB78, 0xEC2908); // "TID_TEAM_SEARCH_NO_TEAM_CODE"

const GUI_showFloaterText = new NativeFunction( // "TID_TEAM_SEARCH_NO_TEAM_CODE"
    Libg.offset(0x56488C, 0xA4984), 'void', ['pointer', 'pointer', 'int', 'float']
); 

const GUI_showPopup = new NativeFunction( // "TID_TEAM_AD_JOIN_FAIL_ALREADY_IN_A_TEAM" function higher
    Libg.offset(0x5653D4, 0xA509C), 'void', ['pointer', 'pointer', 'bool', 'bool', 'bool']
);

const GUI_getTopPopup = new NativeFunction( // "TID_TEAM_MEMBER_LEFT_%i" function higher
    Libg.offset(0x0, 0x0), 'pointer', ['pointer']
);

const GUI_closeAllPopups = new NativeFunction( // "Got team: %i,%i", then last function in (down)
    Libg.offset(0x565DE0, 0xA5750), 'void', ['pointer']
); 

const GUI_resizeToScreenHeight = new NativeFunction( // TODO
    Libg.offset(0x0, 0x0), 'void', [ 'pointer' ]
);

export class GUI {
    static get instance(): NativePointer {
        return GUI_instance.readPointer();
    }

    static patch() {
        Interceptor.replace(GUI_showFloaterText, new NativeCallback(function(self, text, unk, unk2) {
            if (self.isNull()) {
                console.warn("GUI::showFloaterText", "GUI = null! SC moment.")
                return;
            }

            GUI_showFloaterText(self, text, unk, unk2);
        }, 'void', ['pointer', 'pointer', 'int', 'float']));
    }
    
    static showFloaterText(text: string, color: number = RGBA.white) {
        let instance = this.instance;

        if (instance.isNull())
            return;
        
        GUI_showFloaterText(instance, text.scptr(), color, -1); // -1 = invisible text
    }

    static showPopup(instance: NativePointer, a1: number, a2: number, a3: number) {
        GUI_showPopup(this.instance, instance, a1, a2, a3)
    }

    static closeAllPopups() {
        GUI_closeAllPopups(this.instance);
    }

    static getTopPopup(): NativePointer {
        let instance = this.instance;
        if (instance.isNull())
            return NULL;

        return GUI_getTopPopup(instance);
    }

    static resizeToScreenHeight(object: DisplayObject) {
        GUI_resizeToScreenHeight(object.instance);
    }
}
