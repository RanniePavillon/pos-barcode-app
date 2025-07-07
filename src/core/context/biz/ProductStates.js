import { useState } from "react"

export const ProductState = () => {
    const [pLoader, setPLoader] = useState(true)
    const [pdata, setPdata] = useState(
        [
            {id:1, name:'Kangkong', qty:1, price:5.00, barcode:'00000001'},
            {id:2, name:'Kalabasa', qty:1, price:15.00, barcode:'00000002'},
            {id:3, name:'Labanos', qty:1, price:25.00, barcode:'00000003'},
        ]
    )

    return {
        pLoader: {data: pLoader, set: setPLoader},
        pdata: {data: pdata, set: setPdata}
    }
}