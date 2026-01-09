import {MovieClip} from "../MovieClip";
import {Sprite} from "../Sprite";
import {IButtonListener} from "./IButtonListener";

const setMovieClipVtableOffset = 45 * Process.pointerSize;
const buttonListenerOffset = 168;

export class CustomButton extends Sprite {
    protected buttonListener?: IButtonListener;

    constructor(instance: NativePointer) {
        super(instance);
    }

    setMovieClip(movieClip: MovieClip | NativePointer): void {
        let setMovieClipVtable = new NativeFunction(
            this.instance.readPointer().add(setMovieClipVtableOffset).readPointer(), 'void', ['pointer', 'pointer', 'bool']
        );

        setMovieClipVtable(this.instance, movieClip instanceof MovieClip ? movieClip.instance : movieClip, 1);
    }

    setButtonListener(listener: IButtonListener | NativePointer) {
        if (listener instanceof IButtonListener)
            this.buttonListener = listener as IButtonListener;

        this.instance.add(buttonListenerOffset).writePointer(
            listener instanceof IButtonListener ? (listener as IButtonListener).instance : listener
        );
    }
}