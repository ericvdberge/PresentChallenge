export interface Present {
    scale: number;
}

export interface UsePresent {
    presents: Ref<Present[]>;
    openPresent: (index: number) => void;
}