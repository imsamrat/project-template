import { Button } from "@material-ui/core";
import { styled } from "@material-ui/styles";

const CustomButton = styled(Button)({
    background: '#FF428D',
    color: '#fff',
    padding: '11px 35px',
    textTransform: 'capitalize',
    fontSize: 18,
    fontWeight: 700,
    position: 'relative',
    transform: 'perspective(1px) translateZ(0)',
    transitionProperty: 'color',
    transitionDuration: '0.3s',
    overflow: 'hidden',
    fontFamily: "'Montserrat', sans-serif",
    borderRadius: 3,
    '&:before': {
        content: '""',
        position: 'absolute',
        zIndex: -1,
        top: '50%',
        left: '50%',
        height: 600,
        width: 600,
        transform: 'translate(-50%,-50%) scale(0)',
        transformOrigin: 'center center',
        transition: 'transform 0.5s',
        background: '#343C97',
        borderRadius: '50%',
    },
    '&:hover': {
        background: '#FF428D',
        '&:before': {
            transform: 'translate(-50%,-50%) scale(1)',
            transformOrigin: 'center center'
        }
    },
    '&:disabled': {
        background: '#ccc'
    }
})
export default CustomButton;