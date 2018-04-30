import React from 'react'
import classes from './SearchSuggest.css'
export default (props) => {
    
    let suggestions=props.suggestions.map(suggestion => (
        <li onClick={()=>props.onSelect(suggestion.name)} key={suggestion.name}>{suggestion.name}</li>
    ))    
    return (
        <div className={classes.SearchSuggest}>
            <input type="text" value={props.value} onChange={evt=>props.onChange(evt.target.value)} placeholder={props.placeholder} />
            <div className={classes.SuggestionList}>
                <ul>
                    {suggestions}
                </ul>
            </div>
        </div>
    )
}
