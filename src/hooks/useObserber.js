import { useRef, useEffect } from "react";

export const useObserver = (ref, canload, isLoading , callback) => {
    const observer = useRef();

    useEffect (() => {
        if(isLoading) return; 
        if(observer.current) observer.current.disconnect();
      var cb = function(entries, observer) {
            if(entries[0].isIntersecting && canload) {
              callback()
              
            }
            
          };
          observer.current = new IntersectionObserver(cb);
          observer.current.observe(ref.current)
          }, [isLoading] )
}