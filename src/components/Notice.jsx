import React from "react";

// [수정] 폴더가 깊어졌으므로 '../' 로 상위 폴더로 나가야 합니다.
import gift1 from '../assets/images/gift1.jpg';
import gift2 from '../assets/images/gift2.jpg';
import gift3 from '../assets/images/gift3.jpg';
import gift4 from '../assets/images/gift4.jpg';

const Notice = () => {
    return (
        <section className="notice">
            <div className="container">
                <p className="title">· 참여 방법 ·</p>
                <p>전자책(E-BOOK) 대출 시 자동 응모!</p>
                <p className="red">(※각 주차별 시작시 대출 권수 리셋, 당일대출 당일반납 시 대출권수 미인정)</p>
                <a href="https://ebook.yjc.ac.kr/" target="_blank" rel="noreferrer">전자도서관 바로 가기</a>
                <p className="title">· 미션 안내 ·</p>
                <div className="mission-box">
                    {/* 1주차 */}
                    <div className="mission">
                        <div className="mission-date">
                            <p>1주차 미션</p>
                            <span>1. 1. (목) ~ 1. 11. (일)</span>
                        </div>
                        <img src={gift1} alt="신세계상품권"/>
                        <div className="mission-desc">
                            <p>전자도서</p>
                            <p>3권 이상 대출</p>
                            <span>신세계상품권 1만원 (10명)</span>
                        </div>
                    </div>
                    {/* 2주차 */}
                    <div className="mission">
                        <div className="mission-date">
                            <p>2주차 미션</p>
                            <span>1. 12. (월) ~ 1. 18. (일)</span>
                        </div>
                        <img src={gift2} alt="핑구키링인형"/>
                        <div className="mission-desc">
                            <p>전자도서</p>
                            <p>3권 이상 대출</p>
                            <span>핑구 키링 인형 (5명)</span>
                        </div>
                    </div>
                    {/* 3주차 */}
                    <div className="mission">
                        <div className="mission-date">
                            <p>3주차 미션</p>
                            <span>1. 19. (월) ~ 1. 25. (일)</span>
                        </div>
                        <img src={gift3} alt="조말론핸드크림"/>
                        <div className="mission-desc">
                            <p>전자도서</p>
                            <p>3권 이상 대출</p>
                            <span>조말론 핸드크림 (5명)</span>
                        </div>
                    </div>
                    {/* 4주차 */}
                    <div className="mission">
                        <div className="mission-date">
                            <p>4주차 미션</p>
                            <span>1. 26. (월) ~ 2. 1. (일)</span>
                        </div>
                        <img src={gift4} alt="이뮨멀티비타민"/>
                        <div className="mission-desc">
                            <p>전자도서</p>
                            <p>3권 이상 대출</p>
                            <span>이뮨 멀티비타민 (5명)</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Notice;