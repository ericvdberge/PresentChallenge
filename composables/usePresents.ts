export const usePresents = (): UsePresent => {
    const presents: Ref<Present[]> = useState<Present[]>(
        'presents', () => new Array<Present>(3).fill({ scale: 1 })
    )

    const openPresent = (idx: number) => {
        if(presents.value.length <= 0) return;

        //generate random number of child presents
        let numberOfInnnerPresents: number = Math.floor(Math.random() * 3)

        //remove the opened present
        const parentPresent: Present = presents.value[idx]
        presents.value = presents.value.filter((_, pidx) => pidx !== idx)

        //add the new child presents
        for(let i = 0; i < numberOfInnnerPresents; i++) {
            presents.value.splice(idx, 0, {
                //scale down only to a certain size and then stop
                scale: parentPresent.scale > 0.4 ? (parentPresent!.scale) * 0.5 : 0,
            } as Present)
        }
    }
    
    return {
        presents,
        openPresent
    }  
}

