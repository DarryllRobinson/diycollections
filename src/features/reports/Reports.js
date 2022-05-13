import React from 'react';
import {
  Button,
  Checkbox,
  Container,
  Grid,
  Header,
  Message,
  Segment,
  Sidebar,
} from 'semantic-ui-react';

import { Report } from './Report';
import CustomBar from './CustomBar';
import CustomLine from './CustomLine';
import CustomTable from './CustomTable';
import { reportService } from './report.service';

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: {
        ids: ['agentActivity', 'aging', 'agentPTP', 'datePTP'],
        entities: {
          aging: {
            data: null,
            description: 'Amount owed per period',
            title: 'Aging',
            type: 'bar',
          },
          agentPTP: {
            data: null,
            description: 'PTP sum per agent',
            title: 'PTP by Agent',
            type: 'bar',
          },
          datePTP: {
            data: null,
            description: 'PTP sum per date',
            title: 'PTP by Date',
            type: 'bar',
          },
          agentActivity: {
            data: null,
            description: 'Agent Activity per Customer',
            title: 'Agent Activity',
            type: 'table',
          },
        },
      },
      selected: null,
      visible: true,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.loadData();
    this.interval = setInterval(() => this.loadData(), 30 * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  loadData() {
    const reportList = this.state.reports.ids;

    reportList.forEach(async (report) => {
      const reportObject = this.state.reports.entities[report];
      reportObject.data = null;
      //console.log('report', report);
      this.setState({ ...this.state, reportObject });

      const reportData = await reportService.getReport(report);
      //console.log('reportData', report, reportData);

      // Check if report type <> table as tables are prepped differently
      if (reportObject.type !== 'table') {
        reportObject.data = this.prepChartData(reportData);
        //console.log('reportObject: ', reportObject);
        this.setState({ ...this.state, reportObject });
      } else if (reportObject.type === 'table') {
        reportObject.data = reportData;
        //console.log('reportObject: ', reportObject);
        this.setState({ ...this.state, reportObject });
      }
    });
  }

  prepChartData(data) {
    let tempArray = [];

    if (data.length === 1) {
      for (const [key, value] of Object.entries(data[0])) {
        let tempObj = {};
        tempObj.name = key;
        tempObj.value = value;
        tempArray.push(tempObj);
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        const obj = Object.entries(data[i]);
        let tempObj = {};
        for (const [key, value] of Object.entries(obj)) {
          if (key === '0') {
            tempObj.name = value[1];
          }
          if (key === '1') {
            tempObj.value = value[1];
          }
        }
        tempArray.push(tempObj);
      }
    }

    return tempArray;
  }

  customChartRender() {
    const reports = this.state.reports;
    //const { styleType } = this.props;

    const reportsDisplay = reports.ids.map((report, idx) => {
      if (reports.entities[report].type === 'bar') {
        return (
          <div
            key={idx}
            style={{
              paddingBottom: '15px',
            }}
          >
            <Button
              onClick={() => {
                this.setState({ selected: report, visible: false });
              }}
              style={{
                backgroundColor: 'white',
                border: '1px solid black',
                paddingBottom: '15px',
              }}
            >
              <Grid.Column width={4} style={{ padding: 0 }}>
                {reports.entities[report].data && (
                  <CustomBar
                    chartNumber={idx}
                    data={reports.entities[report].data}
                    description={reports.entities[report].description}
                    styleType="sidebar"
                    title={reports.entities[report].title}
                  />
                )}
                {!reports.entities[report].data && (
                  <div key={idx}>
                    <Grid.Column width={4} style={{ padding: 0 }}>
                      <div className="ui active inverted dimmer">
                        <div className="ui text loader">Loading</div>
                      </div>
                      <p></p>
                    </Grid.Column>
                  </div>
                )}
              </Grid.Column>
            </Button>
          </div>
        );
      } else if (reports.entities[report].type === 'line') {
        return (
          <div key={idx}>
            <Grid.Column width={4} style={{ padding: 0 }}>
              {reports.entities[report].data && (
                <CustomLine
                  chartNumber={idx}
                  data={reports.entities[report].data}
                  description={reports.entities[report].description}
                  styleType="sidebar"
                  title={reports.entities[report].title}
                />
              )}
              {!reports.entities[report].data && (
                <div key={idx}>
                  <Grid.Column width={4} style={{ padding: 0 }}>
                    <div className="ui active inverted dimmer">
                      <div className="ui text loader">Loading</div>
                    </div>
                    <p></p>
                  </Grid.Column>
                </div>
              )}
            </Grid.Column>
          </div>
        );
      } else if (reports.entities[report].type === 'table') {
        return (
          <div
            key={idx}
            style={{
              paddingBottom: '15px',
            }}
          >
            <Button
              onClick={() => {
                this.setState({ selected: report, visible: false });
              }}
              style={{
                backgroundColor: 'white',
                border: '1px solid black',
                paddingBottom: '15px',
              }}
            >
              <Grid.Column width={4} style={{ padding: 0 }}>
                <CustomTable
                  chartNumber={idx}
                  data={reports.entities[report].data}
                  description={reports.entities[report].description}
                  styleType="sidebar"
                  title={reports.entities[report].title}
                />
              </Grid.Column>
            </Button>
          </div>
        );
      } else {
        return <div key={idx}> No report type found</div>;
      }
    });

    return reportsDisplay;
  }

  refreshButtonRender() {
    return (
      <Message>
        Auto-refresh every 30 minutes or{' '}
        <Button
          onClick={() => {
            this.loadData();
          }}
          primary
        >
          Reload
        </Button>
        <Checkbox
          checked={this.state.visible}
          label={{ children: <p>Show report selection</p> }}
          onChange={(e, data) => this.setVisible(data.checked)}
        />
      </Message>
    );
  }

  selectedChartRender() {
    if (this.state.selected) {
      const reportObject = this.state.reports.entities[this.state.selected];
      const { data, description, title, type } = reportObject;
      //console.log('reportObject: ', reportObject);

      return (
        <Report
          data={data}
          description={description}
          report={this.state.selected}
          styleType="main"
          title={title}
          type={type}
        />
      );
    } else {
      return <div>Please select a report</div>;
    }
  }

  setVisible(event) {
    this.setState({ visible: event });
  }

  render() {
    return (
      <Container fluid>
        <Grid columns={1} divided stackable textAlign="center">
          <Grid.Column>{this.refreshButtonRender()}</Grid.Column>
          <Grid.Column>
            <Sidebar.Pushable as={Segment}>
              <Sidebar
                as={Segment}
                animation="overlay"
                color="grey"
                icon="labeled"
                onHide={() => this.setVisible(false)}
                vertical
                visible={this.state.visible}
                width="wide"
              >
                <Header as="h2">Report Selection</Header>
                {this.customChartRender()}
              </Sidebar>
              <Sidebar.Pusher style={{ height: '100vh' }}>
                {this.selectedChartRender()}
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Reports;
