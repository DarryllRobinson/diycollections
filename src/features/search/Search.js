import PropTypes from 'prop-types';
import _ from 'lodash';
import faker from 'faker';
import React, { Component } from 'react';
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react';

import { collectionService } from '../collections/collection.service';

const categoryLayoutRenderer = ({ categoryContent, resultsContent }) => (
  <div>
    <h3 className="name">{categoryContent}</h3>
    <div style={{ background: 'red' }} className="results">
      {resultsContent}
    </div>
  </div>
);

categoryLayoutRenderer.propTypes = {
  categoryContent: PropTypes.node,
  resultsContent: PropTypes.node,
};

const categoryRenderer = ({ name }) => <Label as="span" content={name} />;

categoryRenderer.propTypes = {
  name: PropTypes.string,
};

const resultRenderer = ({ customerName }) => <Label content={customerName} />;

resultRenderer.propTypes = {
  customerName: PropTypes.string,
  description: PropTypes.string,
};

const initialState = {
  isLoading: false,
  value: '',
  results: [],
  records: null,
  source: null,
};

/*const oldsource = _.range(0, 3).reduce((memo) => {
  const name = faker.hacker.noun();
  console.log('name: ', name);

  // eslint-disable-next-line no-param-reassign
  memo[name] = {
    name,
    results: getResults(),
  };

  console.log('memo: ', memo);
  return memo;
}, {});*/

export default class SearchExampleCategory extends Component {
  state = initialState;

  async componentDidMount() {
    this.setState({
      records: await collectionService.getAll(),
    });
    this.setState({
      source: {
        global: { name: 'global', results: this.getResults() },
        agent: { name: 'agent', results: this.getResults() },
      },
    });
  }

  getResults() {
    const { records } = this.state;

    if (records) {
      console.log('records: ', records);
      return records.map((x) => this.recordsFields(x));
    }
  }

  recordsFields(record) {
    const { customerName } = record;

    return { customerName };
  }

  handleResultSelect = (e, { result }) => {
    //console.log('handleResultSelect: ', result);
    this.setState({ value: result.customerName });
  };

  handleSearchChange = (e, { value }) => {
    console.log('handleSearchChange: value: ', value);
    console.log(
      'this.state.source.global.results: ',
      this.state.source.global.results
    );
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => re.test(result.customerName);

      const filteredResults = _.reduce(
        this.state.source,
        (memo, data, name) => {
          const results = _.filter(data.results, isMatch);
          if (results.length) memo[name] = { name, results }; // eslint-disable-line no-param-reassign

          return memo;
        },
        {}
      );

      this.setState({
        isLoading: false,
        results: filteredResults,
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results, source } = this.state;

    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            category
            categoryLayoutRenderer={categoryLayoutRenderer}
            categoryRenderer={categoryRenderer}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            resultRenderer={resultRenderer}
            results={results}
            value={value}
          />
        </Grid.Column>
        <Grid.Column width={8}>
          <Segment>
            <Header>State</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(this.state, null, 2)}
            </pre>
            <Header>Options</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(source, null, 2)}
            </pre>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
