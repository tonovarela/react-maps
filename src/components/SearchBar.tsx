import { ChangeEvent, useContext, useRef } from 'react';
import { PlacesContext } from '../context';
import { SearchResults } from './SearchResults';


export const SearchBar = () => {
   const {searchPlacesByTerm} = useContext(PlacesContext);
    const inputRef = useRef<NodeJS.Timeout>();
    const onQueryChange =(e:ChangeEvent<HTMLInputElement>)=>{
     if (inputRef.current) 
         clearTimeout(inputRef.current);
         inputRef.current = setTimeout(()=>{
           searchPlacesByTerm(e.target.value).then(console.log);
              //console.log('debounce',e.target.value);
         },350)

    }


  return (
    <div  className="search-container">
        <input type="text" className="form-control" onChange={onQueryChange} placeholder="Buscar lugar" />
        <SearchResults></SearchResults>
    </div>
  )
}
