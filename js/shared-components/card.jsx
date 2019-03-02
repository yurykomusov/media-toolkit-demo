import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import './card.scss'

export default function Card(props) {
    if (props.description) {
        return (
            <div className={props.className}>
                <Link to={props.linkTo || "/"}>
                    <div className="pad">
                        <div className="image-container">
                            <h4>{props.title}</h4>
                        </div>
                        <div className="pad-description">
                            {props.description}
                        </div>
                    </div>
                </Link>
            </div>);
    } else {
        return (
            <div className={props.className}> 
                <Link to={props.linkTo || "/"}>
                    <div className="pad">
                        <div className="image-container image-container-full">
                            <h4>{props.title}</h4>
                        </div>
                    </div>
                </Link>
            </div>);
    }
}