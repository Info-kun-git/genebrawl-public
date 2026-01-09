import {Libg} from "../../libs/Libg";

const FramerateManager_setSegment = new NativeFunction( // "Battle scope"
    Libg.offset(0xB32968, 0xB82B00), 'void', ['pointer', 'int']
); 

export class FramerateManager {
    static patch() { // Unlock FPS
        Interceptor.replace(FramerateManager_setSegment, new NativeCallback(function(framerateManager, segment) {
            segment = 2;

            FramerateManager_setSegment(framerateManager, segment);
        }, 'void', ['pointer', 'int']));
    }
}
