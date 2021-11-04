import Partitura            from './MusicXML_Classes/Partitura.js';
import Parte                from './MusicXML_Classes/Parte.js';
import Compas               from './MusicXML_Classes/Compas.js';
import {estanCerca, AsuarDur2mxml}     from './MusicXML_Classes/Duracion.js';

let SET_ALTURAS = new Set(["C4","D4","E4","F4","G4"]);
let SET_RITMOS = new Set([
    "C C",
    "N",
    "C S S",
    "S S C",
    "S S S S",
    "B"
   ]);

let SET_RITMOS_COMPUESTOS = new Set([
    "C C C",
    "N C",
    "C N",
    "C C S S",
    "C S S C",
    "S S C C",
    "S S S S C",
    "C S S S S",
    "S S C S S",
    "S S S S S S",
   // "NC",
  //  "BN"
    ])


function cargarDatos(){
    document.getElementById("SetAlturas").value = [...SET_ALTURAS].join(" ");
    document.getElementById("SetRitmos").value = [...SET_RITMOS].toString();
}
window.cargarDatos = cargarDatos;


function cambioRitmos(){
    SET_RITMOS = document.getElementById("SetRitmos").value.split(",");
}
window.cambioRitmos = cambioRitmos;

function cambioAlturas(){
    SET_ALTURAS = new Set(document.getElementById("SetAlturas").value.split(" "));
}
window.cambioAlturas = cambioAlturas;


let esPercusion = false;


function GenerarSolfeo(){
    
    console.log("Generando solfeo")
    //creamos objeto Paritura y agregamos una parte, yun compás
    let partGen = new Partitura();
    partGen.agregarParte(new Parte("1"));
    let duracionesGeneradas;

    for(let compasActual = 0 ; compasActual < parseInt(document.getElementById("cantidadDeCompases").value); compasActual++){
        //generamos un compás con ritmos random
        if (compasActual == 0){
            //partGen.partes[0].compases.push( new Compas(compasActual+1) );
            partGen.partes[0].agregarCompas(new Compas(compasActual+1));

            //establecemos los atributos del compas
            partGen.partes[0].compases[0].atributos.setTimeSig( document.getElementById("tiempos").value,document.getElementById("unidadDeTiempo").value);

            duracionesGeneradas = GenerarCompasRitmico( partGen.partes[0].compases[0].atributos );

            //establecemos si es pentagrama o percusión (1 linea)
            if(esPercusion){
                partGen.partes[0].compases[0].atributos.setClef("percussion");
                partGen.partes[0].compases[0].atributos.setStaffLines(1);
           }else{
                partGen.partes[0].compases[0].atributos.setClef("G");
                partGen.partes[0].compases[0].atributos.setStaffLines(5);
           }

        }else {
            duracionesGeneradas = GenerarCompasRitmico( partGen.partes[0].compases[0].atributos );
            partGen.partes[0].agregarCompas(new Compas(compasActual+1)); 
            
            partGen.partes[0].compases[compasActual].atributos.setTimeSig( document.getElementById("tiempos").value,document.getElementById("unidadDeTiempo").value);

            //establecemos si es pentagrama o percusión (1 linea)
            if(esPercusion){
                partGen.partes[0].compases[compasActual].atributos.setClef("percussion");
                partGen.partes[0].compases[compasActual].atributos.setStaffLines(1);
           }else{
                partGen.partes[0].compases[compasActual].atributos.setClef("G");
                partGen.partes[0].compases[compasActual].atributos.setStaffLines(5);
           }

       }
        //...e ingresamos cada nota en el compás del objeto Partitura
        for(let n = 0 ; n < duracionesGeneradas.length; n++){
            partGen.partes[0].compases[compasActual].agregarNota(cualquiera(Array.from(SET_ALTURAS))+" "+duracionesGeneradas[n]);
        }
    }

    //renderizamos el objeto Partitura
    cargarPartitura(partGen.render(), "test");

    //se agrega el texto en el elemento
    let codeElem = document.getElementById("codigoXML");
    codeElem.innerText = partGen.partes[0].render();
}
window.GenerarSolfeo=GenerarSolfeo;


function GenerarCompasRitmico(atributosDelCompas){
    let duracionComp = atributosDelCompas.duracionCompas;
    let duracionGenerada = 0;

    let indiceInicial = 10;
    let duraciones = [] ;

    while(!estanCerca(duracionComp,duracionGenerada)){

        //verifica si suma de duraciones generadas es mayor o menor q duracion de compas
        //cada iteración crea una nueva lista de ritmos para luego ver si cabe en el compas
        if(duracionComp<duracionGenerada){
            duraciones = GenerarSecuenciaRitmica(--indiceInicial);        
        }else if(duracionComp>duracionGenerada){
            duraciones= GenerarSecuenciaRitmica(++indiceInicial);
        }

        //calcula duracion total para compararla con el compás,
        duracionGenerada = 0;
        for (let dur of duraciones){
            duracionGenerada += AsuarDur2mxml(dur);
        }
    }
    return duraciones;

}

function GenerarSecuenciaRitmica(largo){
    let arr = [];
    let celulas = [];

    //si es un compás simple (2,3,4) entonce usamo ritmos simples
    if( parseInt(document.getElementById("tiempos").value) < 5){
        celulas = Array.from(SET_RITMOS);
    }else{ //...si no, usamo el set de ritmos compuestos
        celulas = Array.from(SET_RITMOS_COMPUESTOS);
    }


    for(let i = 0 ; i < largo ; i ++){
        arr.push(cualquiera(celulas));
    }
    let out = arr.join(" ");
    return out.split(" ");
}


function cualquiera(arreglo){
    let largoArreglo = arreglo.length - 1;
    return arreglo[Math.round(Math.random() * largoArreglo)];
}

function togglePerc(){
    esPercusion = !esPercusion;
}
window.togglePerc= togglePerc;


function cargarPartitura(str, divId = "test") {
    let OSMD = null;
    OSMD = new opensheetmusicdisplay.OpenSheetMusicDisplay(divId, {
        autoResize: true,
        backend: "svg",
        drawTitle: false
    });
    OSMD.load(str).then(() => OSMD.render());
}