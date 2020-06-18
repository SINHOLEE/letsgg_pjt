import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const BlackButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText("#000000"),
      backgroundColor: "#000000",
      '&:hover': {
        backgroundColor: "#000000",
      },
    },
  }))(Button);

 export default BlackButton;