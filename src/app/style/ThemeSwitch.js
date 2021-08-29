import React, { Component } from 'react';
import { Button } from 'reactstrap';
import {withTranslation} from "react-i18next";


class ThemeSwitch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: 'false'
        };
        this.store = typeof localStorage === 'undefined' ? null : localStorage;

        this.css = `
            html { filter: invert(100%); background: #fefefe; }
             * { background-color: inherit }
            img:not([src*=".svg"]), video { filter: invert(100%) }`;
    }

    componentDidMount() {
        if (this.store) {
            this.setState({
                active: this.store.getItem('ThemeSwitch')  || false
            });
        }
    }
    componentDidUpdate() {

        if (this.store) {
            this.store.setItem('ThemeSwitch', this.state.active);
        }
    }




    isActive = () => this.state.active;

    toggle = () => {
        this.setState({
            active: !this.isActive(),
        });
    }

    render() {
        const { t } = this.props;

        return (
            <div>

                <Button size="sm" color="primary" aria-pressed={this.state.active} onClick={this.toggle}>
                    {t("Night_mode")}:
                    <span aria-hidden="true">
                        {this.state.active ? 'on' : 'off'}
                    </span>
                </Button>{' '}
                <style media={this.state.active ? 'none' : 'screen'}>
                    {this.state.active ? this.css.trim() : this.css}
                </style>
            </div>
        );
    }
}

export default withTranslation() (ThemeSwitch)