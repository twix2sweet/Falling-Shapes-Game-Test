import { FigureData } from "../types/FigureData";
import Figure from "./figure";

class Star extends Figure {

    constructor( data: FigureData ) {
        super( data );
        
        this.surfaceArea = Math.floor( ( 10 *  Math.tan( Math.PI / 10 ) ) / ( 3 - Math.pow( Math.tan( Math.PI / 10 ), 2 ) ) * Math.pow( this.figureWidth / 2, 2 ) );

        this.beginFill( this.fillColor );
        this.lineStyle( this.borderWidth, this.borderColor );
        this.drawStar( 0, 0, 5, this.figureWidth / 2 , this.figureWidth / 4 );
		this.endFill();
    }
}

export default Star;