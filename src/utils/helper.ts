class Helper {

    /**
     * Get random integer in range
     * 
     * @param min minimum value
     * @param max maximum value
     * @returns random integer
     */
    public static randInRange( min: number, max: number ) { 
        return Math.floor( Math.random() * ( max - min + 1 ) + min );
    }

    /**
     * Get pseudorandom color in HEX format
     * 
     * @returns pseudorandom color string 
     */
    public static getRandomColor() : string {
        const letters = '0123456789ABCDEF';
        let color = '#';

        for ( let i = 0; i < 6; i++ ) {
          color += letters[Math.floor( Math.random() * 16 )];
        }

        return color;
    }

    /**
     * Get random enum value
     * 
     * @param enumeration 
     * @returns Random Enumenator member value
     */
    public static randomEnumValue( enumeration ) {
        const values = Object.keys( enumeration );
        const enumKey = values[Math.floor( Math.random() * values.length )];
        return enumeration[enumKey];
      }
}

export default Helper;
  