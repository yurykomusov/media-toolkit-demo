import React from 'react'
import ReactDOM from 'react-dom'
import Card from '../shared-components/card.jsx'
import userpic from '../../img/userpic.jpg'

const Exercise = ({ exercise }) => (
    <div className="row">
            <div className="eight columns">
                <div className="tab tab-title">
                    <h1>{exercise.title}</h1>
                    <p>
                        {exercise.summary}
                    </p>
                    <div className="title-buttons-group row" style={{textAlign: 'center'}}>
                        <div className="four columns">
                            <div>Працягласць</div>
                            <div>icon 1</div> 
                            <div>{exercise.length} хв.</div>
                        </div>
                        <div className="four columns">
                            <div>Прадмет</div>
                            <div>icon 2</div> 
                            <div>{exercise.discipline}</div>
                        </div>
                        <div className="four columns">
                            <div>Мэтавая група</div>
                            <div>icon 3</div>
                            <div>Падлеткі</div>                             
                        </div>
                    </div>


                </div>
                <div className="tab tab-main">
                    {exercise.text.map((line, index) => <p key={index}>{line}</p>)}
                </div>
            </div>
            <div className="four columns">
                <div className="tab tab-author">
                    <h3>Аб аўтары</h3>
                    <p><img src={userpic} style={{width: "100%"}}></img></p>
                    <p>{exercise.firstName + ' ' + exercise.lastName}</p>
                    <div className="author-occupation">
                        Adipisicing laboris ex labore esse reprehenderit incididunt commodo nostrud ipsum commodo excepteur velit id deserunt.
                    </div>
                    <div className="author-about">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias deserunt odit fugit dicta ipsam quidem quas tempora, fuga corrupti non amet nisi, labore temporibus voluptas saepe quaerat voluptatibus libero officiis?
                    </div>
                </div>
                <div className="tab tab-hardware">
                    <h3>Абсталяванне</h3>
                    {exercise.requirements}
                </div>
                <div className="tab tab-tags">
                    <h3>Тэгі</h3>
                    <ul>
                        <li>#Tag 1</li>
                        <li>#Tag 2</li>
                        <li>#Tag 3</li>
                        <li>#Tag 4</li>
                    </ul>
                </div>
                <div className="tab tab-suggestion">
                    <h3>Парады</h3>
                    No suggestions yet:(
                </div>
            </div>
        </div>
);

export default Exercise;