import { FigureData } from "../types/FigureData";
import Figure from "./figure";

class Ellipse extends Figure {
    constructor( data: FigureData ) {
        super( data );
        const R = this.figureWidth / 2;
        this.surfaceArea = Math.floor( Math.PI * R * R / 2 );

        this.beginFill( this.fillColor );
        this.lineStyle( this.borderWidth, this.borderColor );
        this.drawEllipse( 0, 0, R, R / 2 );
        this.endFill();
    }
}

export default Ellipse;