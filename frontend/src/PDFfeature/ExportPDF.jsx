import React from "react";
import ReactToPrint from "react-to-print";
import PDFlayout from "./PDFlayout";

class ExportPDF extends React.Component {
  render() {
    return (
      <div className="export">
        <div className="box">
          <div className="around-button">
          <ReactToPrint
            content={() => this.componentRef}
            trigger={() => <button className="button">Print PDF</button>}
          /></div>
        <PDFlayout
          projects={this.props.projects}
          tasks={this.props.tasks}
          ref={(response) => (this.componentRef = response)}
        /></div>
      </div>
    );
  }
}

export default ExportPDF;
