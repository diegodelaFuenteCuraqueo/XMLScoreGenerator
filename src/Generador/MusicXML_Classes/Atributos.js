//import DURACION_FIGURAS    from './Duracion.js';


/* ATRIBUTOS:
 * Define propiedades de la parte (en compás 1),
 * como la armadura, cifra indicadora de compás y duración asignada a la negra
 */
export default class Atributos {
    constructor(beats = "4", beattype = "4", clef = "G", key = "0") {
        this.tags = ["\n<attributes>\n", "\n</attributes>\n"];
        this.divs = ["\n    <divisions>", 512, "</divisions>"];
        this.key = ["\n    <key>\n        <fifths>", key, "</fifths>\n    </key>"];
        this.beatType = beattype;
        this.time = ["\n    <time>\n        <beats>", beats, "</beats>\n        <beat-type>", this.beatType, "</beat-type>\n    </time>\n"];
        this.clef = ["\n    <clef>\n        <sign>", clef, "</sign> \n        <line>2</line> \n    </clef>"];
        this.staffDetails = ["\n   <staff-details>\n        <staff-lines>", "5", "</staff-lines>\n", "    </staff-details>"];
        this.duracionCompas = parseInt(this.time[1]) * parseInt(DURACION_FIGURAS[this.time[3]])
        this.puntosDivisionCompas = [];
        this.puntosDivisionCompas[0] = 0;
        this.calcularPuntosBeats();
    }

    //GETTERS - - - - - - - - - - - - - - - - - - - - - - 
    getDivNegra() {     return this.divs[1];}
    getBeats() {        return this.time[1];}
    getBeatType() {     return this.beatType;}
    getListaPuntos(){   return this.puntosDivisionCompas;}
    getClef(){          return this.clef[1];}

    //SETTERS - - - - - - - - - - - - - - - - - - - - - - -
    setDivisionNegra(dn) {  this.divs[1] = dn;}
    setKey(k) {             this.key[1] = k;}
    setClef(c) {            this.clef[1] = c;}
    setStaffLines(sl) {     this.staffDetails[1] = sl;}
    setTimeSig(beats, type) {
        this.time[1] = beats;
        this.time[3] = type;
        this.calcularPuntosBeats();
    }

    calcularPuntosBeats() {

        this.duracionCompas = parseInt(this.time[1]) * parseInt(DURACION_FIGURAS[this.time[3]]);
        this.puntosDivisionCompas = [];
        this.puntosDivisionCompas[0] = 0;
        console.log("dur: "+this.duracionCompas)
        //es un compás simple??
        if ("234".includes(this.time[1])) {
            console.log("Compas Simple Detectado");
            let duracionUnidadDeTiempo = this.duracionCompas / parseInt(this.time[1]);
            for (let t = 1; t < parseInt(this.time[1]); t++) {
                this.puntosDivisionCompas[t] = parseInt(duracionUnidadDeTiempo * t);
            }
            //es un compás compuesto ???
        } else if ("6-9-12".includes(this.time[1])) {
            console.log("Compas Compuesto Detectado");
            let duracionUnidadDeTiempo = this.duracionCompas / (parseInt(this.time[1]) / 3);
            for (let t = 1; t < (parseInt(this.time[1]) / 3); t++) {
                this.puntosDivisionCompas[t] = parseInt(duracionUnidadDeTiempo * t);
            }
            //ahhh.. es un compás mixto.. ?
        } else if ("5-7-8-10-11".includes(this.time[1])) {

        }
        console.log(" - Puntos beat del compás : "+this.puntosDivisionCompas);
    }

    render() {
        return this.tags[0] + this.divs.join("") + this.key.join("") + this.time.join("") + this.clef.join("") + this.staffDetails.join("") + this.tags[1];

    }
}