import React, {Component} from 'react';
import {Alert} from "reactstrap";
import BackendService from "../services/BackendService";
import AppNavbar from "../collection elements/AppNavbar";

import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";


class ViewTableItem extends Component {

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
                <main role="main" className="container">
                    <div className="jumbotron">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>{t("id")}</th>
                                <th>{t("Name_Item")}</th>

                            </tr>
                            </thead>
                            <tbody>
                            {this.tablerow()}
                            </tbody>
                        </table>
                        <p></p>
                    </div>
                </main>

            </div>
        )
    }
}

export default withTranslation() (ViewTableItem)