import React, {Component} from 'react';
import {Alert} from "reactstrap";
import BackendService from "../services/BackendService";
import AppNavbar from "../collection elements/AppNavbar";

import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";


class TableItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name:'',
            items:[]

        };
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        BackendService.getItemByCollectionId(this.props.match.params.id,{
            name: this.state.name
        })

            .then(response => {
                this.setState({
                    items: response.data
                })
                console.log(response.data)
            }).catch(err=>{
            console.log(err);
        });
    }

    removeById(id) {
        BackendService.removeItemById(id)
            .then( response => {
                const isNotId = item => item.id !== id;
                const updatedItems = this.state.items.filter(isNotId);
                this.setState({ items: updatedItems });
            });
    }

    // handleSubmit(event) {
    //     event.preventDefault();
    //
    //
    //     BackendService.getItemByCollectionId(this.props.match.params.id,{
    //         name: this.state.name
    //     })
    //
    //         .then(response => {
    //             this.setState({
    //                 items: response.data
    //             })
    //             console.log(response.data)
    //         }).catch(err=>{
    //         console.log(err);
    //     });
    // }



    tablerow(){


        return this.state.items.map((item) =>
            <tr>
                <th scope="row">{item.id}</th>
                <td><Link to={`/viewItem/${item.id}`}>{item.name}</Link></td>
                <td>
                    <div>
                        <Link to={`/editCollection/${this.props.match.params.id}/editItems/${item.id}`}>
                            <button type="button" className="btn btn-success">Edit item</button>
                        </Link>

                        <button type="button" className="btn btn-primary"
                                   onClick={() => this.removeById(item.id)}>Delete</button>
                    </div>
                </td>
            </tr>
        );
    }

    render() {
        const { t } = this.props;
        return(
            <div>
                <AppNavbar/>
                <Alert color="primary">
                    {t("Item_table")}:
                </Alert>
                <table className="table">
                    <thead>
                    <tr>
                        <th>{t("id")}</th>
                        <th>{t("Name_Item")}</th>
                        <th>{t("Actions")}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.tablerow()}
                    </tbody>
                </table>

            </div>
        )
    }
}

export default withTranslation() (TableItem)