import React from 'react';
import ReactToPrint from 'react-to-print';
import PDFlayout from "./PDFlayout"
 
class ExportPDF extends React.Component{
     
    render() {
      return (
        <div className="box">
          <PDFlayout projects={this.props.projects} tasks={this.props.tasks}ref={(response) => (this.componentRef = response)} />
          
          <ReactToPrint
            content={() => this.componentRef}
            trigger={() => <button className="btn btn-primary">Print to PDF!</button>}
          />
        </div>
      );
    }
}
 
export default ExportPDF;