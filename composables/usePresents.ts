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

        //filter out the opened present (because it is clicked)
        const filteredPresents = presents.value.filter((_, pidx) => pidx !== idx)
        
        //add the new child presents
        presents.value = [
            //add all the presents before the opened present
            ...filteredPresents.slice(0, idx),
             
            //add the child presents to the array
            ...new Array<Present>(numberOfInnnerPresents).fill({ 
                scale: parentPresent.scale > 0.4 ? (parentPresent!.scale) * 0.5 : 0 
            }),

            //add all the presents after the opened present
            ...filteredPresents.slice(idx)
        ]
    }
    
    return {
        presents,
        openPresent
    }  
}

