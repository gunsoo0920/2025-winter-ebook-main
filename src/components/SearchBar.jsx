import React, { useState } from 'react';
import iconSearch from '../assets/images/icon-search.png';

const SearchBar = ({ onSearch }) => {
    const [inputId, setInputId] = useState('');

    const handleClick = () => {
        if (inputId.trim() === '') {
            alert('학번을 입력해주세요.');
            return;
        }
        onSearch(inputId);
    };

    // 엔터키 쳤을 때도 검색되게 기능 추가 (UX 개선)
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClick();
        }
    };

    return (
        <div className="finder-input">
            <input
                type="text"
                placeholder="학번"
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <button onClick={handleClick}>
                <img src={iconSearch} alt="검색" />
            </button>
        </div>
    );
};

export default SearchBar;