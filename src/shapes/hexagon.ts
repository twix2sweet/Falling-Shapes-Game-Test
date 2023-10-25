import { FigureData } from "../types/FigureData";
import Figure from "./figure";

class Hexagon extends Figure {

    constructor( data: FigureData ) {
        super( data );
        
        const R = Math.min( this.figureWidth, this.figureHeight ) / 2;
        const r = 0.8660254 * R;
        this.surfaceArea = Math.floor( 6 * ( Math.sqrt(3) / 4 ) * Math.pow( R, 2 ) );
        
        this.beginFill( this.fillColor );
        this.lineStyle( this.borderWidth, this.borderColor );
        this.drawStar( 0, 0, 6, R, r );
		this.endFill();
    }
}

export default Hexagon;