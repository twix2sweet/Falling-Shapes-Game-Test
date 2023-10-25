import { FigureData } from "../types/FigureData";
import Figure from "./figure";

class Rectangle extends Figure {

    constructor( data: FigureData ) {
        super( data );

        this.surfaceArea = Math.floor( this.figureWidth * this.figureHeight );

        this.beginFill( this.fillColor );
        this.lineStyle( this.borderWidth, this.borderColor );
        this.drawRect( -this.figureWidth / 2, -this.figureHeight / 2, this.figureWidth, this.figureHeight );
		this.endFill();
    }
}

export default Rectangle;