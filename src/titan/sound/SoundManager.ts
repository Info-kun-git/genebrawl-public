import {Libg} from "../../libs/Libg";

const SoundManager_instance = Libg.offset(0x115EC28, 0xEC2E90); // "stopMusic" string, then qword in xref

const SoundManager_playMusic = new NativeFunction( // "Trying to play disabled music %s"
    Libg.offset(0x8E2ED8, 0x35B548), 'void', ['pointer', 'pointer']
);

export class SoundManager {
    static get instance(): NativePointer {
        return SoundManager_instance.readPointer();
    }

    static playMusic(musicData: NativePointer) {
        SoundManager_playMusic(this.instance, musicData);
    }
}