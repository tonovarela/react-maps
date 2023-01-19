// Generated by https://quicktype.io

export interface ResponseSearch {
    type:        string;
    query:       string[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:            string;
    type:          string;
    place_type:    string[];
    relevance:     number;
    properties:    Properties;
    text_es:       string;
    place_name_es: string;
    text:          string;
    place_name:    string;
    center:        number[];
    geometry:      Geometry;
    context:       Context[];
}

export interface Context {
    id:           string;
    text_es:      string;
    text:         string;
    wikidata?:    Wikidata;
    language_es?: Language;
    language?:    Language;
    short_code?:  ShortCode;
}

export enum Language {
    Es = "es",
}

export enum ShortCode {
    MX = "mx",
    MXMex = "MX-MEX",
}

export enum Wikidata {
    Q219574 = "Q219574",
    Q82112 = "Q82112",
    Q96 = "Q96",
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    accuracy: string;
}
