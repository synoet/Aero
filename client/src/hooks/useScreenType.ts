import { useMediaQuery } from 'react-responsive';

export const useScreenType = () => {
    const xl = useMediaQuery({minWidth: 1400})
    const l = useMediaQuery({minWidth: 1280})
    const m = useMediaQuery({minWidth: 1024})
    const s = useMediaQuery({minWidth: 768})
    const xs = useMediaQuery({minWidth: 200});

    if(xl){
        return 'xl'
    }else if(l){
        return 'l'
    }else if(m){
        return 'm'
    }else if(s){
        return 's'
    }else if(xs){
        return 'xs'
    }
}