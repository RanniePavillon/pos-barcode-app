import React from 'react';
import { Box, Modal, Skeleton, Slide } from '@mui/material';
import { ArrowLeftIcons } from '../../../core/global/Icons';
import moment from 'moment/moment';

export const TransactionHistory = ({total, transactionData, transactionHistory, setTransactionHistory}) => { 
    
    return (
        <Modal open={transactionHistory.open}
            onClose={()=>setTransactionHistory((prev) => ({...prev, open:false}))}
            sx={{width: '100%', height:'100%'}}
        >
            <Slide in={transactionHistory.open} direction="up" >
                <Box height="100%" width="100%" display="flex" flexDirection="column">
                    <Box minHeight="250px"></Box>
                    <Box bgcolor="#FFFFFF" minHeight="40px" display="flex" justifyContent="space-between" alignItems="center"  px={1.5}>
                        <Box onClick={()=>setTransactionHistory((prev) => ({...prev, open:false}))}><ArrowLeftIcons stroke="#00000061"/></Box>
                        <Box color="#000000DE" fontSize={20} fontWeight={700}>ITEM LIST</Box>
                        <Box></Box>
                    </Box>
                    <Box bgcolor="#FFFFFF" minHeight="20px" width="100%" display="flex" justifyContent="space-between" alignItems="center" p={3} gap={1}>
                        <Box display="flex" alignItems="center" fontSize={16} gap={1}>
                            <Box fontWeight={500}>Date:</Box>
                            <Box>{moment().format('MMMM-DD-YYYY')}</Box>
                        </Box>
                        <Box display="flex" alignItems="center" fontSize={16} gap={1}>
                            <Box fontWeight={500}>Time:</Box>
                            <Box>{moment().format(' h:mm a')}</Box>
                        </Box>
                    </Box>
                    <Box bgcolor="#FFFFFF" minHeight="40px" width="100%" display="flex" alignItems="center" gap={.5} fontWeight={700} fontSize={14} p={1.5} px={3}>
                        <Box width="100%">Name</Box>
                        <Box textAlign="center" minWidth="50px">Qty</Box>
                        <Box pr={1} textAlign="right" minWidth="100px">Price</Box>
                    </Box>
                    {transactionData.isloading && <LoadingComponent/>}
                    <Box bgcolor="#FFFFFF" height="100%" overflow="scroll" px={1.5}>
                        {(!transactionData.isloading) && 
                            <Box height="100%" width="100%" display="flex" flexDirection="column">
                                <Box height="100%" className="overflowY" display="flex" flexDirection="column" gap={1}>
                                    {transactionData.items?.map((v,k) => (
                                        <MapList
                                            key={k}
                                            v={v}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        }
                    </Box>
                    <Box bgcolor="#FFFFFF" minHeight="100px" minWidth="120px" display="flex" alignItems="center" px={3}>
                        <Box width="50%"></Box>
                        <Box width="50%" display="flex" flexDirection="column" gap={.5}>
                            <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" gap="8px">
                                <Box color={'#000000'} fontWeight={700} fontSize={16} lineHeight="16px" textAlign="center">Total:</Box>
                                <Box color={'#000000'} fontWeight={700} fontSize={16} lineHeight="16px" textAlign="center">₱ {parseFloat(total).toFixed(2)}</Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Slide>
        </Modal>
    )
}

const LoadingComponent = React.memo(() => {
    return (
        <Box bgcolor="#FFFFFF" height="100%" width="100%" display="flex" flexDirection="column">
            <Box height="100%" className="overflowY" display="flex" flexDirection="column" gap={1}>
                {['','',''].map((v,k) => (
                    <Box key={k} width="100%" fontSize={12} fontWeight={400} display="flex" alignItems="center" gap={.5} border='1px solid #EBEBEB' borderRadius="4px" p={1.5}> 
                        <Skeleton variant='rectangular' sx={{width:'100%', height:'20px', borderRadius:'2px'}}/>
                    </Box>
                ))}
            </Box>
        </Box>
    );
});

const MapList = React.memo(({ v }) => {
    return (
        <Box width="100%" fontSize={12} fontWeight={400} display="flex" alignItems="center" gap={.5} border='1px solid #EBEBEB' borderRadius="4px" p={1.5}> 
            <Box lineHeight="19px" width="100%" sx={{wordBreak: 'break-word'}} color="#283745">{v.name}</Box>
            <Box textAlign="center" minWidth="50px">{v.qty}</Box>
            <Box textAlign="right" minWidth="100px">₱ {parseFloat(v.price).toFixed(2)}</Box>
        </Box>
    );
});