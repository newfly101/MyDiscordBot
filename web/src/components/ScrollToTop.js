import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const { pathname } = useLocation(); // 현재 경로 가져오기

    useEffect(() => {
        window.scrollTo(0, 0); // 경로 변경 시 스크롤을 맨 위로 이동
    }, [pathname]); // pathname이 변경될 때마다 실행

    return null; // 이 컴포넌트는 실제로 렌더링할 것이 없으므로 null을 반환
}

export default ScrollToTop;
