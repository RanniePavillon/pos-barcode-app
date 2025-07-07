import { Menu, MenuItem, Box, Divider } from '@mui/material';
// import QRCode from "react-qr-code";
import { useBarcode } from '@createnextapp/react-barcode'

export const PMenu = ({mdata, setMdata }) => {
  
    const closeMenuHandler = () => {
        setMdata({anchor:null, value:[]})
    }
    
    const downloadHandler = () => {
        // QR CODE
        // const svgContent = document.querySelector('#posQRcode');
        // let svgData = new XMLSerializer().serializeToString( svgContent );
        // let canvas = document.createElement("canvas");
        // let ctx = canvas.getContext("2d");
        // const width = 300; // Adjust width as needed
        // const height = 300; // Adjust height as needed
        //  canvas.width = width;
        // canvas.height = height;
        // ctx.fillStyle = '#ffffff'
        // ctx.fillRect(0, 0, width, height);

        // //display image
        // let img = document.createElement( "img" );
        // img.setAttribute( "src", "data:image/svg+xml;base64," + btoa( svgData ) );
        // img.onload = function() {
        //     const offsetX = (canvas.width - img.width) / 2;
        //     const offsetY = (canvas.height - img.height) / 2;
        //     ctx.drawImage( img, offsetX, offsetY );
        //     //image link
        //      let pngUrl = canvas.toDataURL( "image/png" )
        //     let downloadLink = document.createElement("a");
        //     downloadLink.href = pngUrl;
        //     downloadLink.download = `${mdata.value.name}.png`;
        //     document.body.appendChild(downloadLink);
        //     downloadLink.click();
        //     document.body.removeChild(downloadLink);
        // };

        // BARCODE
        const canvas = document.getElementById("posBarcode");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${mdata.value.name}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    // BARCODE
    const { inputRef } = useBarcode({
        value: mdata.value.barcode,
        options: {
            background: '#FFFFFF',
            textAlign: 'center'
        }
    });
    
    return ( 
        <>
            {/* QR CODE */}
            {/* {Boolean(mdata.anchor) && (
                <QRCode 
                    style={{display:'none'}}
                    renderingIntent="canvas"
                    id="posQRcode"
                    value={mdata.value.barcode}
                />
            )} */}

            {/* BARCODE */}
            <canvas style={{display:'none'}} id="posBarcode" ref={inputRef} />

            {/*  */}
            <Menu
                onClose={closeMenuHandler}
                onClick={closeMenuHandler}
                anchorEl={mdata.anchor}
                open={Boolean(mdata.anchor)}
                autoFocus={false}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <MenuItem sx={{height:'24px', px:'24px !important', py:'0px !important'}}>
                    <Box fontWeight={400} fontSize={14} lineHeight="16px" color="#283745">Edit</Box>
                </MenuItem>
                <Divider sx={{bgcolor:'#E9F0FB', my:'4px !important'}} />
                <MenuItem sx={{height:'24px', px:'24px !important', py:'0px !important'}} onClick={()=>downloadHandler()}>
                    <Box fontWeight={400} fontSize={14} lineHeight="16px" color="#283745">Download Barcode</Box>
                </MenuItem>
            </Menu>
        </>
    );
}