import React, {Component} from 'react'


class xAxis extends Component{

    columnsMaker = () =>{
        if(this.props.columns){
        // return a list of column heading in a <text> tag with the proper x,y's
        return this.props.columns.map((el,i)=>{
                const x = (i / this.props.columns.length) * (this.props.width-this.props.margins.left) + this.props.margins.left
                return <text key={i} x={x} y={this.props.height-100} className="small"> {el.column_name} </text>
            })
        }
    }
    render(){
        const {height, width, columns, margins} = this.props
        // console.log(columns)
        // line
        // vertical lines at placements of each column
        // name of each column
        // console.log(this.props)
        // console.log("HELLO")

        return (
            <>
            {this.columnsMaker()}
            <line x1={margins.left} y1={height-150} x2={width - margins.left} y2={height-150} style={{stroke:'rgb(0,0,0)',strokeWidth:3}}/>
            {/* <line x1={margins.left} y1={margins.top} x2={width - margins.left} y2={margins.top} style={{stroke:'rgb(0,0,0)',strokeWidth:3}}/> */}

            </>
        )
    }
}


export default xAxis