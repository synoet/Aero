import { useMediaQuery } from 'react-responsive';

export const useScreenType = () => {
    const two = useMediaQuery({minWidth: 1200})
    const one = useMediaQuery({minWidth: 700})

    if (two){
        return "2-columns"
    }else if(one){
        return "1-columns"
    }
    return "1-columns"
}