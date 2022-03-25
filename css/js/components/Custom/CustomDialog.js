import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';


const DialogContent = withStyles((theme) => ({
}))(MuiDialogContent);


const CustomDialog = (props) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(props.openDialog);
  }, [props.openDialog], )

  const handleClose = () => {
    props.handleClickClose();

  };

  return (
    <div>
      <Dialog maxWidth={props.maxMd && 'md'} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogContent dividers autoFocus onClick={() => handleClose()}>
          {props.children}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CustomDialog;