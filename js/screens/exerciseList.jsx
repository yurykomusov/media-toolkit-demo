import React from 'react'
import ReactDOM from 'react-dom'
import Card from '../shared-components/card.jsx'
import ItemsDataProvider from '../ItemsDataProvider.js';
import * as _ from '../utils.js';

class FilterList extends React.Component {
    constructor(props) {
        super(props);

        this.onItemClick = this.onItemClick.bind(this);
        this.state = {
            selected: props.selected,
            handleChange: props.handleChange
        }
    }

    getActiveClassName(isSelected) {
        if (isSelected)
            return "selected";
        else
            return "";
    }

    render() {
        return (
        <ul>
            {this.props.items.map(i =>
                <li data-key={i.key} key={i.key} onClick={this.onItemClick}>
                    <a className={this.getActiveClassName(i.key == this.state.selected)}>{i.text}</a>
                </li>)}
        </ul>);
    }

    onItemClick(e) {
        let selectedKey = e.currentTarget.dataset.key;
        let currentKey = this.state.selected;
        if (selectedKey !== currentKey) {
            this.setState({ selected: selectedKey});

            if (this.props.handleChange !== null) {
                this.props.handleChange(currentKey, selectedKey);
            }
        }
    }
}

const FilterBox = (props) => (
    <div className="row">
        <div className="three columns">
            <label>Прадметы</label>
            <FilterList items={props.disciplines} selected={props.filterDisciplines} handleChange={props.onDisciplineFilterChange}></FilterList>
        </div>
        <div className="three columns">
            <label>Мэтавыя групы</label>
            <FilterList items={props.ageGroups} selected={props.filterAgeGroup} handleChange={props.onAgeGroupFilterChange}>
            </FilterList>
        </div>
        <div className="three columns">
            <label>Тэмы</label>
            <FilterList items={props.themes} selected={props.filterThemes} handleChange={props.onThemesFilterChange}></FilterList>
        </div>
        <div className="three columns">
            <label>Згрупаваць па</label>
            <FilterList items={props.allSortAndGroup} selected={props.sortAndGroup} handleChange={props.onSortAndGroupChange}>
            </FilterList>
        </div>
    </div>
);

const SearchResultGroup = ({title, items}) => (
    <React.Fragment>
        <h4 className="section-title">{title}</h4>
        {_.chunk(items, 4).map((chunk, index) => 
            <div className="row" key={`title_${index}`}>
                {chunk.map(item => <Card className="three columns" key={item.id} title={item.title} description={item.summary} linkTo={`/exercise/${item.id}`}></Card>)}
            </div>)}
    </React.Fragment>    
)

