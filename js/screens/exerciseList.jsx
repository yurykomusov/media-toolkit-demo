import React from 'react'
import ReactDOM from 'react-dom'
import { Card } from '../shared-components/card.jsx'
import ItemsDataProvider from '../services/ItemsDataProvider.js';
import * as _ from '../utils.js';

const DEFAULT_SORT = 'by discipline';

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

        let newKey = selectedKey === currentKey ? null : selectedKey;

        this.setState({ selected: newKey});

        if (this.props.handleChange !== null) {
            this.props.handleChange(currentKey, newKey);
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

        this.itemsDataProvider = new ItemsDataProvider(props.exercises);

        let searchParams = new URLSearchParams(props.location.search);
        this.state = {
            disciplines: props.disciplines,
            ageGroups: props.ageGroups,
            themes: props.themes,
            allSortAndGroup: [
                { "key": "newest", "text": "Новыя"},
                { "key": "oldest", "text": "Старыя"},
                { "key": "by discipline", "text": "Па прадметах"},
                { "key": "by age", "text": "Па мэтавай групе"},
                { "key": "by theme", "text": "Па тэме"}
            ],
            showFilters: searchParams.get('expand') === 'true',
            filterAgeGroup: searchParams.get('ageGroup'),
            filterDisciplines: searchParams.get('discipline'),
            filterThemes: searchParams.get('theme'),
            sortAndGroup: DEFAULT_SORT,
            foundItems: {
                "If you see this we probaly screwed": []
            },
            onAgeGroupFilterChange: (_, newValue) => {
                props.history.push(`/exercise-list/?${this.getNewSearchUrl('ageGroup', newValue).toString()}`)
                this.setState({filterAgeGroup: newValue})
            },
            onDisciplineFilterChange: (_, newValue) => {
                props.history.push(`/exercise-list/?${this.getNewSearchUrl('discipline', newValue).toString()}`)
                this.setState({filterDisciplines: newValue})
            },
            onThemesFilterChange: (_, newValue) => {
                props.history.push(`/exercise-list/?${this.getNewSearchUrl('theme', newValue).toString()}`);
                this.setState({filterThemes: newValue})
            },
            onSortAndGroupChange: (_, newValue) => {
                this.setState({sortAndGroup: newValue})
            }
        }
    }

    getNewSearchUrl(key, value) {
        let url = new URL(window.location)
        let urlParams = new URLSearchParams(url.search);

        if (value !== null)
            urlParams.set(key, value);
        else
            urlParams.delete(key);

        return urlParams;
    }

    getSearchResult(filterAgeGroup, filterDisciplines, filterThemes, sortAndGroup) {
        let searchResult = this.itemsDataProvider
            .newQuery()
            .applyFilter('ageGroup', filterAgeGroup)
            .applyFilter('discipline', filterDisciplines)
            .applyFilter('theme', filterThemes)
            .applyGroupingAndSort(sortAndGroup)
            .executeQuery();

        return Object.keys(searchResult).reduce((accumulator, groupKey) => 
            ({ ...accumulator, [this.getGroupTitleByKey(groupKey, sortAndGroup)]: searchResult[groupKey]}), {});
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
                <SearchResult foundItems={
                    this.getSearchResult(
                        this.state.filterAgeGroup, 
                        this.state.filterDisciplines, 
                        this.state.filterThemes, 
                        this.state.sortAndGroup || DEFAULT_SORT)}>
                </SearchResult>
            </div>);
    }
}

export default ExerciseList;

