import {Libg} from "../../../libs/Libg";

const GameStateManager_instance = Libg.offset(0x115DB78, 0x0);

const currentStateOffset = 32;
const currentStateIdOffset = 40;
const changingStateOffset = 44;

export class GameStateManager {
    static getCurrentState(): NativePointer {
        return this.instance.add(currentStateOffset).readPointer();
    }

    static get instance(): NativePointer {
        return GameStateManager_instance.readPointer();
    }

    static isState(stateId: number): boolean {
        return this.instance.add(currentStateIdOffset).readInt() == stateId;
    }

    static isBattleMode(): boolean {
        return this.isState(5);
    }

    static isHomeMode(): boolean {
        return this.isState(4);
    }
}