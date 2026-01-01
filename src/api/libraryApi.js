import axios from 'axios';

const parseXml = (xmlString) => {
    const parser = new DOMParser();
    return parser.parseFromString(xmlString, 'text/xml');
};

const API_BASE = "https://ebook.yjc.ac.kr";

// 1. [과거] 반납된 도서 기록 (Lent)
export const fetchLentData = async (id) => {
    try {
        console.log(`📡 [API 요청] 과거 대출 기록: ${id}`);
        // const response = await axios.get(`/api/Ebook_Lent_list_xml.asp?user_id=${id}`);
        const response = await axios.get(`${API_BASE}/api/Ebook_Lent_list_xml.asp?user_id=${id}`);

        const xml = parseXml(response.data);
        const resultCode = xml.getElementsByTagName('ResultCode')[0]?.textContent;
        
        if (resultCode !== "0") return null;

        const items = xml.getElementsByTagName('item');
        const lentArray = [];
        for (let i = 0; i < items.length; i++) {
            lentArray.push({
                // [수정] content_name -> title 로 변경 (학교 서버 태그명 일치)
                title: items[i].getElementsByTagName('title')[0]?.textContent || '제목없음',
                lendingDate: items[i].getElementsByTagName('lending_date')[0]?.textContent || '',
                returnedDate: items[i].getElementsByTagName('returned_date')[0]?.textContent || ''
            });
        }
        return lentArray;
    } catch (error) {
        console.error("❌ API Error (Lent)", error);
        return [];
    }
};


// 2. [현재] 대출 중인 도서 (Lending)
export const fetchLendingData = async (id) => {
    try {
        console.log(`📡 [API 요청] 현재 대출 목록: ${id}`);
        // const response = await axios.get(`/api/Ebook_Lending_list_xml.asp?user_id=${id}`);
        const response = await axios.get(`${API_BASE}/api/Ebook_Lending_list_xml.asp?user_id=${id}`);
        
        const xml = parseXml(response.data);
        const items = xml.getElementsByTagName('item');
        const lendingArray = [];
        for (let i = 0; i < items.length; i++) {
            lendingArray.push({
                // [수정] 여기도 title로 변경
                title: items[i].getElementsByTagName('title')[0]?.textContent || '제목없음',
                lendingDate: items[i].getElementsByTagName('lending_date')[0]?.textContent || '',
                expiredDate: items[i].getElementsByTagName('expired_date')[0]?.textContent || ''
            });
        }
        return lendingArray;
    } catch (error) {
        console.error("❌ API Error (Lending)", error);
        return [];
    }
};