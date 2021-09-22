export interface Game{
    id:string,
    background_image:string;
    name:string;
    released:string;
    website:string;
    description:string;
    metacritic_url: string;
    metacritic:number;
    genres:Array<Genre>;
    parent_platforms:Array<ParentPlatform>;
    publishers:Array<Publishers>;
    ratings:Array<Rating>;
    screenshots:Array<Screenshots>;
    trailers:Array<Trailer>;
}

export interface APIResponse<T>{
    results:Array<T>;
}

interface Genre{
    name:string;
}

interface ParentPlatform{
    platform:{
        name:string,
        slug:string;
    }
}

interface Publishers{
    name: string;
}

interface Rating{
    id:number;
    count:number;
    title:string;
}

interface Screenshots{
    image:string;
}

interface Trailer{
    data:{
        max: string;
    }
}