import { FigureData } from "../types/FigureData";
import Figure from "./figure";

class Ellipse extends Figure {
    constructor( data: FigureData ) {
        super( data );

        const R = Math.min( this.figureWidth, this.figureHeight ) / 2 
        this.surfaceArea = Math.floor( Math.PI * Math.pow( R, 2 ) );

        this.beginFill( this.fillColor );
        this.lineStyle( this.borderWidth, this.borderColor );
        this.drawCircle( 0, 0, R );
        this.endFill();
    }
}

export default Ellipse;