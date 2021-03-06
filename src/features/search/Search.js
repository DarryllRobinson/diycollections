import PropTypes from 'prop-types';
import _ from 'lodash';
import React, { Component } from 'react';
import { Search, Grid, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { collectionService } from '../collections/collection.service';
import { userService } from '../users/user.service';

const categoryLayoutRenderer = ({ categoryContent, resultsContent }) => (
  <div>
    <h3 className="name">{categoryContent}</h3>
    <div className="results">{resultsContent}</div>
  </div>
);

categoryLayoutRenderer.propTypes = {
  categoryContent: PropTypes.node,
  resultsContent: PropTypes.node,
};

const categoryRenderer = ({ name }) => (
  <Label className="categoryRenderer" as="span" content={name} />
);

categoryRenderer.propTypes = {
  name: PropTypes.string,
};

const resultRenderer = ({ customername, casenumber }) => (
  <Label
    as={Link}
    to={`/collection/${casenumber}`}
    className="resultRenderer"
    content={customername}
  />
);

resultRenderer.propTypes = {
  title: PropTypes.string,
  customername: PropTypes.string,
};

const initialState = {
  isLoading: false,
  value: '',
  results: [],
  source: null,
  records: null,
};

export default class SearchComponent extends Component {
  state = initialState;

  async componentDidMount() {
    //console.log('SearchComponent props: ', this.props);
    if (this.props.records) {
      //console.log('Got records from props: ', this.props.records);
      // Once records have been set in state, call the next function
      this.setState({ records: this.props.records }, () => {
        this.setSource();
      });
    } else {
      //console.log('I need to load records: ', this.props);
      this.loadRecords();
    }
  }

  async loadRecords() {
    this.setState(
      {
        records: await collectionService.getAll(),
      },
      () => {
        this.setSource();
      }
    );
  }

  setSource() {
    this.setState({
      source: {
        global: { name: 'global', results: this.getGlobalResults() },
        agent: { name: 'agent', results: this.getAgentResults() },
      },
    });
  }

  getGlobalResults() {
    const { records } = this.state;
    //console.log('getGlobalResults: ', records);
    if (records) return records.map((x) => this.recordsFields(x));
  }

  getAgentResults() {
    const { records } = this.state;
    const user = userService.userValue;
    let agentRecords = [];

    if (records) {
      //console.log('records: ', records);
      records.forEach((record) => {
        if (record.currentAssignment === user.email) agentRecords.push(record);
      });
      return agentRecords.map((x) => this.recordsFields(x));
    }
  }

  recordsFields(record) {
    const {
      customerRefNo,
      customerName,
      regIdNumber,
      amountDue,
      accountNumber,
      creditLimit,
      currentBalance,
      debtorAge,
      totalBalance,
      caseNotes,
      caseNumber,
      currentAssignment,
      currentStatus,
      nextVisitDateTime,
      resolution,
      updatedAt,
      updatedBy,
    } = record;

    return {
      title: customerRefNo,
      customername: customerName,
      regidnumber: regIdNumber,
      amountdue: amountDue,
      accountnumber: accountNumber,
      creditlimit: creditLimit,
      currentbalance: currentBalance,
      debtorage: debtorAge,
      totalbalance: totalBalance,
      casenotes: caseNotes,
      casenumber: caseNumber,
      currentassignment: currentAssignment,
      currentstatus: currentStatus,
      nextvisitdatetime: nextVisitDateTime,
      resolution,
      updatedat: updatedAt,
      updatedby: updatedBy,
    };
  }

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.customername });

  handleSearchChange = (e, { value }) => {
    //const searchTerms = ['customerRefNo', 'customerName', 'regIdNumber'];

    this.setState({ isLoading: true, value });

    setTimeout(async () => {
      if (this.state.value.length < 1) {
        this.setState({
          isLoading: false,
          value: '',
          results: [],
          source: null,
        });
        this.loadRecords();
        this.setSource();
      }

      //console.log('value: ', this.state.value);
      let searchTerms = [];
      this.state.records.forEach((record) => {
        searchTerms.push({
          title: record.customerRefNo,
          customername: record.customerName,
        });
      });
      //console.log('searchTerms: ', searchTerms);
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => re.test(result.customername);

      const filteredResults = _.reduce(
        this.state.source,
        (memo, data, name) => {
          const results = _.filter(data.results, isMatch);
          if (results.length) memo[name] = { name, results }; // eslint-disable-line no-param-reassign

          //console.log('memo: ', memo);
          return memo;
        },
        {}
      );
      //console.log('filteredResults: ', filteredResults);

      this.setState({
        isLoading: false,
        results: filteredResults,
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = this.state;

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
      </Grid>
    );
  }
}
