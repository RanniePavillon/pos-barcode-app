import { useState } from "react"

export const ToolCategoryState = () => {
    const [toolCategories, setToolCategories] = useState([])
    const [toolsPerCategories, setToolPerCategories] = useState(null)
    const [isLoader, setIsLoader] = useState(false)

    return {
        toolCategories: {data: toolCategories, set: setToolCategories},
        toolsPerCategories: {data: toolsPerCategories, set: setToolPerCategories},
        isLoader: {data: isLoader, set: setIsLoader}
    }
}