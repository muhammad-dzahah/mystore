import React from "react";
import axios from "axios";
import { Modal, Button, Card, Container, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Navbar from "../component/Navbar";

export default class User extends React.Component {
    constructor() {
        super()
        this.state = {
            id: 0,
            email: "John@gmail.com",
            username:'johnd',
            password:'m38rmF$',
            users: [],
            action: "",
            isModalOpen: false
        }
    }
    getUser = async () => {
        let url = "https://fakestoreapi.com/users"
        await axios
        .get(url)
        .then(response => { 
            this.setState({users: response.data})
            console.log(response.data)
        })
        .catch(error => {
            console.log(error);
        })
    }
    componentDidMount = () => {
        this.getUser()
    }
    handleClose = () => {
        this.setState({
            isModalOpen: false
        })
    }
    handleAdd = () =>{
        this.setState({
            email:"John@gmail.com",
            username:"johnd",
            password:"m38rmF$",
            isModalOpen: true,
            action: "insert"
        })
    }
    handleEdit = (item) =>{
        this.setState({
            email:item.email,
            username:item.username,
            password:item.password,
            isModalOpen: true,
            action: "update"
        })
    }
    handleSave = (event) =>{
        event.preventDefault();
        
        let form = {
            id_member: this.state.id_member,
            nama: this.state.nama,
            alamat: this.state.alamat,
            jenis_kelamin: this.state.jenis_kelamin,
            tlp: this.state.tlp
        }
        
        if(this.state.action === "insert"){
            let url = "https://fakestoreapi.com/users"
            axios.post(url, form)
            .then(response => {
                this.handleClose()
                this.getUser()
                console.log(response.data) 
                window.alert("data masuk")
            })
            .catch(error => {
                console.log(error);
            })
        }else if(this.state.action === "update"){
            let url = "https://fakestoreapi.com/users/7"
            axios.put(url, form)
            .then(response => {
                window.alert(response.data.message)
                this.getUser()
                console.log(response)
            })
            .catch(error => {
                console.error();
            })
        } 
    }
    handleDelete = (id) => {
        let url = "https://fakestoreapi.com/users/" + id
        if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
          axios.delete(url)
          .then(response => {
            this.getUser();
            console.log(response)
            window.alert('data terhapus')
          })
          .catch(error => {
            console.log(error);
          })
        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <Container className="my-4">
                    <Card className="card shadow">
                        <Card.Body className="card-body">
                            <h2 className="text-black text-center my-4">
                                List of User
                            </h2>
                            <br />
                            <div className="">
                                <Button className="btn btn-success shadow my-3 mx-3" onClick={() => this.handleAdd()}>
                                    Add Member
                                </Button>
                            </div>

                            <ul className="list-group mx-3">
                                {this.state.users.map(user =>(
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-5 col-sm-4">
                                            <small className="text-secondary">Email :</small>
                                            <h6>{user.email}</h6>
                                        </div>
                                        <div className="col-lg-3 col-md-5 col-sm-4">
                                            <small className="text-secondary">Name :</small>
                                            <h6>{user.name.firstname} {user.name.lastname}</h6>
                                        </div>
                                        <div className="col-lg-3 col-md-5 col-sm-4">
                                            <small className="text-secondary">Username :</small>
                                            <h6>{user.username}</h6>
                                        </div>
                                        <div className="col-lg-3 col-md-5 col-sm-8">
                                            <small className="text-secondary">Address :</small> <br />
                                            <h6>{user.address.street} No.{user.address.number}</h6>
                                        </div>
                                        <div className="col-lg-3 col-md-5 col-sm-8">
                                            <small className="text-secondary">City :</small> <br />
                                            <h6>{user.address.city}</h6>
                                        </div>
                                        <div className="col-lg-2 col-md-5 col-sm-8">
                                            <small className="text-secondary">Telephon :</small> <br />
                                            <h6>{user.phone}</h6>
                                        </div>
                                        <div className="col-lg-2 col-md-12 col-sm-4">
                                            <button className="btn btn-sm btn-warning m-2" onClick={() => this.handleEdit(user)}>
                                                <AiFillEdit style={{color: "white"}}/>
                                            </button>
                                            <button className="btn btn-sm btn-danger m-2" onClick={() => this.handleDelete(user.id)}>
                                                <MdDelete style={{color: "white"}}/>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                                ))}
                            
                            </ul>
                        </Card.Body>
                    </Card>
                </Container>

                <Modal show={this.state.isModalOpen} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Form New User</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSave}>
                        <Modal.Body>
                            <Form.Group className="mb-2">
                                <Form.Label>email</Form.Label>
                                <Form.Control type="text" value={this.state.email} 
                                onChange={ev => this.setState({email: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>username</Form.Label>
                                <Form.Control type="text" value={this.state.username} 
                                onChange={ev => this.setState({username: ev.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>password</Form.Label>
                                <Form.Control type="text" value={this.state.password} 
                                onChange={ev => this.setState({password: ev.target.value})} />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="primary" type="submit" onClick={this.handleClose}>
                                    Submit
                                </Button>
                            </div>
                        </Modal.Body>
                    </Form>
                </Modal>
            </div>
        );
    }
}
