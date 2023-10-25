enum Shapes {
    Triangle    = 'triangle',
    Rectangle   = 'rectangle',
    Pentagon    = 'pentagon',
    Hexagon     = 'hexagon',
    Circle      = 'circle',
    Ellipse     = 'ellipse',
    Star        = 'star',
}

enum Sizes {
    figureWidth     = 100,
    figureHeight    = 100,
    canvasHeight    = Math.min( 700, window.innerHeight *0.8 ),
    canvasWidth     = Math.min( 1100, window.innerWidth - 24 ),
    borderWidth     = 5
}

enum FillColors {
    red     = 'red',
    pink    = 'DeepPink',
    orange  = '#FF4500',
    indigo  = '#4B0082',
    green   = '#2E8B57',
    blue    = '#4169E1'
}

enum BorderColors {
    red     = 'Crimson',
    pink    = 'MediumVioletRed',
    orange  = '#FF8C00',
    purple  = '#800080',
    green   = '#3CB371',
    blue    = '#000080'
}

export { Shapes, Sizes, FillColors, BorderColors }