import Compas       from './Compas.js'


/* PARTE: : - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 *  está asociada a un pentagrama y posee una lista de compases 
 */
export default class Parte {
    constructor(id) {
        this.id = id;
        this.partList = "<part-list>\n<score-part id=\"" + id + "\">\n</score-part>\n</part-list>\n";
        this.tags = ["\n<part id=\"" + id + "\">\n", "\n</part>\n"];
        this.compases = [];
    }

    agregarCompas(comp) {
        this.compases.push(comp);
    }

    render() {
        let todosLosCompases = "";
        for (let comp of this.compases) {
            todosLosCompases += comp.render();
        }

        return this.partList + this.tags[0] + todosLosCompases + this.tags[1];
    }

}