import React from 'react'
import ReactDOM from 'react-dom'
import Card from '../shared-components/card.jsx'
import userpic from '../../img/userpic.jpg'
import ItemsDataProvider from '../services/ItemsDataProvider.js';
import { Link } from 'react-router-dom';
import { markdown } from 'markdown';

const createDangerousMarkup = (text) => ({__html: text});

const getAgeGroupTitle = (ageGroupKey, json) => {
    return (json['all-age-groups'].find(i => i.key === ageGroupKey)).text;
}

const getThemeTitle = (themeKey, json) => {
    return (json['all-themes'].find(i => i.key === themeKey)).text;
}

const Exercise = ({exercise, json}) => (
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
                            <div>{getAgeGroupTitle(exercise.ageRange, json)}</div>                             
                        </div>
                    </div>


                </div>
                <div className="tab tab-main" dangerouslySetInnerHTML={createDangerousMarkup(markdown.toHTML(exercise.text.join('\n')))}/>
            </div>
            <div className="four columns">
                <div className="tab tab-author">
                    <h3>Аўтар</h3>
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
                        {exercise.themes.map((theme) => <li key={theme}><Link to={`/exercise-list/?theme=${theme}`}>{`#` + getThemeTitle(theme, json)}</Link></li>)}
                        <hr/>
                        {exercise.methods.map((method) => <li key={method}><Link to={`exercise-lie/?method=${method}`}>{`#` + method}</Link></li>)}
                    </ul>
                </div>
                <div className="tab tab-suggestion">
                    <h3>Парады</h3>
                    {exercise.tips}
                </div>
            </div>
        </div>
);

export default Exercise;