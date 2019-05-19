import React from 'react'
import ReactDOM from 'react-dom'
import Card from '../shared-components/card.jsx'
import ItemsDataProvider from '../services/ItemsDataProvider.js';
import { Link } from 'react-router-dom';
import { markdown } from 'markdown';

const createDangerousMarkup = (text) => ({__html: text});

const getAgeGroupTitle = (ageGroupKey, ageGroups) => {
    return (ageGroups.find(i => i.key === ageGroupKey)).text;
}

const getThemeTitle = (themeKey, themes) => {
    return (themes.find(i => i.key === themeKey)).text;
}

const Exercise = ({exercise, themes, ageGroups}) => (
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
                            <div>{getAgeGroupTitle(exercise.ageRange, ageGroups)}</div>
                        </div>
                    </div>


                </div>
                <div className="tab tab-main" dangerouslySetInnerHTML={createDangerousMarkup(markdown.toHTML(exercise.text))}/>
            </div>
            <div className="four columns">
                <div className="tab tab-author">
                    <h3>Аўтар</h3>
                    <p>
                        {/* <img src={userpic} style={{width: "100%"}}></img> */}
                    </p>
                    <p>{exercise.firstName + ' ' + exercise.lastName || ''}</p>
                    <div className="author-occupation">
                        
                    </div>
                    <div className="author-about">
                        
                    </div>
                </div>
                <div className="tab tab-hardware">
                    <h3>Абсталяванне</h3>
                    {exercise.requirements}
                </div>
                <div className="tab tab-tags">
                    <h3>Тэгі</h3>
                    <ul>
                        {exercise.themes.map((theme) => <li key={theme}><Link to={`/exercise-list/?theme=${theme}`}>{`#` + getThemeTitle(theme, themes)}</Link></li>)}
                        <hr/>
                        {exercise.methods.map((method) => <li key={method}><Link to={`exercise-lie/?method=${method}`}>{`#` + method}</Link></li>)}
                    </ul>
                </div>
                <div className="tab tab-links">
                    <h3>Спасылкі</h3>
                    <ul>
                        {exercise.links.map(lnk => <li key={lnk.url}><a href={lnk.url}>{lnk.name}</a></li>)}
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