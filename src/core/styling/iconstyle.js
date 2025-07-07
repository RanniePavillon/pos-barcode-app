import { makeStyles } from "@mui/styles"

export const IconStyles = () => {
    let s = makeStyles(theme => ({
        closeStyle: {
            cursor: "pointer",
            marginRight: "24px",
            border: "2px solid #11cef0",
            borderRadius: "4px",
            color: "#11cef0",
            textTransform: 'none!important', '&:hover': {
                backgroundColor: 'red!important'
            }
        },

        editStyle: {
            marginTop: "6px",
            // color: "#003539",
            cursor: "pointer",
            // border: "solid 1px #008080",
            borderRadius: "4px",
            textTransform: 'none!important', '&:hover': {
                backgroundColor: '#6ef5f3!important',
                 color: "#003539",
                 border: "solid 2px #008080",
            }
        },

        addStyle: {
            fontWeight: "bold",
            cursor:"pointer",
            color: "white",
            border: "2px solid #f2f7f5 ",
            borderRadius: 10,
            textTransform: 'none!important',
            '&:hover': { backgroundColor: '#6ef5f3!important' }
        }
    }))
    return s()
}