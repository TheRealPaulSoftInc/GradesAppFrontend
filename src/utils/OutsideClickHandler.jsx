import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideHandler(ref, handleEvent) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    // Bind the event listener
    function handleMouseUp(e) {
      if (ref.current && !ref.current.contains(e.target)) handleEvent();
    }
    function handleEnterKey(e) {
      if (e.key === "Enter") handleEvent();
    }
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keypress", handleEnterKey);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keypress", handleEnterKey);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideClickHandler(props) {
  const wrapperRef = useRef(null);
  useOutsideHandler(wrapperRef, props.handleEvent);

  return <div ref={wrapperRef}>{props.children}</div>;
}

OutsideClickHandler.propTypes = {
  children: PropTypes.element.isRequired,
};

export default OutsideClickHandler;
