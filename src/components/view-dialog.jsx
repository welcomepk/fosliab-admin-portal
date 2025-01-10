import PropTypes from "prop-types"
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid2';
import { Slide } from "@mui/material";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ViewDialog({ title, open, onClose, renderViewData }) {

    return (
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="custom-title"
            open={open}
            maxWidth="lg"
            TransitionComponent={Transition}
            keepMounted
        >
            <DialogTitle sx={{
                m: 0, p: 2,
                backgroundColor: "#d8107b",
                color: "#fff",
                textAlign: "center"
            }} id="custom-title">
                {title}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: "#fff",
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                {
                    <div className="p-4">
                        <div className="row">
                            {renderViewData()}
                        </div>
                    </div>
                }
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="error" autoFocus onClick={onClose}>
                    CLOSE
                </Button>
            </DialogActions>
        </BootstrapDialog>

    );
}


ViewDialog.propTypes = {
    title: PropTypes.string, open: PropTypes.bool, onClose: PropTypes.func, renderViewData: PropTypes.func
}