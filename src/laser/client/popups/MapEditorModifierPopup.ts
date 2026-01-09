import {Libg} from "../../../libs/Libg";

const MapEditorModifierPopup_ctor = new NativeFunction( // "popup_editor_modifier"
    Libg.offset(0x6A2C00, 0x0), 'pointer', ['pointer']
);

const MapEditorModifierPopup_addModifierItem = new NativeFunction( // in ctor
    Libg.offset(0x6A35A0, 0x0), 'void', ['pointer', 'int']
);

const modifiers: number[] = [
    38
];

export class MapEditorModifierPopup {
    static patch() {
        Interceptor.replace(MapEditorModifierPopup_ctor, new NativeCallback(function (self) {
            MapEditorModifierPopup_ctor(self);

            modifiers.forEach((i) => {
                MapEditorModifierPopup.addModifierItem(self, i);
            });

            return self;
        }, 'pointer', ['pointer']));
    }

    static addModifierItem(self: NativePointer, modifier: number) {
        MapEditorModifierPopup_addModifierItem(self, modifier);
    }
}
