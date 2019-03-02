import React from 'react'
import ReactDOM from 'react-dom'
import Card from '../shared-components/card.jsx'

const Exercise = ({ match }) => (
    <div className="row">
            <div className="eight columns">
                <div className="tab tab-title">
                    <h1>Veniam labore voluptate ut minim excepteur nulla esse.</h1>
                    <p>
                        Ipsum cillum exercitation esse duis ad ad. Culpa veniam duis laborum mollit sint in est voluptate culpa do sint cillum mollit Lorem.Quis aliquip voluptate elit adipisicing laborum sit aliqua magna exercitation occaecat labore consectetur consectetur fugiat.
                        Ea ea pariatur et cillum labore pariatur id nostrud. Do fugiat commodo ea id officia sint qui est qui dolore in voluptate. Enim voluptate in velit duis. Do duis quis laboris consequat.
                    </p>
                    <div className="title-buttons-group row" style={{textAlign: 'center'}}>
                        <div className="four columns">
                            <div>Працягласць</div>
                            <div>icon 1</div> 
                            <div>30 хв.</div>
                        </div>
                        <div className="four columns">
                            <div>Прадмет</div>
                            <div>icon 2</div> 
                            <div>Біялогія</div>
                        </div>
                        <div className="four columns">
                            <div>Мэтавая група</div>
                            <div>icon 3</div>
                            <div>Падлеткі</div> 
                            
                        </div>
                    </div>


                </div>
                <div className="tab tab-main">
                    Nulla mollit fugiat aliquip tempor magna tempor anim consectetur. Dolore incididunt minim et officia. Sit laboris irure eu velit dolor. Laboris voluptate consequat do incididunt quis ex eu veniam. Nostrud et elit veniam culpa anim duis est amet ea deserunt.
                    Eiusmod elit minim ex ad excepteur labore. Laboris eu dolore id sint sit qui ut tempor eiusmod. Dolore qui consequat sunt id ullamco sunt pariatur amet laboris est exercitation. Dolor velit exercitation adipisicing tempor irure et
                    elit ea est. Qui ullamco ad cupidatat nostrud cupidatat non magna do pariatur consectetur dolor nulla nisi. Pariatur duis amet magna velit. Occaecat mollit consectetur minim voluptate ad do est minim exercitation. Quis ut qui elit
                    laborum. Ipsum dolore nisi enim Lorem ex et reprehenderit dolore occaecat irure veniam commodo cupidatat. Dolore ad occaecat aliquip minim quis. Quis nisi eiusmod do voluptate eu enim consectetur occaecat eu culpa cupidatat officia
                    est. Nulla adipisicing proident in aute labore pariatur. Qui magna exercitation deserunt elit tempor eu velit sunt officia elit consectetur eiusmod mollit. Reprehenderit sit ex amet elit magna cupidatat esse velit consequat sint. Velit
                    consectetur commodo occaecat in. Amet non consectetur duis Lorem. Adipisicing ea cillum laboris exercitation ea aliquip. Elit aute pariatur reprehenderit sit ad. Cillum laborum veniam laboris reprehenderit. Cupidatat aliquip elit minim
                    laborum deserunt. Ullamco veniam eu in non fugiat sit deserunt do est excepteur aliquip. Laboris nostrud sint nisi ea eu. Et dolor commodo nisi incididunt excepteur pariatur. Aliquip et ullamco fugiat magna est enim esse proident consectetur
                    aute. Aute dolore consequat esse mollit occaecat duis quis exercitation aliquip reprehenderit ullamco. Consequat nostrud proident tempor Lorem. Adipisicing elit laborum aliqua duis ullamco qui irure ut voluptate. Culpa nisi aliqua
                    laborum irure. Proident consectetur ipsum adipisicing mollit proident adipisicing amet reprehenderit eiusmod mollit magna. Consequat non ex laboris aliqua culpa et ex laboris anim id reprehenderit ad enim adipisicing. Aliqua non fugiat
                    aute non incididunt mollit laboris do reprehenderit do adipisicing deserunt cupidatat. Do adipisicing ullamco deserunt magna et nostrud dolor mollit minim id irure. Cillum veniam sunt excepteur laboris ex eiusmod proident ad eiusmod
                    ex eu. Occaecat excepteur adipisicing commodo excepteur duis mollit est Lorem deserunt nisi ut dolor eu. Incididunt sit adipisicing ut excepteur in ipsum. Et tempor deserunt labore tempor reprehenderit eiusmod culpa reprehenderit incididunt.
                </div>
            </div>
            <div className="four columns">
                <div className="tab tab-author">
                    <h3>About Author</h3>
                    <div>Here you will see an image</div>
                    <div>FirstName LastName</div>
                    <div className="author-occupation">
                        Adipisicing laboris ex labore esse reprehenderit incididunt commodo nostrud ipsum commodo excepteur velit id deserunt.
                    </div>
                    <div className="author-about">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias deserunt odit fugit dicta ipsam quidem quas tempora, fuga corrupti non amet nisi, labore temporibus voluptas saepe quaerat voluptatibus libero officiis?
                    </div>
                </div>
                <div className="tab tab-hardware">
                    <h3>Hardware</h3>
                    <ul>
                        <li>Irure nulla nisi sit anim excepteur minim ad anim consectetur non ea consectetur.</li>
                        <li>Cillum cillum consectetur proident voluptate nostrud esse labore eiusmod velit laboris cupidatat nisi.</li>
                        <li>Adipisicing sunt esse qui veniam aliquip ut deserunt do aliquip dolor aute sint nostrud.</li>
                    </ul>
                </div>
                <div className="tab tab-tags">
                    <h3>Tags</h3>
                    <ul>
                        <li>#Tag 1</li>
                        <li>#Tag 2</li>
                        <li>#Tag 3</li>
                        <li>#Tag 4</li>
                    </ul>
                </div>
                <div className="tab tab-suggestion">
                    <h3>Suggestions</h3>
                    No suggestions yet:(
                </div>
            </div>
        </div>
);

export default Exercise;