const SearchResult = ({foundItems}) => {
    if (Object.keys(foundItems).length == 0) {
        return <span>Не знойдзена ніводнага практыкавання:( Паспрабуйце пашукаць па іншых крытэрыях</span>
    } else {
        return Object.keys(foundItems).map(groupName => <SearchResultGroup key={groupName} title={groupName} items={foundItems[groupName]}></SearchResultGroup>)
    }
}

class ExerciseList extends React.Component {
    constructor(props) {
        super(props);

        this.itemsDataProvider = new ItemsDataProvider(props.json['items']);

        let searchParams = new URLSearchParams(props.location.search);
        this.state = {
            disciplines: [
                { "key": "manandtheworld", "text": "Чалавек і свет" },
                { "key": "arts", "text": "Мастацтва" },
                { "key": "geography", "text": "Геаграфія" },
                { "key": "biology", "text": "Біялогія" },
                { "key": "history", "text": "Гісторыя" },
                { "key": "educational", "text": "Выхаваўчы занятак" }
            ],
            ageGroups: [
                { "key": "elementary", "text": "Дзеці" },
                { "key": "primary", "text": "Падлеткі" },
                { "key": "adults", "text": "Дарослыя" }
            ],
            themes: [
                { "key": "factchecking", "text": "Факт чэкінг" },
                { "key": "mediagenres", "text": "Жанры медыя" },
                { "key": "mediasources", "text": "Крыніцы інфармацыі і іх надзейнасць" },
                { "key": "infosearch", "text": "Пошук інфармацыi" },
                { "key": "medialanguage", "text": "Мова медыя" },
                { "key": "mediadecoding", "text": "Дэкадаванне медыятэкстаў" },
                { "key": "mediacreation", "text": "Стварэнне, апрацоўка, прэзентацыя" },
                { "key": "pii", "text": "Ахова персанальных дадзеных" },
                { "key": "security", "text": "Інфармацыйная бяспека" },
                { "key": "disinformation", "text": "Дэзінфармацыя" },
                { "key": "infosourcing", "text": "Пошук і збор інфармацыі" }
            ],
            allSortAndGroup: [
                { "key": "newest", "text": "Новыя"},
                { "key": "oldest", "text": "Старыя"},
                { "key": "bydiscipline", "text": "Па прадметах"},
                { "key": "byage", "text": "Па мэтавай групе"}
            ],
            showFilters: searchParams.get('expand') === 'true',
            filterAgeGroup: searchParams.get('ageGroup'),
            filterDisciplines: searchParams.get('discipline'),
            filterThemes: searchParams.get('theme'),
            sortAndGroup: "by discipline",
            foundItems: {
                "Nothing was found": []
            },
            onAgeGroupFilterChange: (_, newValue) => {
                window.location = `/exercise-list/?${this.getNewSearchUrl('ageGroup', newValue).toString()}`;
                
                // this.setState({filterAgeGroup: newValue})                
                // this.setState({foundItems: this.getSearchResult()});
            },
            onDisciplineFilterChange: (_, newValue) => {
                window.location = `/exercise-list/?${this.getNewSearchUrl('discipline', newValue).toString()}`;
                // this.setState({filterDisciplines: newValue})
                // this.setState({foundItems: this.getSearchResult()});
            },
            onThemesFilterChange: (_, newValue) => {
                window.location = `/exercise-list/?${this.getNewSearchUrl('theme', newValue).toString()}`;
                // this.setState({filterThemes: newValue})
                // this.setState({foundItems: this.getSearchResult()});
            },
            onSortAndGroupChange: (_,newValue) => {
                // this.setState({sortAndGroup: newValue})
                // this.setState({foundItems: this.getSearchResult()});
            }
        }
    }

    getNewSearchUrl(key, value) {
        let url = new URL(window.location)
        let urlParams = new URLSearchParams(url.search);

        urlParams.set(key, value);
        urlParams.set('expand', true);

        return urlParams;
    }

    componentDidMount() {
        this.setState({foundItems: this.getSearchResult()});
    }

    getSearchResult() {
        let searchResult = this.itemsDataProvider
            .applyFilter('ageGroup', this.state.filterAgeGroup)
            .applyFilter('discipline', this.state.filterDisciplines)
            .applyFilter('theme', this.state.filterThemes)
            .applyGroupingAndSort(this.state.sortAndGroup)
            .executeQuery();

        return Object.keys(searchResult).reduce((accumulator, groupKey) => 
            ({ ...accumulator, [this.getGroupTitleByKey(groupKey, this.state.sortAndGroup)]: searchResult[groupKey]}), {});
    }

    getGroupTitleByKey(key, groupBy) {
        if (groupBy === 'newest') 
            return 'З ранніх';
        if (groupBy === 'oldest') 
            return 'З апошніх';
        if (groupBy === 'by discipline')
            return this.state.disciplines.find(i => i.key === key).text
        
        if (groupBy === 'by theme')
            return this.state.themes.find(i => i.key === key).text

        if (groupBy === 'by age')
            return this.state.ageGroups.find(i => i.key === key).text
    }


    render() {
        return (
            <div>
                <h2>Практыкаванні</h2>
                <button onClick={() => this.setState({ showFilters: !this.state.showFilters})}>Фільтры</button>
                {this.state.showFilters
                    ? <FilterBox {...this.state}></FilterBox>
                    : null}
                <SearchResult foundItems={this.state.foundItems}></SearchResult>
            </div>);
    }
}


export default ExerciseList;

