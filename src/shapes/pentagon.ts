import { FigureData } from "../types/FigureData";
import Figure from "./figure";

class Pentagon extends Figure {

    constructor( data: FigureData ) {
        super( data );
        
        const R = Math.min( this.figureWidth, this.figureHeight ) / 2;
        const r = 0.80901699 * R;
        this.surfaceArea = Math.floor( 5 / 2 * Math.pow( R, 2) * Math.sin( 72 ) );

        this.beginFill( this.fillColor );
        this.lineStyle( this.borderWidth, this.borderColor );
        this.drawStar( 0, 0, 5, R, r );
		this.endFill();
    }
}

export default Pentagon;