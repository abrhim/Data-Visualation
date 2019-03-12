import React, { Component } from 'react';
import axios from 'axios'
// import logo from './logo.svg';
import Header from './header.js'
import Xaxis from './xaxis.js'
import Yaxis from './yaxis.js'
import Pathline from './Pathline.js'
import './App.css';


class App extends Component {
  // have variable for the menu item for a table to select

  // have a way to have the pathlines report whenever the mouse goes over them. 
  // have a running list of lines that are being filtered on, onMouseUp, if the lines are NOT in the list they 
  // rectangle... grab the down point and the current point, and then calculate using the points line to determine if the line is touching the 

  constructor(props) {
    super(props);
    this.state = { 
      width: 0, 
      height: 0, 
      data: {
        rows: [], 
        columns: []
      }, 
      filtering: false,
      filtered: [],
      filteringArray: [],
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  // grab data
  fetch = (table) => {
    axios.get(`http://localhost:3004/coords?table=${table}`)
      .then(({data})=>{
        // console.log(data)
        this.setState({data, filtering: false, filtered: [] }, ()=>console.log(this.state))
      })
  }


  pathlineEnter = (index) => {
    if(this.state.filtering){
      const tempFiltered = [...this.state.filteringArray]
      tempFiltered.push(index)
      this.setState({filteringArray: tempFiltered})
    }
  }

  resetChart = () => {
    this.reset()
  }

  reset = () => {
    this.setState({filter: false, filtered: [], filteringArray: []})
  }

  fetchTable = (table) => {
    this.reset()
    this.fetch(table)
  }

  mouseDown = () => {
    this.setState({filtering: true },()=>console.log(this.state))
  }
  mouseUp = () => {
    this.setState({
      filtering: false, 
      filter: true, 
      filteringArray: [], 
      filtered: [...this.state.filteringArray] },
      ()=>console.log(this.state)
      )
  }

  render() {
    const { height, width, data:{columns,rows}, } = this.state

    const margins = {
      left: 30,
      top: 40
    }

    return (
      <>
        <Header fetchTable={this.fetchTable} resetChart={this.resetChart} />
        <svg height={height} width={width} onMouseDown={()=>this.mouseDown()} onMouseUp={()=>this.mouseUp()} >
        {columns.map((el,i,array)=>{
          return <Yaxis 
                    key={i*.02} 
                    margins={margins} 
                    height={this.state.height} 
                    x={(i/array.length)*(width-margins.left)+margins.left} 
                    numeric={el.data_type!=="character varying"} 
                    values={el.meta}
                    min={el.meta.min}
                    max={el.meta.max}
                  />
          })}

          <Xaxis margins={margins} height={height} width={width} columns={columns}/>

          {/* draw the data lines!! */}
           {rows.map((datum,index)=>{
            const chartHeight = (height-margins.top-150)
            let points = ""
            let ration = 0
            columns.forEach((column,i)=>{
              // caculate x based off of the number of columns
              const x = (i/columns.length) * (width-margins.left)+margins.left
            // calculate y based off of the value compared against the min/max
              let y = 0
              if(column.data_type!=='character varying'){
                const range = column.meta.max - column.meta.min 
                ration = (datum[column.column_name] - column.meta.min) / range
                y = (height-150)-(ration*chartHeight)
              } else {
                const range = column.meta.length
                // get index of the value in the list of distinct values
                ration = column.meta.indexOf(datum[column.column_name]) / range
                y = (height-150)-(ration*chartHeight)
              }

              points+= `${x},${y} `
            })
            if (this.state.filter && this.state.filtered.indexOf(index) < 0) {
              return null
            }
             return <Pathline 
                              datum={datum}
                              points={points} 
                              index={index}
                              chartHeight={chartHeight}
                              height = {height}
                              ration={ration}
                              selected={this.state.filteringArray.indexOf(index) >= 0}
                              enter={this.pathlineEnter}
                              />

          })}

        </svg>
      </>
      )
  }
}


export default App;
