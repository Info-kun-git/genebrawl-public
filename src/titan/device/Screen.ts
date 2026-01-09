import {Libg} from "../../libs/Libg";

const Screen_getWidth = new NativeFunction( // ios: "screenWidth" | %s?time=%d
    Libg.offset(0xB3853C, 0x0), 'float', []
);
const Screen_getHeight = new NativeFunction( // ios: "screenHeight" | %s?time=%d
    Libg.offset(0xB38548, 0x0), 'float', []
);

export class Screen {
    static getWidth(): number {
        return Screen_getWidth();
    }

    static getHeight(): number {
        return Screen_getHeight();
    }

    static toString() {
        return `Screen(width=${Screen.getWidth()}, height=${Screen.getHeight()})`;
    }
}
