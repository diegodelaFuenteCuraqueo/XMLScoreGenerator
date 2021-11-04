
/**  
 * ALTURA
 * puede indicar si hay o no altura (perc) o si es un silencio
 */
export default class Altura {

    static ALTURAS = ["R", "C", "D", "E", "F", "G", "A", "B"];
    static OCTAVAS = ["1", "2", "3", "4", "5", "6", "7", "8"];
    static ALTERACIONES = {
        "W": -1,
        "S": 1,
        "N": 0
    };

    constructor(str) {
        this.str = str.toUpperCase();
        this.esNota = false;
        this.esPerc = false;

        this.alteracion = ["", "", ""];
        this.tags = ["","",""];
        this.step = ["","",""];
        this.oct = ["","",""];

        this.displayStep = ["","",""];
        this.displayOct = ["","",""]

        if (this.str.includes("R") || this.str === "R") {
            this.esNota = false;
            console.log("creando silencio "+this.str+this.esNota)
            this.tags = ["\n  <unpitched>\n", "\n  </unpitched>\n"];
            this.displayStep = ["\n    <display-step>", "E", "</display-step>"]
            this.displayOct = ["\n    <display-octave>", "4", "</display-octave>"]
        } else {
            this.esNota = true;

            //nota+octava
            if (str.length == 2) {

                this.tags = ["\n    <pitch>", "\n    </pitch>\n"];
                this.step = ["\n      <step>", str[0], "</step>"];
                this.oct = ["\n      <octave>", str[1], "</octave>"];

                //nota+alteracion+octava
            } else if (str.length == 3) {
                //falta añadir el tag para la alteracion........ 
                this.tags = ["\n    <pitch>", "\n    </pitch>\n"];
                this.step = ["\n      <step>", this.str[0], "</step>"];
                this.oct = ["\n      <octave>", this.str[2], "</octave>"];
                let alt = Altura.ALTERACIONES[this.str[1]];
                this.alteracion = ["\n        <alter>", alt, "</alter>"];
            }
        }

    }

    //EN caso de ser nota
    setStep(step) {     this.step[1] = step;}
    setOct(oct) {       this.oct[1] = oct;}

    /**
     * 
     * @param {*} b 
     */
    setIsPerc(b) {
        this.esPerc = b;
        if (!b) {
            this.tags = ["\n    <pitch>", "\n    </pitch>\n"];
        } else {
            this.tags = ["\n  <unpitched>\n", "\n  </unpitched>\n"];
            this.displayStep = ["\n    <display-step>", "E", "</display-step>"]
            this.displayOct = ["\n    <display-octave>", "4", "</display-octave>"]
        }
    }
    //en caso de ser silencio
    setDisplayStep(ds) {    this.displayStep[1] = ds;}
    setDisplayOct(disOct) { this.displayOct[1] = disOct;}

    /**
     * 
     * @returns 
     */
    getAltura() {
        if(this.esNota){
            return this.step[1] + this.oct[1]
        }else{
            return this.str;
        }
    }

    /**
     * 
     * @returns 
     */
    render() {
        let stringOut = "";
        if (this.esNota) {
            if(this.esPerc){
                stringOut = this.tags[0] + this.displayStep.join("") + this.displayOct.join("") + this.tags[1];
            }else{
                stringOut = this.tags[0] + this.step.join("") + this.alteracion.join("") + this.oct.join("") + this.tags[1];
            }
        } else {
            stringOut ="\n<rest measure=\"yes\"/>";
        }
        return stringOut;
    }
}
