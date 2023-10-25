import * as PIXI from "pixi.js";
import Model from "../models/model";
import View from "../views/view";
import Figure from "../../shapes/figure";
import Ellipse from "../../shapes/ellipse";
import Circle from "../../shapes/circle";
import Triangle from "../../shapes/triangle";
import Rectangle from "../../shapes/rectangle";
import Pentagon from "../../shapes/pentagon";
import Hexagon from "../../shapes/hexagon";
import { BorderColors, FillColors, Shapes, Sizes } from "../../utils/vars";
import Star from "../../shapes/star";
import Helper from "../../utils/helper";
import Random from "../../shapes/random";
import { FigureData } from "../../types/FigureData";


class Controller {
    /**
     * View instance
     */
    private view: View;

    /**
     * Model instance
     */
    private model: Model;

    /**
     * Number of passed seconds
     */
    private secondsPassed: number;

    constructor() {
        const view = new View();
        const model = new Model();

        this.model = model;
        this.view = view;
        this.secondsPassed = 0;

        this.view.updateFrequencyDisplayVal( Model.spawnRate );
        this.view.updateGravityDisplayVal( Model.gravity );
    }


    /**
     * Initialize app
     */
    public init() : void {
        this.assignEventListeners();
        this.processStage();
    }

    /**
     * Process app stage
     */
    private processStage() : void {
        this.view.render();

        // Run ticker to update stage
        this.view.app.ticker.add( (delta) => {
            this.secondsPassed += 1/60 * delta;

            if ( this.secondsPassed >= 1 ) {
                this.secondsPassed = 0;
                for( let i = 0; i < Model.spawnRate; i++ ) {
                    this.spawnRandomShape();
                }
            }
            
            // Make figures fall.
            for ( const shape of this.model.figures ) {
                this.view.fallShapeDown( shape, Model.gravity );
            }

            // Check for fallen figures.
            const fallenShapes = this.model.checkFallenShapes();
            if ( fallenShapes.length ) {
                fallenShapes.map( (figure) => { this.deleteFigure(figure) } );
                fallenShapes.length = 0
            }

            this.updateFiguresOccupiedArea();
        } );

        this.createBackground();
    }

    /**
     * Assigns app event listeners
     */
    private assignEventListeners() : void {
        const thisView = this.view;
        const frequencyControls = thisView.controlElems.changeFreq;

        // Handler to change figures spawn frquency
        for ( let i = 0; i < frequencyControls.length; i++ ) {
            frequencyControls[i].addEventListener( 'click', function() { 
                const valueDelta = parseFloat( this.dataset.change );
                const newFrequency = Model.spawnRate + valueDelta;

                if ( newFrequency <= 0 ) {
                    return
                }

                Model.spawnRate = newFrequency;
                thisView.updateFrequencyDisplayVal( Model.spawnRate )
            } );
        }

        const gravityControls = thisView.controlElems.changeGravity;

        // Handler to change app gravity
        for ( let i = 0; i < gravityControls.length; i++ ) {
            gravityControls[i].addEventListener( 'click', function() {
                const valueDelta = parseFloat( this.dataset.change );
                const newGravity = Math.round( ( Model.gravity + valueDelta ) * 100 ) / 100;
                
                if ( newGravity <= 0 ) {
                    return
                }
                Model.gravity = newGravity;
                thisView.updateGravityDisplayVal( Model.gravity );
            } );
        }
    }

    /**
     * Callback. Creates shape. Add it to Model and pass to View to add on the stage.
     */
    private createShape: CallableFunction = ( shapeType: Shapes, shapeData: FigureData ) => { 
        let newShape: Figure; 
        switch ( shapeType ) {
            
            case Shapes.Circle: { 
                newShape = new Circle( shapeData );
                break;
            }
            case Shapes.Ellipse: {
                newShape = new Ellipse( shapeData );   
                break;
            }
            case Shapes.Triangle: {
                newShape = new Triangle( shapeData );
                break;
            }
            case Shapes.Rectangle: {
                newShape = new Rectangle( shapeData );
                break;
            }
            case Shapes.Pentagon: {
                newShape = new Pentagon( shapeData );
                break;
            }
            case Shapes.Hexagon: {
                newShape = new Hexagon( shapeData );
                break;
            }
            case Shapes.Star: {
                newShape = new Star( shapeData );
                break;
            }
            default: {
                newShape = new Random( shapeData );
            }
        }
        
        newShape.on( 'pointerdown', (e) => {
            this.deleteFigure( <Figure>e.target );
        } );

        this.model.addFigure( newShape );
        this.view.addFigureToStage( newShape );
        this.view.updateFiguresCount( this.model.figures.length );
    }

    /**
     * Pass current figures occupied area to View
     */
    private updateFiguresOccupiedArea() : void {
        const occupiedArea = this.model.getFiguresOccupiedArea();
        this.view.updateFiguresArea( occupiedArea );
    }

    /**
     * Create random shape
     */
    private spawnRandomShape() : void {
        const newId = this.model.figures.length ? this.model.lastFigureID + 1 : 1;
            this.createShape( 
                Helper.randomEnumValue( Shapes ),
                {
                    id: newId,
                    x: Helper.randInRange( 0, Sizes.canvasWidth ),
                    y: -1 * Sizes.figureHeight,
                    width: Sizes.figureWidth,
                    height: Sizes.figureHeight,
                    fillColor: Helper.randomEnumValue( FillColors ),
                    borderColor: Helper.randomEnumValue( BorderColors ),
                    borderWidth: Sizes.borderWidth
                }
            )
    }

    /**
     * Delete figure from Model data and View stage
     * 
     * @param figure Figure instance
     */    
    private deleteFigure( figure: Figure ) : void {
        this.model.deleteFigure( figure );
        this.view.removeFigureFromStage( figure );
        figure.destroy();

        this.view.updateFiguresCount( this.model.figures.length );
    }

    /**
     * Generate background to handle interactions
     * Background possible colors are defined in FillColors enum
     * 
     * @returns Graphics object of added background
     */
    private createBackground() : PIXI.Graphics {
        const bg = new PIXI.Graphics();
        
        bg.eventMode = 'static';
        bg.name = 'bg';

        bg.beginFill( Helper.getRandomColor() );
        bg.drawRect( 0, 0, Sizes.canvasWidth, Sizes.canvasHeight );
        bg.endFill();
        
        bg.on( 'pointerdown', (e) => {
            this.createShape( 
                null, 
                {
                    id: this.model.figures.length ? this.model.lastFigureID + 1 : 1,
                    x: e.global.x,
                    y: e.global.y,
                    width: Sizes.figureWidth,
                    height: Sizes.figureHeight,
                    fillColor: Helper.randomEnumValue( FillColors ),
                    borderColor: Helper.randomEnumValue( BorderColors ),
                    borderWidth: Sizes.borderWidth
                }
            );
        });

        this.view.app.stage.addChild( bg );
        return bg;
    }

}

export default Controller;