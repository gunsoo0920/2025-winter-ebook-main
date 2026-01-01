import React, { useEffect } from "react";
import "../assets/css/snow.css";

const SnowfallEffect = () => {
    useEffect(() => {
        const canvas = document.getElementById("snowfall");
        // 캔버스가 없을 경우 에러 방지
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");

        // Set canvas size to match the section
        const section = document.querySelector(".top");
        if (!section) return;

        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;

        const snowflakes = Array.from({ length: 100 }).map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 4 + 1,
            velocityX: Math.random() * 1 - 0.5,
            velocityY: Math.random() * 1 + 0.5,
        }));

        const drawSnowflakes = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            snowflakes.forEach((snowflake) => {
                ctx.beginPath();
                ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
                ctx.fillStyle = "white";
                ctx.fill();
                ctx.closePath();

                snowflake.x += snowflake.velocityX;
                snowflake.y += snowflake.velocityY;

                // Reset position if snowflake goes out of bounds
                if (snowflake.y > canvas.height) snowflake.y = 0;
                if (snowflake.x > canvas.width) snowflake.x = 0;
                if (snowflake.x < 0) snowflake.x = canvas.width;
            });

            requestAnimationFrame(drawSnowflakes);
        };

        drawSnowflakes();

        const handleResize = () => {
            if(section) {
                canvas.width = section.offsetWidth;
                canvas.height = section.offsetHeight;
            }
        };

        window.addEventListener("resize", handleResize);
        
        // [추가] 컴포넌트가 사라질 때 이벤트 리스너 제거 (메모리 누수 방지)
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <canvas id="snowfall"></canvas>;
};

export default SnowfallEffect;