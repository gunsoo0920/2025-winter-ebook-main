import React from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; 

import wigerBook from '../assets/images/wiger-book-bw.png';
import wiger1 from '../assets/images/wiger_2.png';
import wiger2 from '../assets/images/wiger_3.png';
import wiger3 from '../assets/images/wiger_4.png';
import wiger4 from '../assets/images/wiger_5.png';
import wiger5 from '../assets/images/wiger_1.png'; // 5주차가 있다면 사용, 현재는 4주차까지라 예비용

const wigerImages = [wiger1, wiger2, wiger3, wiger4, wiger5];

const dateStrings = ["1/1 ~ 1/11", "1/12 ~ 1/18", "1/19 ~ 1/25", "1/26 ~ 2/1"];

const ResultList = ({ weeklyCounts, weeklyParticipation }) => {


    return (
        <ul className="badge-list">
            {weeklyParticipation.map((participated, index) => (
                <li key={index} className="badge">
                    <p>{index + 1}주차</p>
                    <span>({dateStrings[index]})</span>
                    
                    {/* 성공 여부에 따라 테두리 색상 클래스(success) 추가 */}
                    <div className={`progress-box ${participated ? 'success' : ''}`}>
                        <CircularProgressbarWithChildren
                            value={weeklyCounts[index]}
                            maxValue={3} // 목표: 3권
                            styles={{
                                path: {
                                    stroke: '#87B5F1',
                                    strokeLinecap: 'round',
                                    strokeWidth: '3',
                                    transition: 'stroke-dashoffset 0.5s ease 0s',
                                    transformOrigin: 'center center',
                                },
                                trail: {
                                    stroke: '#ECEDF0',
                                    strokeLinecap: 'butt',
                                    transform: 'rotate(0.25turn)',
                                    transformOrigin: 'center center',
                                    strokeWidth: '3',
                                }
                            }}
                        >
                            {/* 성공하면 캐릭터 이미지(wigerImages), 실패하면 흑백 책 이미지(wigerBook) */}
                            <img
                                style={{ width: "80%" }}
                                className={participated ? "success-img" : ""}
                                src={participated ? wigerImages[index] : wigerBook}
                                alt={`week-${index + 1}-reward`}
                            />
                        </CircularProgressbarWithChildren>
                        
                        {/* 성공 시 '완료' 텍스트 표시 */}
                        {participated ? <p>완료</p> : ""}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ResultList;