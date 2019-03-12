import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };
  

class Header extends Component{
    render(){
        const { classes } = this.props;
        return (
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <Button color="inherit" onClick={e=>this.props.fetchTable('marathon')}>marathon</Button>
                <Button color="inherit" onClick={e=>this.props.fetchTable('cis2012')}>cis2012</Button>
                <Button color="inherit" onClick={e=>this.props.fetchTable('cis2012_with_age')}>cis2012_with_age</Button>
                <Button color="inherit" onClick={()=>this.props.resetChart()}>Reset Chart</Button>
              </Toolbar>
            </AppBar>
          </div>
        );    
    }
}



// export default Header;




// function ButtonAppBar(props) {
  
// }

// Header.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(Header);