import {Libg} from "../../libs/Libg"
import {GenericPopup} from "../flash/gui/GenericPopup"

const SimpleWebview_SimpleWebview = new NativeFunction( // not-so-thicc "popup_news"
    Libg.offset(0x83A5B8, 0x2DC550), 'pointer', []
);

const SimpleWebview_loadUrl = new NativeFunction(
    Libg.offset(0x83A9C4, 0x2DC99C), 'void', [ 'pointer', 'pointer' ]
);

export class SimpleWebview {
    instance: NativePointer;

    constructor() {
        this.instance = SimpleWebview_SimpleWebview();
    }

    loadUrl(url: string) {
        SimpleWebview_loadUrl(this.instance, url.scptr());
    }

    setTitle(title: string) {
        GenericPopup.setTitle(this.instance, title);
    }
}