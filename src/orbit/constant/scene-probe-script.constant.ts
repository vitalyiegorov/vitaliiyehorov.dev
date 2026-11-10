export const sceneProbeScript =
    "try{if(location.hash&&CSS.supports('animation-timeline: view()')){var c=document.createElement('canvas');if(!(c.getContext('webgl2')||c.getContext('webgl'))){document.documentElement.dataset.scene='off'}}}catch(e){document.documentElement.dataset.scene='off'}";
