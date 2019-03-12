import React, {Component} from 'react'



class yAxis extends Component {
    labelMaker = () => {
        const {min,max,values,x,height,margins} = this.props
        const chartHeight = (height-margins.top-150)
        const labels = []
        if(this.props.numeric){
            console.log(min, max)
            const range = max-min
            // make 5 
            for(let i=0;i<=5;i++){
                const ration = i/5 
                const value = (ration * range) + min
                const y= (height-150)-(ration*chartHeight)
                labels.push(<circle cx={x} cy={y} r={5}/>)
                if(i===0) y = y-10
                labels.push(<text x={x+5} y={y+5} fill="red">{value.toFixed(2)}</text>)
            }
            // make your labels numeric based on a range using min & max
        } else {
            for (let i=0; i<values.length;i++){
                const ration = i/values.length
                const y = (height-150)-(ration*chartHeight) //+ ((1/values.length)*chartHeight)
                labels.push(<circle key={i*200} cx={x} cy={y} r={5}/>)
                if(i===0) y = y-10
                labels.push(<text key={i+100*1.07} x={x+5} y={y+5}>{values[i]}</text>)

            }
            // make labels for each category using the top/bottom as the range and i/array.length*range as the 
        }
        return labels;
    }

    render(){
        const {min, max, x, height, numeric, values, margins } = this.props
        if (numeric){
            // given min, max, height, and margins build a vertical line with words describing the range
            // calculate the steps in the range.
                // from min to max
                // calculate the y for each value and put it in a <text>, place it on x +5
                // put a circle on the line at x,y
            // place the vertical bar on x, from height-150 to topMargin
            // return (
            //     <line x1={x} x2={x} y1={margins.top} y2={height-150} style={{stroke:'rgb(0,0,0)',strokeWidth:2}}/>
            // )
        } else {
            // given values, height, and margins build a vertical line with words describing the values
            // build the words
                // top = topMargin
                // bottom = height-150
                // i = ( bottom - top ) / values.length
                // iterate from 0 to to bottom by i placing the values and a dot for each one. 
            // draw line from marginTop to bottom 
            // return (null)
        }


        return (
            <>
            {this.labelMaker()}

            <line x1={x} x2={x} y1={margins.top} y2={height-150} style={{stroke:'rgb(0,0,0)',strokeWidth:2}}/>
            </>
        )
    }

}


export default yAxis