import React, { useState, useEffect, Component } from "react"
import Modal from "./Modal"
import Axios from "axios"
import links from "../../links.json"
import ReactLoading from "react-loading"

const Services = () => {
  const [loader, setLoader] = useState(true)
  const [tdata, setTdata] = useState([])
  useEffect(() => {
    Axios.get(links.home + links.services, {
      params: { society_id: 1 },
      headers: {
        Authorization: `token ${links.token}`,
      },
    })
      .then((res) => {
        setTdata(res.data)
        setLoader(false)
      })
      .catch((err) => console.log("Error", err))
  }, [])

  const [modal, setModal] = useState(false)
  const [NewData, setNewData] = useState({
    name: "",
    contact: "",
    designation: "",
  })

  const handleNew = () => {
    setModal(true)
  }

  return (
    <>
      <div className="container">
        <div className="h1 p-4">Service</div>
        <div className="d-flex justify-content-center">
          {loader ? (
            <ReactLoading type="bars" color="black" height={55} width={90} />
          ) : (
            ""
          )}
        </div>
        <div className="row col-md-1 offset-md-10">
          <button
            className="m-2 btn btn-primary"
            data-toggle="modal"
            data-target="#Service_New"
            onClick={() => handleNew()}
          >
            + Add New
          </button>
          {modal ? <Modal data={NewData} type="addnew" from="Services" /> : ""}
        </div>
        <div className="members">
          <table id="members" className="table">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Contact</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              {tdata.map((t) => (
                <TableData key={t.name} mem={t} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

class TableData extends Component {
  state = {
    data: {
      name: this.props.mem.name,
      contact: this.props.mem.contact,
      desig: this.props.mem.designation,
    },
    modal: { Edit: false, Delete: false },
  }

  handleEdit = () => {
    console.log(this.state)
    this.setState({ modal: { Edit: true, Delete: false } })
  }

  handleDelete = () => {
    console.log("From Delete: ", this.state)
    this.setState({ modal: { Edit: false, Delete: true } })
  }

  render() {
    return (
      <>
        <tr>
          <td>{this.state.data.name}</td>
          <td>{this.state.data.desig}</td>
          <td>{this.state.data.contact}</td>
          <td>
            <button
              type="button"
              class="btn btn-warning btn-sm"
              data-toggle="modal"
              data-target="#Services_Edit"
              onClick={() => {
                this.handleEdit()
              }}
            >
              Edit
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              data-toggle="modal"
              data-target="#Services_Delete"
              style={{ marginLeft: "5px" }}
              onClick={() => {
                this.handleDelete()
              }}
            >
              Delete
            </button>
          </td>
        </tr>
        {this.state.modal.Edit ? (
          <Modal data={this.state.data} type="edit" from="Services" />
        ) : (
          ""
        )}
        {this.state.modal.Delete ? (
          <Modal data={this.state.data} type="delete" from="Services" />
        ) : (
          ""
        )}
      </>
    )
  }
}

export default Services
