import { City } from "./city.model";

export interface Governate {
    id: string;
    name: string;
    cities: City[];
}
