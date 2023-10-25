import { FigureData } from "../types/FigureData";
import Figure from "./figure";
import Helper from "../utils/helper";

class Random extends Figure {
    private points: Array<number>;

    constructor( data: FigureData ) {
        super( data );

        const R = this.figureWidth / 2;
        
        /*
         * Since it is quite difficult to create a universal formula for calculating the area of ​​a random figure, 
         * I decided to calculate the average area of ​​the square it occupies.
         */
        this.surfaceArea = Math.floor( Math.pow( this.figureWidth, 2 ) );

        this.points = [
            Helper.randInRange( -R - 30, -R + 30 ), Helper.randInRange( -R - 30, -R + 30 ),
            Helper.randInRange( R - 30, R + 30 ), Helper.randInRange( -R - 30, -R + 30 ),
            Helper.randInRange( this.figureWidth - 30, this.figureWidth + 30 ), Helper.randInRange( R - 30, R + 30 ),
            Helper.randInRange( -30, 30 ), Helper.randInRange( this.figureWidth - 30, this.figureWidth + 30 ),
            Helper.randInRange( -R - 30, -R + 30 ), Helper.randInRange( R - 30, R + 30 )
        ]


        this.beginFill( this.fillColor );
		this.lineStyle( this.borderWidth, this.borderColor );
        this.moveTo( this.points[0], this.points[1] );

        for (let i = 2; i < this.points.length; i += 2) {
          this.lineTo( this.points[i], this.points[i + 1] );
        }
    
        this.lineTo( this.points[0], this.points[1] );
		this.endFill();
    }
}

export default Random;