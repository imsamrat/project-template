import { Button } from "@material-ui/core";
import { styled } from "@material-ui/styles";

const RoundedButton = styled(Button)((props) => ({
    background: `${props.outlined ? '#fff' : '#343C97'}`,
    color: `${props.outlined ? '#343C97' : '#fff'}`,
    border: `1px solid ${props.outlined ? '#343C97' : 'transparent'}`,
    padding: '5px 15px',
    textTransform: 'capitalize',
    fontSize: 15,
    fontWeight: 500,
    fontFamily: "'Poppins', sans-serif",
    borderRadius: 36,
    '&:hover': {
        background: `${props.outlined ? '#fff' : '#343C97fd'}`,
    },
    '&:disabled': {
        background: '#ccc'
    }
}))
export default RoundedButton;