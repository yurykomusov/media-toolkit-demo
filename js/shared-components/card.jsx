import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import './card.scss'

export function Card(props) {
    if (props.description) {
        return (
            <div className={props.className}>
                <Link to={props.linkTo || "/"}>
                    <div className="card">
                        <div className="card-image flex-column-space-between">
                            <h2>{props.title}</h2>
                            <span>{props.subtitle}</span>
                        </div>
                        <div>
                            {props.description}
                        </div>
                    </div>
                </Link>
            </div>);
    } else {
        return (
            <div className={props.className}> 
                <Link to={props.linkTo || "/"}>
                    <div className="card card-full">
                        <div className="card-image card-image-full text-center">
                            <h2>{props.title}</h2>
                        </div>
                    </div>
                </Link>
            </div>);
    }
}

export class CardImage extends React.Component {
    render() {
        return (
            <div className={this.props.className}> 
                <Link to={this.props.linkTo || "/"}>
                    <div className="card card-full" style={{backgroundImage: "url(" +  this.props.imageUrl +  ")", backgroundSize: "cover"}}>
                        <div className="card-image card-image-full text-center" style={{background: "rgba(0,0,0,.2)"}}>
                            <h2 style={{color: "#F0F3F4" }}>{this.props.title}</h2>
                        </div>
                    </div>
                </Link>
            </div>);
    }
}