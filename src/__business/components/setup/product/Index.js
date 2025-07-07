import { useContext } from "react"
import { Container } from "@mui/material"
import { List } from "./List"
import { Form } from "./Form"
import { ToolContext } from "../../../../core/context/ToolContext"

export const Products = ({match}) => {
    const { product_state } = useContext(ToolContext)
    
    return (
        <Container sx={{color:"#000000"}}>
            {match.params.params === 'list' ? 
                <List {...product_state} />
            :
                <Form {...product_state}/>
            }
        </Container>
    )
}