// /**
//  *  keyOf---> pertenece a una propiedad de una interfaz
//  */

interface Table {
  [key: string]: string[];
}

export interface Hash {
  table: Table;
}

class HashTable {
  table: Table = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: [],
    k: [],
    l: [],
    m: [],
    n: [],
    o: [],
    p: [],
    q: [],
    r: [],
    s: [],
    t: [],
    u: [],
    v: [],
    w: [],
    x: [],
    y: [],
    z: [],
  };

  /**
   * addItem
   */
  public addItem(name: string) {
    name=name.trim();
    const firstLetter: string = name[0].toLocaleLowerCase();
    // console.log("El name es: ", name);
    if (name && this.table[firstLetter]) {
      this.table[firstLetter].push(name);
    }
  }

  /**
   * autocomplete
   */
  
  public autocomplete(letter: string) {
    let tenNames: string[] = []; //Maximo 4 palabras

    // if(typeof letter === 'string') return tenNames;
    // console.log('LA LETRA ES: ',letter,typeof letter)

    const firstLetter: string = letter[0].toLowerCase();
    // console.log('FIRSTNAME: ',firstLetter)
    if (this.table[firstLetter]) {
      const names: string[] = this.table[firstLetter]; //Todos los nombres de array
      // console.log('LOS NOMBRES: ',names)

      //Si existe la letra debemos recorrer el array y ver que matchea mejor:
      let corte = 0;
      for (let i = 0; i < names.length; i++) {
        if (corte > 1000) break;
        if (tenNames.length > 5) break;
        if (names[i].toLowerCase().startsWith(letter.toLowerCase())) {
          tenNames.push(names[i]);
        }
        corte++;
      }
      // console.log("Los nombres que matchean son: ", tenNames);
    }
    return tenNames;
  }
}

export default HashTable;
