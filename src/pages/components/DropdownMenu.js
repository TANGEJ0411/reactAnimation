import React, { useState } from 'react';
import './DropdownMenu.scss'

function DropdownMenu(props) {
    const [selected, setSelected] = useState(props.options[0]);
    const [menuOpen, setMenuOpen] = useState(false)
    const handleSelect = (option) => {
        setSelected(option);
        props.onSelect && props.onSelect(option);
    };

    return (
        <div className="dropdown-menu">
            <div className="dropdown-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                {selected}
            </div>
            {menuOpen && (
                <ul>
                    {props.options.map((option) => (
                        <li key={option} onClick={() => handleSelect(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DropdownMenu;