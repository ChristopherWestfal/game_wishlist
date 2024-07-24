export type Game = {
    id:string,
    name:string,
    released:string,
    note:string,
    fav:boolean
}

export type GameDto = {
    name:string,
    released:string,
    note:string,
    fav:boolean
}

export type ApiGame = {
    id:number,
    name:string,
    released:string,
    background_image:string,
    rating:number,
    rating_top:number,
    note:string,
    fav:boolean
}
