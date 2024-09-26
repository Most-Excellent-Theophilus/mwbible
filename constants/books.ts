export type Bible ={
    XMLBIBLE? : any
}

export type Book = {
    bname: string,
    bsname: string,
    bnumber: number,
    CHAPTERS : number,
    length : number
}

export type Chapter ={
    cnumber: number,
    VERS : any
}

export type Verse = {
    vnumber : number,
    text : string
}