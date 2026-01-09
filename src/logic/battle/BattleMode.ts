import {GameStateManager} from "../../laser/client/state/GameStateManager";
import {Libg} from "../../libs/Libg";

const logicOffset = 40;
const screenOffset = 8;
const clientInputManagerOffset = 88;

export const BattleMode_isInTrainingCave = new NativeFunction(
    Libg.offset(0x0, 0x0), 'bool', ['pointer'] // check upper than "edit_controls_ui"
);

export class BattleMode {
    static getInstance(): NativePointer {
        if (GameStateManager.isState(5)) {
            return GameStateManager.getCurrentState();
        }

        return NULL;
    }

    static getLogic(): NativePointer {
        return this.getInstance().add(logicOffset).readPointer();
    }

    static getScreen(): NativePointer {
        return this.getInstance().add(screenOffset).readPointer();
    }

    static getClientInputManager(): NativePointer {
        return this.getInstance().add(clientInputManagerOffset).readPointer();
    }
}