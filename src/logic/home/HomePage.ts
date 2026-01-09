import {Libg} from "../../libs/Libg";
import {PopupBase} from "../../titan/flash/gui/PopupBase";

const HomePage_startGame = new NativeFunction( // "TID_EXTRACTION_NOT_ENOUGH_TROPHIES_TO_BET" / "TID_SHUTDOWN_BATTLE_DISABLED"
    Libg.offset(0x897328, 0x0), 'void', ['pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer']
);

export class HomePage {
    static patch() {
        this.patchBackground();
        this.patchStartGame();
    }

    private static patchStartGame() {
        Interceptor.replace(HomePage_startGame, new NativeCallback(function (a1, a2, a3, a4, a5, a6, a7, a8, a9) {
            if (false) // i'll just leave this, may be useful for those who want to enable offline battles
                a4 = ptr(3);

            HomePage_startGame(a1, a2, a3, a4, a5, a6, a7, a8, a9);
        }, 'void', ['pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer']));
    }

    private static patchBackground() {
        PopupBase.patch();
    }
}
