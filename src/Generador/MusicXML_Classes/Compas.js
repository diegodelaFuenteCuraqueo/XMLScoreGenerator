import Atributos    from './Atributos.js';
import Nota         from './Nota.js';
 import {estanCerca}   from './Duracion.js';

/**  
 *  COMPAS:
 *  incluye una lista de notas y un numeroDeCompás
 */
export default class Compas {
    constructor(numeroDeCompas) {
        this.numeroDeCompas = numeroDeCompas;
        this.atributos = new Atributos();
        this.tags = ["\n<measure number=\"" + numeroDeCompas + "\">\n", "</measure>\n\n"];
        this.notas = [];
        this.duracionTotalNotas = 0;
        console.log("Creando compás: " + this.numeroDeCompas + " " + this.atributos.getBeats() + "/" + this.atributos.getBeatType());
    }

    /**
     * 
     * @param {*} n 
     */
    agregarNota(n) {
        this.notas.push(new Nota(n));
        for (let n = 0; n < this.notas.length; n++) {

            if (n == 0) {
                this.notas[n].setPuntoInicio(0);
            } else {
                let ini = parseInt(this.notas[n - 1].getDur()) + this.notas[n - 1].puntoInicio;
                this.notas[n].setPuntoInicio(ini);
            }
        }
        this.notas[this.notas.length - 1].setPuntoInicio(this.duracionTotalNotas);
        this.duracionTotalNotas += parseInt(this.notas[this.notas.length - 1].getDur());

        if(this.atributos.clef[1]=="percussion"){
            this.notas[this.notas.length-1].altura.setIsPerc(true);
        }else{
            this.notas[this.notas.length-1].altura.setIsPerc(false);
        }

        this.agruparPlicas();
    }

    /**
     * 
     */
    agruparPlicas() {
        let ind = 0;
        //for (let note of this.notas) {
        for(let i = 0; i < this.notas.length-1; i++){
            //la nota lleva plica dada su duración
            if (this.notas[i].duracion.llevaPlica()) {

                //..verificamos si coincide con un tiempo fuerte del compás
                for (let tiempo of this.atributos.getListaPuntos()) {

                    //.. si está cerca algún tiempo fuerte
                    if (estanCerca(this.notas[i].puntoInicio, tiempo) ) {
                        //note.setBeam("begin");

                        if(ind<this.notas.length-2 && !this.notas[i+1].altura.esNota){
                            this.notas[i].setBeam("end");
                        }else if (ind<this.notas.length-2 && this.notas[i+1].duracion.llevaPlica() ){
                            this.notas[i].setBeam("begin");
                        }else{
                            this.notas[i].setBeam("begin");
                        }

                        if (ind > 0) {
                            if (this.notas[i - 1].duracion.llevaPlica()) {
                                this.notas[i - 1].setBeam("end");
                            }
                        }

                    //está lejos de cualquier punto fuerte
                    }else{
                        
                        if(ind > 0 && ind < this.notas.length-2){
                            //si la nota anterior es un silencio y la nota siguiente lleva plica 
                            if(!this.notas[i-1].altura.esNota && this.notas[i+1].duracion.llevaPlica()  && this.notas[i+1].altura.esNota){
                                this.notas[i].setBeam("begin");

                            //si la nota siguiente es un silencio
                            }else if ( !this.notas[i+1].altura.esNota){
                                this.notas[i].setBeam("end");
                                //si está rodeada de silencios
                                if( !this.notas[i-1].altura.esNota){
                                    this.notas[i].setBeam("end");
                                }
                            }else{


                            } 
                        }
                    }
                }

            }

            ind++;
        }

    }

    /**
     * 
     * @returns 
     */
    render() {
        let todasLasNotas = "";

        for (let note of this.notas) {
            todasLasNotas += note.render();
        }
        
       if(parseInt(this.numeroDeCompas) === 1){
            return this.tags[0] + this.atributos.render() + todasLasNotas + this.tags[1];
        }else{

            return this.tags[0]  + todasLasNotas + this.tags[1];
        }
    }

}
