/* GENERADOR DE PARTITURAS MusicXML
 * 
 * Cada uno de los objetos posee un metodo render() que sigue una lógica parecida a React,
 * estos "componentes" generan una especie de musicxml virtual que es renderizador.
 * El retorno de cada render() es realmente un string con el elemento xml
 *
 * Diego de la Fuente Curaqueo
 * 2021
 */
const DIVISION_NEGRA = 512;

let cabecera = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<!DOCTYPE score-partwise PUBLIC \"-//Recordare//DTD MusicXML 3.1 Partwise//EN\" \"http://www.musicxml.org/dtds/partwise.dtd\">\n\n\n<score-partwise version=\"3.1\">\n\n\n";

export   function cargarPartitura(str, divId = "test") {
    let OSMD = null;
    OSMD = new opensheetmusicdisplay.OpenSheetMusicDisplay(divId, {
        autoResize: true,
        backend: "svg",
        drawTitle: false
    });
    OSMD.load(str).then(() => OSMD.render());
}
window.cargarPartitura = cargarPartitura;
