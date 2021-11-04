import Altura       from './Altura.js';
import Duracion     from './Duracion.js';

/*  NOTA:: - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  se compone de dos objetos esenciales: 
 *  una duración y una altura
 */
export default class Nota {

    constructor(notaDuracion) {
        this.notaDur = notaDuracion.split(" ");
        this.tags = ["\n  <note>", "  </note>\n"];
        this.altura = new Altura(this.notaDur[0]);
        this.duracion = new Duracion(this.notaDur[1]);
        this.llevaPlica = this.duracion.llevaPlica();
        if (this.duracion.llevaPlica()) {
            this.beam = ["\n        <beam number=\"" + 1 + "\">", "continue", "</beam>\n"];
        } else {
            this.beam = ["", "", ""];
        }

        this.puntoInicio = 0;
        console.log("Creando Nota: " + this.altura.getAltura() + " " + this.duracion.getDuracion() + " " + this.duracion.getType())
    }

    //GETTERS - - - - - - - - - - - - - - - - - - - -  - - - - - 
    getDur() {  return this.duracion.getDuracion();}
    getAlt() {  return this.altura.getAltura();}

    //SETTERS - - - - - - - - - - - - - - - - - - - - - - - - - -
    /**
     * 
     * @param {*} dn 
     */ 
    setDivisionNegra(dn) {  this.duracion.setDivisionNegra(dn);}

    /**
     * 
     * @param {*} p 
     */
    setPuntoInicio(p) {     this.puntoInicio = p;}

    /**
     * 
     * @param {*} str 
     */
    setBeam(str) {          this.beam = ["\n        <beam number=\"" + 1 + "\">", str, "</beam>\n"];}

    /**
     * 
     * @returns 
     */
    render() {
        return this.tags[0] + this.altura.render() + this.duracion.render() + this.beam.join("") + this.tags[1];
    }
}
