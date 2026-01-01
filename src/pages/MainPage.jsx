import React, { useState, useEffect } from 'react';
import '../assets/css/reset.css';
import '../assets/css/Library.css';
import '../assets/css/LibraryMobile.css';

import Notice from '../components/Notice';
import SnowfallEffect from '../components/Snowfall';
import SearchBar from '../components/SearchBar';
import ResultList from '../components/ResultList';

import { fetchLentData, fetchLendingData } from '../api/libraryApi';

import snowCap from '../assets/images/snow_cap.png';
import logo from '../assets/images/lib-logo.png';

const MainPage = () => {
    const [userId, setUserId] = useState('');
    const [weeklyCounts, setWeeklyCounts] = useState([0, 0, 0, 0]); 
    const [weeklyParticipation, setWeeklyParticipation] = useState([false, false, false, false]);
    
    const [allData, setAllData] = useState([]); 

    const handleSearch = async (inputId) => {
        setUserId(inputId);
        const lent = await fetchLentData(inputId);
        if (lent === null) {
            alert("존재하지 않는 이용자이거나 대출 기록이 없습니다.");
            return; 
        }
        const lending = await fetchLendingData(inputId);
        setAllData([...lent, ...lending]);
    };

// [실전 배포용] 2026년 1월 1일부터 시작!
    useEffect(() => {
        if (!allData || allData.length === 0) return;

        // 1. 행사 기간 설정 (2026.1.1 ~ 2026.2.1)
        const eventStartDate = new Date(2026, 0, 1, 0, 0, 0, 0); // 1월은 0
        const eventEndDate = new Date(2026, 1, 1, 23, 59, 59, 999); // 2월 1일 종료

        // 2. 주차별 날짜 범위 (매주 월요일~일요일 끊기)
        // 1주차: 1.1 ~ 1.11 / 2주차: 1.12 ~ 1.18 ...
        const weekRanges = [
            { start: new Date(2026, 0, 1), end: new Date(2026, 0, 11) },
            { start: new Date(2026, 0, 12), end: new Date(2026, 0, 18) },
            { start: new Date(2026, 0, 19), end: new Date(2026, 0, 25) },
            { start: new Date(2026, 0, 26), end: new Date(2026, 1, 1) }
        ];

        // 날짜 파싱 (점, 콤마 처리)
        const parseDate = (dateStr) => {
            if (!dateStr) return null;
            return new Date(dateStr.replace(/[.,]/g, '-'));
        };

        const counts = [0, 0, 0, 0];

        allData.forEach((item) => {
            const lendingDate = parseDate(item.lendingDate);
            const returnedDate = item.returnedDate ? parseDate(item.returnedDate) : null;

            if (!lendingDate || isNaN(lendingDate)) return;

            // 당일 대출 당일 반납 제외
            if (returnedDate && lendingDate.toDateString() === returnedDate.toDateString()) return;

            // 전체 행사 기간 내인지 확인
            if (lendingDate >= eventStartDate && lendingDate <= eventEndDate) {
                // 주차별 카운트 (어느 주차에 속하는지 확인)
                for (let i = 0; i < weekRanges.length; i++) {
                    // 해당 주차의 범위 안에 들어오면 카운트 증가
                    if (lendingDate >= weekRanges[i].start && lendingDate <= weekRanges[i].end) {
                        counts[i]++;
                        break; // 한 번 카운트했으면 다음 주차는 볼 필요 없음
                    }
                }
            }
        });

        setWeeklyCounts(counts);
        setWeeklyParticipation(counts.map(c => c >= 3));

    }, [allData]);
    return (
        <div className="body">
            <section className="top">
                <SnowfallEffect />
                <div className="container">
                    <span className="univname">영진전문대학교</span>
                    <span className="univname">2026 동계방학 도서관 문화행사</span>
                    <div className="title">
                        <p>겨울독서</p>
                        <p>챌린지</p>
                        <span className="date">2026. 1. 1. (목) ~ 2. 1. (일)</span>
                    </div>
                </div>
            </section>
            
            <div className="snow-cap">
                <img src={snowCap} alt="snowcap" />
            </div>

            <Notice />

            <section className="content">
                <div className="container finder">
                    <p>☃️ 나의 챌린지 현황 ☃️</p>
                    <SearchBar onSearch={handleSearch} />
                </div>

                {userId && (
                    <div className="container result">
                        <ResultList 
                            weeklyCounts={weeklyCounts}
                            weeklyParticipation={weeklyParticipation}
                        />
                    </div>
                )}
            </section>

            <footer>
                <p>41527 대구광역시 북구 복현로 35 (복현2동 218)</p>
                <p>도서관 사무실 : 053-940-5152 / 자료실 : 053-940-5153</p>
                <p>Copyright 2025 YEUNGJIN UNIVERSITY. All rights reserved.</p>
                <img src={logo} alt="yjulib" />
            </footer>
        </div>
    );
};

export default MainPage;