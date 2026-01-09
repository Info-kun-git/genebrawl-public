import {Libc} from "../../libs/Libc";
import {Libg} from "../../libs/Libg";
import {DisplayObject} from "./DisplayObject";
import {Sprite} from "./Sprite";

const dragHandlerOffset = 192;
const dragHandlerAlignmentOffset = 392;
const dragHandlerPinchingOffset = 398;
const horizontalDragOffset = 200;
const verticalDragOffset = 199;
const unknownOffset = 664;

const updateVtableOffset = 43 * Process.pointerSize;

const ScrollArea_ctor = new NativeFunction( // friends_info_kr
    Libg.offset(0x9A61AC, 0x0), 'void', ['pointer', 'float', 'float', 'int']
);

const ScrollArea_removeAllContent = new NativeFunction( // "emote_config_item"
    Libg.offset(0x9A666C, 0x0), 'void', ['pointer']
);

const ScrollArea_addContent = new NativeFunction( // "TID_MAP_EDITOR_MODIFIERS_TITLE" -> MapEditorModifierPopup::addModifierItem
    Libg.offset(0x9A661C, 0x0), 'void', ['pointer', 'pointer']
);

const ScrollArea_scrollTo = new NativeFunction( // "MovieClipHelper::scrollItemToVisibleArea item not in scroll area content" last func
    Libg.offset(0x0, 0x0), 'void', ['pointer', 'float', 'float', 'float', 'float']
);

export class ScrollArea extends Sprite {
    private readonly updateFunc: NativeFunction<void, [NativePointerValue, number]>;

    constructor(width: number, height: number, unk: number) {
        let instance = Libc.malloc(800);
        ScrollArea_ctor(instance, width, height, unk);

        super(instance);

        this.updateFunc = new NativeFunction(this.vtable.add(updateVtableOffset).readPointer(), 'void', ['pointer', 'float']);
    }

    addContent(content: DisplayObject | NativePointer) {
        ScrollArea_addContent(this.instance, content instanceof DisplayObject ? content.instance : content);
    }

    setUnk(unk: boolean) {
        this.instance.add(unknownOffset).writeU8(Number(unk));
    }

    enablePinching(pinching: boolean) {
        this.instance.add(dragHandlerOffset).add(dragHandlerPinchingOffset).writeU8(Number(pinching));
    }

    enableHorizontalDrag(state: boolean) {
        this.instance.add(horizontalDragOffset).writeU8(Number(state));
    }

    enableVerticalDrag(state: boolean) {
        this.instance.add(verticalDragOffset).writeU8(Number(state));
    }

    setAlignment(alignment: number) {
        this.instance.add(dragHandlerOffset).add(dragHandlerAlignmentOffset).writeInt(alignment);
    }

    scrollTo(a1: number, a2: number, a3: number, a4: number) {
        ScrollArea_scrollTo(this.instance, a1, a2, a3, a4);
    }

    update(deltaTime: number) {
        this.updateFunc(this.instance, deltaTime);
    }

    removeAllContent() {
        ScrollArea_removeAllContent(this.instance);
    }
}