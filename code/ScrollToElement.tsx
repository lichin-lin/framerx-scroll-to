import * as React from "react"
import { Frame } from "framer"
import { NotConnected } from "./NotConnected"

export function ScrollToElement(props) {
    const { children, ...restProps } = props

    if (React.Children.count(children) === 0) {
        return <NotConnected prompt="Connect to element" />
    } else {
        return (
            <Frame
                {...restProps}
                id="ScrollToElement"
                background={null}
                width="100%"
                height="100%"
            >
                {children}
            </Frame>
        )
    }
}
