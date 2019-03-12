import React, {Component} from 'react'


class Pathline extends Component{
    state = {
        hover: false,
        // selected: this.props.selected,
        stroke: 'black',
        strokeWidth: '2',
        tooltip: false,
    }

    enter = () => { 
        this.setState({stroke: 'blue', strokeWidth: '4', tooltip: true})
        this.props.enter(this.props.index)
    }

    exit = () => {
        this.setState({stroke: 'black', strokeWidth: '1', tooltip: false})
    }
    // on mouse enter and props.filter send it up to the parent.
    render(){
        // console.log(this.props.datum)
        const {points,datum,height,selected} = this.props
        let {strokeWidth, stroke, tooltip} = this.state
        if (selected) stroke = "green"
        // figure out how to change the color back on mouse leave
        console.log(height)
        return <>
                <polyline points={points} 
                         style={{fill:'none', stroke : stroke , strokeWidth}} 
                         onMouseEnter={e=>this.enter()}
                         onMouseLeave={e=>this.exit()}
                         />
                {tooltip ? <text x={30} y={height-70} fill="blue">{JSON.stringify(datum)}</text> : null } 
                </>
    }
}


export default Pathline