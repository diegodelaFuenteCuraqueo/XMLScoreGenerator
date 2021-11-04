
export default class Partitura {
    constructor() {
        this.partes = [];

        this.cabecera = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<!DOCTYPE score-partwise PUBLIC \"-//Recordare//DTD MusicXML 3.1 Partwise//EN\" \"http://www.musicxml.org/dtds/partwise.dtd\">\n<score-partwise version=\"3.1\">";
        this.foter = "</score-partwise>";
    }

    agregarParte(p) {
        this.partes.push(p);
    }

    render() {
        let parts;
        for (let p of this.partes) {
            parts += p.render();
        }
        return this.cabecera + parts + this.foter;
    }
}
