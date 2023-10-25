import * as PIXI from 'pixi.js';
import '@pixi/graphics-extras';
import '@pixi/events';
import { IFigure } from "../interfaces/IFigure";
import { FigureData } from '../types/FigureData';


abstract class Figure extends PIXI.Graphics implements IFigure { 
    protected figureWidth: number;
    protected figureHeight: number;
    protected id: number;
    protected surfaceArea: number;

    public fillColor: string;
    public borderColor: string;
    public borderWidth: number;

    constructor( data: FigureData ){
        super();
        
        // Set main Figure properties from passed Figure Data
        this.id             = data.id;
        this.position.x     = data.x;
        this.position.y     = data.y;
        this.figureWidth    = data.width;
        this.figureHeight   = data.height;
        this.fillColor      = data.fillColor;
        this.borderColor    = data.borderColor;
        this.borderWidth    = data.borderWidth;
        
        // Define Figure as interacive
        this.interactive = true;
    }

    get _surfaceArea() {
        return this.surfaceArea; 
    }

    get _figureWidth() {
        return this.figureWidth;
    }

    get _figureHeight() {
        return this.figureHeight;
    }

    get _id() {
        return this.id;
    }
}

export default Figure;