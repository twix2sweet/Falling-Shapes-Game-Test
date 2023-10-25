import Figure from "../../shapes/figure";
import { Sizes } from "../../utils/vars";

class Model {
    /**
     * Figure falling speed
     * 
     */
    public static gravity: number = 1;

    /**
     * Define how many fogures will spawn per 1 second
     */
    public static spawnRate: number = 1;

    /**
     * Array of figures are present in app
     */
    public figures: Array<Figure>;

    public constructor() {
        this.figures = [];
    }

    /**
     * Sets app gravity
     * 
     * @param gravity defines how fast will figure fall in app
     */
    set gravity( gravity: number ) {
        Model.gravity = gravity;
    }

    /**
     * Sets spawnRate of Figures
     * 
     * @param spawnRate number of figures spawning in 1 sec
     */
    set spawnRate( spawnRate: number ) {
        Model.spawnRate = spawnRate;
    }

    /**
     * Gets id of last added figure 
     * 
     */
    get lastFigureID() : number {
        return this.figures[ this.figures.length - 1 ]._id;
    }

    /**
     * Add figure to Model figures array
     * @param figure figure graphics object to add
     */
    public addFigure( figure: Figure ) : void {
        this.figures.push( figure );
    }

    /**
     * Delete certain Figure from this figures data array
     * 
     * @param figure instance of Figure object to remove
     */
    public deleteFigure( figure: Figure ) : void {
        this.figures.splice( this.figures.indexOf( figure ), 1 ); 
    }

    /**
     * Check fallen shapes and return them in array
     * 
     * @returns array of fallen shapes objects  
     */
    public checkFallenShapes() : Array<Figure> {
        const fallenShapes = [];
        for( let i = 0; i < this.figures.length; i++ ) {
            const figure = this.figures[i];
            if ( figure.position.y > Sizes.canvasHeight + ( Sizes.figureHeight / 2  )) {
                fallenShapes.push( figure );
            }
        }
        return fallenShapes;
    }
    
    /**
     * Get summary surface area iccupied by figures on screen
     * 
     * @returns surface area in px
     */
    public getFiguresOccupiedArea() : number {
        let occupiedArea = 0;

        if ( this.figures.length ) {
            this.figures.map( (figure) => {
                occupiedArea = Math.floor( occupiedArea + figure._surfaceArea );
            } );
        }

        return occupiedArea;
    }
}

export default Model;