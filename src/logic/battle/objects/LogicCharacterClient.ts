import {LogicGameObjectClient} from "./LogicGameObjectClient";

export class LogicCharacterClient extends LogicGameObjectClient {
    constructor (instance: NativePointer) {
        super (instance)
    }
}