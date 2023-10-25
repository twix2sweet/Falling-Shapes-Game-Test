import { Application } from "pixi.js";
import { Sizes } from "../../utils/vars";
import Figure from "../../shapes/figure";

class View {

    public app: Application<HTMLCanvasElement>;

    constructor() {
        // Create new app
        this.app = new Application( {
            width: Sizes.canvasWidth,
            height: Sizes.canvasHeight,
        } );
        globalThis.__PIXI_APP__ = this.app;
    }

    /**
     * Getter for info display elements
     * 
     * @returns object with elements
     */
    get infoDisplayElems() {
        return {
            figuresQty: document.getElementById( 'current-shapes-qty' ),
            surfaceOccupied: document.getElementById( 'surface-occupied' ),
            shapesFreq: document.getElementById( 'shapes-per-sec' ),
            currentGravity: document.getElementById( 'gravity' )
        }
    }

    /**
     * Getter for app conrol elements
     * 
     * @returns object with elements
     */
    get controlElems() {
        return {
            changeFreq: document.querySelectorAll( '#js-change-spawn-rate' ),
            changeGravity: document.querySelectorAll( '#js-change-gravity' )
        }
    }
    
    /**
     * Append Application to canvas container
     */
    public render() : void {
        document.getElementById( 'app-canvas' ).appendChild( this.app.view );
    }

    /**
     * Add figure to stage
     * Also runs ticker with Figure fall callback
     * 
     * @param figure figure instance to add
     */
    public addFigureToStage( figure: Figure ) : void {
        this.app.stage.addChild( figure );
    }

    /**
     * Remove figure from stage
     * 
     * @param figure figure instance to remove
     */
    public removeFigureFromStage( figure: Figure ) : void {
        this.app.stage.removeChild( figure );
    }

    /**
     * Make figures fall
     * 
     * @param figure 
     * @param gravity 
     */
    public fallShapeDown( figure: Figure, gravity: number ) : void {
        figure.position.y += gravity * 3;
    }

    /**
     * Updates current figures count text value in #current-shapes-qty HTMLElement
     * 
     * @param count new figures count
     */
    public updateFiguresCount( count: number ) : void {
        this.infoDisplayElems.figuresQty.textContent = count.toString();
    }

    /**
     * Updates figures area occupied text value in #surface-occupied HTMLElement
     * 
     * @param area new iccupied area value
     */
    public updateFiguresArea( area: number ) : void {
        this.infoDisplayElems.surfaceOccupied.textContent = area.toString();
    }

    /**
     * Updates figures spawn frequency text value in #surface-occupied HTMLElement
     * 
     * @param frequency new spawn frequency
     */
    public updateFrequencyDisplayVal( frequency:number ) : void {
        this.infoDisplayElems.shapesFreq.textContent = frequency.toString();
    }

    /**
     * Updates app gravity text value in #surface-occupied HTMLElement
     *   
     * @param gravity new gravity
     */
    public updateGravityDisplayVal( gravity:number ) : void {
        this.infoDisplayElems.currentGravity.textContent = gravity.toString();
    }
}

export default View;