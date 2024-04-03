import { createContext, useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const MediaQueryContext = createContext();

export function MediaQueryContextProvider({ children }) {
    const isPc = useMediaQuery({
        query: "(min-width:1024px)"
    });
    const isTablet = useMediaQuery({
        query: "(min-width:768px) and (max-width:1023px)"
    });

    const [query, setQuery] = useState({ isPc, isTablet })
    useEffect(() => {
        setQuery({ isPc, isTablet })
    }, [isPc, isTablet]);


    return <MediaQueryContext.Provider value={query}>
        {children}
    </MediaQueryContext.Provider>

}

export function useMediaQueryContext() {
    return useContext(MediaQueryContext);
}