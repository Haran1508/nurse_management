import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import $ from "jquery";
import ModalForm from "../Modals/Modal";
import "datatables.net-dt/js/dataTables.dataTables.min.mjs";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

class DataTable extends Component {
  deleteItem = (id) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      fetch("http://localhost:3000/api/crud", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      })
        .then((response) => response.json())
        .then((item) => {
          this.props.deleteItemFromState(id);
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    const items = this.props.items.map((item) => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.name}</td>
          <td>{item.license_number}</td>
          <td>{item.dob}</td>
          <td>{item.age}</td>
          <td>
            <div style={{ width: "110px" }}>
              <ModalForm
                buttonLabel="Edit"
                item={item}
                updateState={this.props.updateState}
              />{" "}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>
                Del
              </Button>
            </div>
          </td>
        </tr>
      );
    });

    return (
      // <Table responsive hover>
      //   <thead>
      //     <tr>
      //       <th>ID</th>
      //       <th>Name</th>
      //       <th>License Number</th>
      //       <th>Date of Birth</th>
      //       <th>Age</th>
      //       <th>Actions</th>
      //     </tr>
      //   </thead>
      //   <tbody>{items}</tbody>
      // </Table>
      <div className="card-body">
        <table
          className="table table-striped my-3"
          id="table"
          // ref={tableRef}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>License Number</th>
              <th>Date of Birth</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{items}</tbody>
        </table>
      </div>
    );
  }
}

export default DataTable;
