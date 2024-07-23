class Marionette {
    constructor() {
        this.charmap = ["▌", "▖", "▘"];
        this.decodemap = ["▖", "▘", "▌"];

        this.validModes = ["s", "c", "h", "d", "l"];

        this.output = [];

        this.eMode = "s";
        this.dMode = "s";
    }

    switchMode(decodeEncode, mode) {
        let M = this.validModes.indexOf(mode);
        if (M === -1) return -2;

        if (decodeEncode === "d") {
            if (mode === "l") return this.dMode;
            this.dMode = mode;
            return mode;
        } else if (decodeEncode === "e") {
            if (mode === "l") return this.eMode;
            this.eMode = mode;
            return mode;
        } else {
            return -1;
        }
    }

    DecToDollcode(input) {
        let intermediate = [];
        let multiplier = parseInt(input);

        while (multiplier >= 1) {
            let mod = multiplier % 3;

            if (mod === 0) {
                multiplier = (multiplier - 3) / 3;
            } else {
                multiplier = (multiplier - mod) / 3;
            }

            intermediate.push(this.charmap[mod]);
        }

        return intermediate.reverse().join("");
    }

    CharToDollcode(input) {
        return this.DecToDollcode(input.charCodeAt(0));
    }

    HexToDollcode(input) {
        return this.DecToDollcode(parseInt(input, 16));
    }

    DecodeToDec(input) {
        this.output = [];
        let result = [];
        let block = [];
        let decode = input.split("");

        decode.forEach(d => {
            block.push(String(this.decodemap.indexOf(d) + 1));
        });

        let fixedblock = block.reverse();
        let p = 0;
        let dec = 0;

        fixedblock.forEach(f => {
            dec += Math.pow(3, p) * parseInt(f);
            p += 1;
        });

        result.push(dec);
        return result[0];
    }

    DecodeToChar(input) {
        return String.fromCharCode(this.DecodeToDec(input));
    }

    DecodeToHex(input) {
        let intermediate = this.DecodeToDec(input).toString(16);
        return intermediate;
    }

    DecodeToString(input) {
        this.output = [];
        let operand = input.split(" ");
        let result = [];
        let block = [];

        operand.forEach(o => {
            let decode = o.split("");
            decode.forEach(d => {
                block.push(String(this.decodemap.indexOf(d) + 1));
            });

            let fixedblock = block.reverse();
            let p = 0;
            let dec = 0;

            fixedblock.forEach(f => {
                dec += Math.pow(3, p) * parseInt(f);
                p += 1;
            });

            result.push(String.fromCharCode(dec));
            block = [];
        });

        return result.join("");
    }

    encode(input) {
        this.output = [];

        if (this.eMode === "d") {
            return this.DecToDollcode(input);
        } else if (this.eMode === "h") {
            return this.HexToDollcode(input);
        } else if (this.eMode === "c") {
            return this.CharToDollcode(input);
        } else {
            input.split("").forEach(o => {
                this.output.push(this.CharToDollcode(o));
                this.output.push(" ");
            });

            return this.output.join("");
        }
    }

    decode(input) {
        if (this.dMode === "d") {
            return this.DecodeToDec(input);
        } else if (this.dMode === "c") {
            return this.DecodeToChar(input);
        } else if (this.dMode === "h") {
            return this.DecodeToHex(input);
        } else {
            return this.DecodeToString(input);
        }
    }
}
