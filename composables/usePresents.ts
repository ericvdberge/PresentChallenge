export const usePresents = (): UsePresent => {
    const presents: Ref<Present[]> = useState<Present[]>(
        'presents', () => new Array<Present>(3).fill({ scale: 1 })
    )

    const openPresent = (idx: number) => {
        if(presents.value.length <= 0) return;

        //generate random number of child presents
        let numberOfInnnerPresents: number = Math.floor(Math.random() * 3)

        //get the opened present
        const parentPresent: Present = presents.value[idx]

        //add the new child presents
        presents.value = [
            //add existing presents without the opened present
            ...presents.value.filter((_, pidx) => pidx !== idx),
             
            //add the child presents to the array
            ...new Array<Present>(numberOfInnnerPresents).fill({ 
                scale: parentPresent.scale > 0.4 ? (parentPresent!.scale) * 0.5 : 0 
            })
        ]
    }
    
    return {
        presents,
        openPresent
    }  
}

