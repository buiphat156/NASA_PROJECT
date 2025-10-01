export default function Tabbutton({children,onSelect}){
    return(
        <li>
            <button onClick={onSelect}>{children}</button>
        </li>
    )
}