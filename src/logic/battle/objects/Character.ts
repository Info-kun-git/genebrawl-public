import {Configuration} from "../../../gene/Configuration";
import {Libg} from "../../../libs/Libg";
import {GameObject} from "./GameObject";
import {LogicCharacterClient} from "./LogicCharacterClient";

const Character_updateHealthBar = new NativeFunction(
    Libg.offset(0x4D9C50, 0x0), 'void', ['pointer', 'float'] // "hpNumber"
);

const ImpostorMaterial_bind = new NativeFunction(
    Libg.offset(0x0, 0x0), 'void', [ 'pointer', 'int', 'pointer' ]
)

// setaddcolor 0x912FB0 setmulcolor 0x912F2C

const ammoBarOffset = 2568;

export class Character extends GameObject {
    constructor(instance: NativePointer) {
        super(instance)
    }

    getLogicCharacter() {
        return new LogicCharacterClient(
            this.getGameObject().getLogic()
        );
    }

    toString() {
        const logicCharacter = this.getLogicCharacter(); // For test

        return `Character(index=${logicCharacter.getPlayerIndex()})`;
    }

    static patch() {
        Interceptor.replace(ImpostorMaterial_bind, new NativeCallback((material, type, value) => {
            if (!Configuration.drawOutline) {
                material.add(868).writeInt(5)
            }

            ImpostorMaterial_bind(material, type, value)
        }, 'void', ['pointer', 'int', 'pointer']))

        Interceptor.replace(Character_updateHealthBar, new NativeCallback(function(character, time) {
            Character_updateHealthBar(character, time)

            if (Configuration.showEnemyAmmo) {
                const ammoBar = character.add(ammoBarOffset).readPointer();
                if (!ammoBar.isNull())
                    ammoBar.add(Process.pointerSize).writeU8(1);
            }
        }, 'void', ['pointer', 'float']));
    }
}
