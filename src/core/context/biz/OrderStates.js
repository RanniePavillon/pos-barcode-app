import { useState } from "react"

export const OrderState = () => {
    const [results, setResults] = useState([]);

    const [cart, setCart] = useState([])

    return {
        cart: {data: cart, set: setCart},
        results: {data: results, set: setResults},
    }
}