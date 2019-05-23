import * as React from "react"
import { useState, useEffect } from "react"
import {
    addPropertyControls,
    ControlType,
    Scroll,
    MotionValue,
    motionValue,
    useMotionValue,
    useAnimation,
} from "framer"
import { NotConnected } from "./NotConnected"

export const ScrollToContainer = props => {
    const { children, duration, scrollTo, ...restProps } = props
    if (React.Children.count(children) === 0) {
        return <NotConnected prompt="Connect to scrollable content" />
    } else {
        const controls = useAnimation()
        const controlHandler = () => {
            let containerH =
                document.getElementById("scrollContainer").clientHeight | 0
            let contentH = (children[0].props.height - containerH) | 0
            controls.start({
                y: scrollTo === "top" ? 0 : -contentH,
                transition: { duration },
            })
        }
        useEffect(() => {
            let el = document.getElementById("ScrollToElement")
            el.addEventListener("click", () => controlHandler(), false)
        })
        return (
            <Scroll
                {...restProps}
                id="scrollContainer"
                width="100%"
                height="100%"
                scrollAnimate={controls}
            >
                {children}
            </Scroll>
        )
    }
}
ScrollToContainer.defaultProps = {
    offset: 0,
    duration: 0.3,
    scrollTo: "top",
    direction: "vertical",
    overflow: "hidden",
    wheelEnabled: true,
}

addPropertyControls(ScrollToContainer, {
    duration: {
        type: ControlType.Number,
        title: "duration",
        min: 0,
        max: 5,
        step: 0.1,
    },
    scrollTo: {
        type: ControlType.Enum,
        defaultValue: "top",
        options: ["top", "bottom"],
        optionTitles: ["top", "bottom"],
    },
})
