
/* DURACION: - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Indica duracion y grupos irregulares. 
 * Requiere el valor de división de negra del objeto  Atributos (compás 1).
 */
export default class Duracion {

    constructor(...args) {

        this.divNegra = 512; 
        this.duracion = [];
        this.type = [];
        this.grupoIrregular = ["<time-modification>","\n<actual-notes>", "3", "</actual-notes>", "\n<normal-notes>", 2, "</normal-notes>", "\n<normal-type>", "eighth","</normal-type>", "\n</time-modification>"]
        this.esGrupoIrregular = false;

        this.durValues = {
            "whole": 512 * 4,
            "half": 512 * 2,
            "quarter": 512,
            "eighth": 256,
            "16th": 128,
            "32th": 64,
            "64th": 32
        };

        if (args.length == 2) {
            this.duracion = ["    <duration>", args[0], "</duration>"];
            this.type = ["    <type>", getKeyByValue(this.durValues, args[0]), "</type>"]
            this.inferirTipo();
        } else if (args.length == 1) {
            let AsuarDuracion = args[0];
            //console.log("asuarduracion "+AsuarDuracion); 
            //es una sola figura
            if (AsuarDuracion.length == 1) {
                let valor = AsuarDur2mxml(AsuarDuracion);

                this.duracion = ["    <duration>", valor, "</duration>"];
                this.type = ["    <type>", getKeyByValue(this.durValues, parseInt(AsuarDur2mxml(AsuarDuracion))), "</type>"]
            } else {

                //es un silencio?
                if (AsuarDuracion.includes("-")) {
                    //pendiente...        

                } else {

                }
            }

        }

        //        console.log(this.duracion[1], this.type[1]);
    }

    /**
     * 
     * @param {*} dn 
     */
    setDivisionNegra(dn) {
        this.divNegra = dn;
        this.calcularValores(dn);
    }

    setNota(){
    
    }

    setDuration(d) {    this.duracion[1] = d;}
    setType(t) {        this.type[1] = t;   }

    getDuracion() {     return this.duracion[1]}
    getType() {         return this.type[1];    }

    /**
     * 
     * @returns 
     */
    render() {
        return "\n" + this.duracion.join("") + "\n" + this.type.join("") + "\n";
    }

    /**
     * 
     */
    inferirTipo() {
        this.type[1] = getKeyByValue(this.durValues, parseInt(this.duracion[1]));
    }

    llevaPlica() {
        if (this.durValues[this.type[1]] < 511) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 
     * @param {*} divisionNegra 
     */
    calcularValores(divisionNegra) {
        let divNegra = typeof(divisionNegra) == "string" ? parseFloat(divisionNegra) : divisionNegra;

        this.durValues = {
            "whole": divNegra * 4,
            "half": divNegra * 2,
            "quarter": divNegra,
            "eighth": divNegra / 2,
            "16th": divNegra / 4,
            "32th": divNegra / 8,
            "64th": divNegra / 16
        };

        this.setDuration(this.durValues[this.getType()]);
    }
}

/**
 * 
 */
export let DURACION_FIGURAS = {
    "1": 2048,
    "2": 1024,
    "4": 512,
    "8": 256,
    "16": 128,
    "32": 64,
    "64": 32,
    "128": 16
}
window.DURACION_FIGURAS = DURACION_FIGURAS;

/**
 * 
 */
export let ASUAR_RITMOS = {
    "R": "2048",
    "B": "1024",
    "N": "512",
    "C": "256",
    "S": "128",
    "M": "64",
    "X": "127"
};

/**
 * 
 * @param {*} AsuarDur 
 * @returns 
 */
export function AsuarDur2mxml(AsuarDur) {

    if (AsuarDur.length == 1) {
        //console.log("
        return parseInt(ASUAR_RITMOS[(AsuarDur.toUpperCase())]);
    } else {
        let duracionTotal = 0;
        for (let i = 0; i < AsuarDur.length; i++) {
            duracionTotal += parseInt(ASUAR_RITMOS[AsuarDur[i].toUpperCase()]);
        }
        return duracionTotal;
    }
}

/**
 * 
 * @param {*} val1 
 * @param {*} val2 
 * @returns 
 */
export function estanCerca(val1, val2) {
    if (Math.abs(val1 - val2) < 4) {
        return true;
    } else {
        return false;
    }
}
window.estanCerca = estanCerca;

export function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}
