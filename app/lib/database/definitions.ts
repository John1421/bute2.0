export type Song = {
    id: string;
    title: string;
    file_path: string;
    data: string;
};

export type SongForm = {
    id: string;
    title: string;
    tags: String[];
    artists: String[];
    file_path: String;
};
  
export type Artist = {
    id: string;
    name: string;
};
  
export type Tag = {
    id: string;
    name: string;
};