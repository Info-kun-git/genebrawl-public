import {Libg} from "../../../libs/Libg";

const CSVRow_getName = new NativeFunction( // "IconSWF" in LogicData::setCSVRow last func
    Libg.offset(0x0, 0x0), 'pointer', ['pointer']
);

export class CSVRow {
    static getName(csvRow: NativePointer): NativePointer {
        return CSVRow_getName(csvRow);
    }
}
