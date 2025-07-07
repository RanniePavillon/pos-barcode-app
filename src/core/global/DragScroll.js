import { useState } from "react";

export const useDragScroll = (ref = null) => {
    const scrollableAreaRef = ref;
    const [isDragging, setIsDragging] = useState(false);
    const [startPositionX, setStartPositionX] = useState(0);
    const [startScrollLeft, setStartScrollLeft] = useState(0);

    const mouseDownHandler = (event) => {
        setIsDragging(true);
        setStartPositionX(event.clientX);
        setStartScrollLeft(scrollableAreaRef.current.scrollLeft);
    };

    const mouseMoveHandler = (event) => {
        if (isDragging) {
            const deltaX = event.clientX - startPositionX;
            scrollableAreaRef.current.scrollLeft = startScrollLeft - deltaX;
        }
    };

    const mouseUpHandler = () => {
        setIsDragging(false);
    };

    return [mouseDownHandler, mouseUpHandler, mouseMoveHandler]
}