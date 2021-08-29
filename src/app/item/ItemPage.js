import React, {Component} from "react";
import AppNavbar from "../collection elements/AppNavbar";
import BackendService from "../services/BackendService";
import {Alert, Form, FormGroup, Input, Label, Toast, ToastBody, ToastHeader} from "reactstrap";
import {withTranslation} from "react-i18next";

class ItemPage extends Component {

    constructor(props) {
        super(props);

        this.state={
            item: '',
            comment: '',
            likesAmount: 0,
            comments: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getItemById();
        this.timerID = setInterval(
            () => this.getItemById(),
            5000
        );
        BackendService.getItemLike(this.props.match.params.idItem)
            .then( response => {
                this.setState({
                    likesAmount: response.data
                });
            });
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    getItemById () {
        BackendService.getItemById(this.props.match.params.idItem)
            .then( response => {
                    this.setState({
                        item: response.data,
                        comments: response.data.comments
                    });
                }, error => {
                    console.log(error);
                    this.setState({
                        error: error.toString()
                    });
                }
            )
    }

    handleSubmit(event) {
        event.preventDefault();

        BackendService.addComment( {
            text: this.state.comment,
            id_item: this.state.item.id
        })
            .then(response => {
                this.getItemById();
            })
            .catch(err=>{
            });
    }

    themesrow(){
        return this.state.comments.map((comment) =>
            <Toast>
                <ToastHeader>
                    {comment.id}
                </ToastHeader>
                <ToastBody>
                    {comment.text}
                </ToastBody>
            </Toast>
        );
    }

    handleChange(e) {
        console.log(e.target.name,e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    addLike(id) {

        BackendService.addLike(id)
            .then(response => {
                this.setState({
                    likesAmount: response.data
                })
            })
            .catch(err=>{
            });
    }

    render() {
        const { t } = this.props;
        return(
            <div>
                <AppNavbar/>
                <main>
                    <div className="container">
                        <div className="row g-5">
                            <div className="col-md-12 col-lg-12">
                                <div className="p-3 my-2 rounded bg-docs-transparent-grid">
                                    <Toast>
                                        <ToastHeader>
                                            {t("Information_about_item")}:
                                        </ToastHeader>
                                        <ToastBody>
                                            {t("Name")}:{this.state.item.name}
                                        </ToastBody>
                                        <button variant="dark" className="btn btn-outline-primary" onClick={() => this.addLike(this.state.item.id)}>{this.state.likesAmount} {t("Like")}</button>
                                    </Toast>
                                </div>
                                <div className="p-3 my-2 rounded">
                                    <Label for="exampleName">{t("Comments")}</Label>
                                    {this.themesrow()}
                                </div>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Label for="exampleName">{t("Comments")}</Label>
                                        <textarea class="form-control" onChange={this.handleChange} value={this.state.comment}
                                               name="comment" id="exampleComment"  />
                                    </FormGroup>
                                    <p><button type="submit" className="btn btn-primary">{t("Send")}</button></p>
                                </Form>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }


}
export default withTranslation() (ItemPage)