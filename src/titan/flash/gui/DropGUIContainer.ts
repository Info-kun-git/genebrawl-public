import {Libc} from "../../../libs/Libc";
import {Libg} from "../../../libs/Libg";
import {ResourceManager} from "../../ResourceManager";
import {MovieClip} from "../MovieClip";
import {Sprite} from "../Sprite";
import {GameButton} from "./GameButton";

const allocSize = 250;

const movieClipOffset = 112;

const GUIContainer_ctor = new NativeFunction( // "buttons_yoozoo" (DropGUIContainer ctor)
    Libg.offset(0x56BCD0, 0x0), 'void', ['pointer', 'pointer']
);

const GUIContainer_setText = new NativeFunction( // "TID_CONFIRM_GEAR_DIRECT_PURCHASE_TITLE"
    Libg.offset(0x0, 0x0), 'void', ['pointer', 'pointer', 'pointer']
);

const DropGUIContainer_addGameButton = new NativeFunction( // "bcheck"
    Libg.offset(0x56C4C8, 0x0), 'pointer', ['pointer', 'pointer', 'bool']
);

export class DropGUIContainer extends Sprite {
    protected movieClip!: MovieClip;

    constructor(scName: string | NativePointer, exportName?: string) {
        if (exportName) {
            scName = scName as string;

            let instance = Libc.malloc(allocSize);

            GUIContainer_ctor(instance, ResourceManager.getMovieClip(scName, exportName).instance);

            super(instance);
        }
        else {
            super(scName as NativePointer);
        }

        if (!this.instance.add(movieClipOffset).readPointer().isNull()) {
            this.movieClip = new MovieClip(
                this.instance.add(movieClipOffset).readPointer()
            );
        }
        else if (exportName) {
            scName = scName as string;
            this.movieClip = ResourceManager.getMovieClip(scName, exportName);
        }
    }

    getMovieClip(): MovieClip {
        if (!this.movieClip) {
            this.movieClip = new MovieClip(
                this.instance.add(movieClipOffset).readPointer()
            );
        }

        return this.movieClip;
    }

    static getMovieClip(instance: NativePointer): MovieClip {
        return new MovieClip(
            instance.add(movieClipOffset).readPointer()
        );
    }

    setTitle(txt: string) {
        this.setText("title", txt);
    }

    setText(field: string, txt: string) {
        GUIContainer_setText(this.instance, field.ptr(), txt.scptr());
    }

    addGameButton(name: string, bool: boolean) {
        return new GameButton(
            DropGUIContainer_addGameButton(this.instance, name.ptr(), Number(bool))
        );
    }
}
