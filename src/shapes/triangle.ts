import { FigureData } from "../types/FigureData";
import Figure from "./figure";

class Triangle extends Figure {

    constructor( data: FigureData ) {
        super( data );

        this.surfaceArea = Math.floor( this.figureWidth * this.figureHeight / 2 );
        
        this.beginFill( this.fillColor );
		this.lineStyle( this.borderWidth, this.borderColor );
		this.moveTo( 0, -this.figureHeight / 2 );
		this.lineTo( this.figureWidth / 2, this.figureHeight / 2 );
		this.lineTo( -this.figureWidth / 2, this.figureHeight / 2 );
		this.lineTo( 0, -this.figureHeight / 2 );		
		this.endFill();
    }
}

export default Triangle;