# PresentChallenge
the present challenge from webdevcody

## Context
Hi Web dev cody (fans),<br>
I saw the last [video](https://www.youtube.com/watch?v=XiTeNyf8D7E) of web dev cody to see the challenge of the presents challenge and I wanted to take on the challenge and try to make the solution even more simple.<br>

I am used to code any frontend into a Nuxt project because I like Vue for 8 years already. So that is the tech stack i am goign for.<br>
In the readme below: you are going to read more about the:<br>
1. Approach
2. Result
3. Run using docker

## Approach
The approach of web dev cody was to use the tree data structure to nest presents into other presents. I took a different approach, because we are going down the tree, but never going up. <br>
That is why i am going for an approach of going with a single array and generating child nodes dynamically when the present is clicked. I insert them in the first level of the array so that the implementation is as simple as possible.

## Result
In Nuxt, we have something called [composables](https://nuxt.com/docs/guide/directory-structure/composables). They contain the business logic, so it is seperate and can be tested individually using unit testing. In this situation, the usePresents composable has the responsibility of maintaining the state of the presents and the logic of opening the present. The code of the composable can be seen below and is quite explanitory:
```ts
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
```
The presents array has a initial state of 3 presents that all have a scale of 1. When calling the openPresent function:
1. It first checks if there are any presents inside. If there are none, we do not have to do anything.
2. It then generates a number that represents the number of child (inner) presents we are going to create.
3. We then remove the opened present from the array, because we are never going back up the tree again
4. And finally, we push the new child presents into the array<br>

We are then rendering the presents on the page and changing the width if the img accordingly
```js
<script setup lang="ts">
const { presents, openPresent } = usePresents()
</script>

<template>
  <div class="container">
    <div v-for="(present, idx) in presents" :key="idx">
        <img src="/present.jpeg" 
        @click="() => openPresent(idx)"
        :style="`width: ${80 * present.scale}px`"/>
    </div>
  </div>
</template>
```
## Docker
To run my present challenge in docker, follow the next steps:
1. install docker (desktop) 
2. clone the respository
3. navigate to the directory locally
4. open the command prompt
5. use the command `docker build -t present-challenge .`
6. use the command `docker run -it -d --name present-challenge -p 8080:80 present-challenge`
