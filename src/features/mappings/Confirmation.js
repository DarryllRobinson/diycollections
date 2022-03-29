import React, { Component } from 'react';
import {
  Container,
  Grid,
  Header,
  Segment,
  Button,
  List,
} from 'semantic-ui-react';

class Confirmation extends Component {
  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.save();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: {
        operatorShortCode,
        customerRefNo,
        customerName,
        customerEntity,
        regIdNumber,
        customerType,
        productType,
        address1,
        address2,
        address3,
        address4,
        address5,
        closedDate,
        regIdStatus,
        f_clientId,

        // account
        accountNumber,
        accountName,
        openDate,
        debtorAge,
        paymentTermDays,
        creditLimit,
        totalBalance,
        amountDue,
        currentBalance,
        days30,
        days60,
        days90,
        days120,
        days150,
        days180,
        days180Over,
        paymentMethod,
        paymentDueDate,
        debitOrderDate,
        lastPaymentDate,
        lastPaymentAmount,
        lastPTPDate,
        lastPTPAmount,
        accountNotes,
        accountStatus,
        arg,
        tenant,
        createdBy,
        updatedBy,
        f_customerRefNo,

        // contact
        primaryContactName,
        primaryContactNumber,
        primaryContactEmail,
        representativeName,
        representativeNumber,
        representativeEmail,
        alternativeRepName,
        alternativeRepNumber,
        alternativeRepEmail,
        otherNumber1,
        otherNumber2,
        otherNumber3,
        otherNumber4,
        otherNumber5,
        otherNumber6,
        otherNumber7,
        otherNumber8,
        otherNumber9,
        otherNumber10,
        otherEmail1,
        otherEmail2,
        otherEmail3,
        otherEmail4,
        otherEmail5,
        otherEmail6,
        otherEmail7,
        otherEmail8,
        otherEmail9,
        otherEmail10,
        dnc1,
        dnc2,
        dnc3,
        dnc4,
        dnc5,
        f_accountNumber,
      },
    } = this.props;

    return (
      <Container>
        <Header textAlign="center">
          <h1>Confirm Customer Details</h1>
          <p>
            Click Confirm if the following details have been correctly entered
          </p>
        </Header>

        <Grid stackable columns={3}>
          <Grid.Column>
            <Segment>
              <List divided relaxed>
                <List.Item>
                  <List.Icon name="id card outline" size="large" />
                  <List.Content>
                    Operator Short Code: {operatorShortCode}
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="id card outline" size="large" />
                  <List.Content>
                    Customer Reference Number: {customerRefNo}
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="user outline" size="large" />
                  <List.Content>Customer Name: {customerName}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="user outline" size="large" />
                  <List.Content>Customer Entity: {customerEntity}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="user outline" size="large" />
                  <List.Content>
                    Registration Number: {regIdNumber}
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="user outline" size="large" />
                  <List.Content>Customer Type: {customerType}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="user outline" size="large" />
                  <List.Content>Product Type: {productType}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="building outline" size="large" />
                  <List.Content>Address Line 1: {address1}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="building outline" size="large" />
                  <List.Content>Address Line 2: {address2}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="building outline" size="large" />
                  <List.Content>Address Line 3: {address3}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="building outline" size="large" />
                  <List.Content>Address Line 4: {address4}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="building outline" size="large" />
                  <List.Content>Address Line 5: {address5}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="calendar outline" size="large" />
                  <List.Content>Closed Date: {closedDate}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="user outline" size="large" />
                  <List.Content>Reg ID Status: {regIdStatus}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="user outline" size="large" />
                  <List.Content>Client ID: {f_clientId}</List.Content>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment>
              <List divided relaxed>
                <List.Item>
                  <List.Icon name="money bill alternate outline" size="large" />
                  <List.Content>Account Number: {accountNumber}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="money bill alternate outline" size="large" />
                  <List.Content>Account Name: {accountName}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="calendar outline" size="large" />
                  <List.Content>Open Date: {openDate}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="calendar outline" size="large" />
                  <List.Content>Debit Age: {debtorAge}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="money bill alternate outline" size="large" />
                  <List.Content>
                    Payment Term Days: {paymentTermDays}
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="money bill alternate outline" size="large" />
                  <List.Content>Credit Limt: {creditLimit}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="money bill alternate outline" size="large" />
                  <List.Content>Total Balance: {totalBalance}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="money bill alternate outline" size="large" />
                  <List.Content>Amount Due: {amountDue}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="money bill alternate outline" size="large" />
                  <List.Content>Current Balance: {currentBalance}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="money bill alternate outline" size="large" />
                  <List.Content>30 Days: {days30}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="money bill alternate outline" size="large" />
                  <List.Content>60 Days: {days60}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="money bill alternate outline" size="large" />
                  <List.Content>90 Days: {days90}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="money bill alternate outline" size="large" />
                  <List.Content>120 Days: {days120}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="money bill alternate outline" size="large" />
                  <List.Content>150 Days: {days150}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="money bill alternate outline" size="large" />
                  <List.Content>180 Days: {days180}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="money bill alternate outline" size="large" />
                  <List.Content>Over 180 Days: {days180Over}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="money bill alternate outline" size="large" />
                  <List.Content>Payment Method: {paymentMethod}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="calendar outline" size="large" />
                  <List.Content>
                    Payment Due Date: {paymentDueDate}
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="calendar outline" size="large" />
                  <List.Content>
                    Debit Order Date: {debitOrderDate}
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="calendar outline" size="large" />
                  <List.Content>
                    Last Payment Date: {lastPaymentDate}
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="calendar outline" size="large" />
                  <List.Content>
                    Last Payment Date: {lastPaymentAmount}
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="calendar outline" size="large" />
                  <List.Content>Last PTP Date: {lastPTPDate}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="money bill alternate outline" size="large" />
                  <List.Content>Last PTP Amount: {lastPTPAmount}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="sticky note outline" size="large" />
                  <List.Content>Account Notes: {accountNotes}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="dashboard" size="large" />
                  <List.Content>Account Status: {accountStatus}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="dashboard" size="large" />
                  <List.Content>ARG: {arg}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="id card outline" size="large" />
                  <List.Content>Tenant: {tenant}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="user outline" size="large" />
                  <List.Content>Created By: {createdBy}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="user outline" size="large" />
                  <List.Content>Updated By: {updatedBy}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="user outline" size="large" />
                  <List.Content>
                    f_customerRefNo: {f_customerRefNo}
                  </List.Content>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment>
              <List divided relaxed>
                <List.Item>
                  <List.Icon name="male" size="large" />
                  <List.Content>
                    Primary Contact Name: {primaryContactName}
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="phone" size="large" />
                  <List.Content>
                    Primary Contact Number: {primaryContactNumber}
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="mail" size="large" />
                  <List.Content>
                    Primary Contact Email: {primaryContactEmail}
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="male" size="large" />
                  <List.Content>
                    Representative Name: {representativeName}
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="phone" size="large" />
                  <List.Content>
                    Representative Number: {representativeNumber}
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="mail" size="large" />
                  <List.Content>
                    Representative Email: {representativeEmail}
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="male" size="large" />
                  <List.Content>
                    Alternative Representative Name: {alternativeRepName}
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="phone" size="large" />
                  <List.Content>
                    Alternative Representative Number: {alternativeRepNumber}
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="mail" size="large" />
                  <List.Content>
                    Alternative Representative Email: {alternativeRepEmail}
                  </List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="phone" size="large" />
                  <List.Content>Other Number 1: {otherNumber1}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="phone" size="large" />
                  <List.Content>Other Number 2: {otherNumber2}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="phone" size="large" />
                  <List.Content>Other Number 3: {otherNumber3}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="phone" size="large" />
                  <List.Content>Other Number 4: {otherNumber4}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="phone" size="large" />
                  <List.Content>Other Number 5: {otherNumber5}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="phone" size="large" />
                  <List.Content>Other Number 6: {otherNumber6}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="phone" size="large" />
                  <List.Content>Other Number 7: {otherNumber7}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="phone" size="large" />
                  <List.Content>Other Number 8: {otherNumber8}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="phone" size="large" />
                  <List.Content>Other Number 9: {otherNumber9}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="phone" size="large" />
                  <List.Content>Other Number 10: {otherNumber10}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="mail" size="large" />
                  <List.Content>Other Email 1: {otherEmail1}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="mail" size="large" />
                  <List.Content>Other Email 2: {otherEmail2}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="mail" size="large" />
                  <List.Content>Other Email 3: {otherEmail3}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="mail" size="large" />
                  <List.Content>Other Email 4: {otherEmail4}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="mail" size="large" />
                  <List.Content>Other Email 5: {otherEmail5}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="mail" size="large" />
                  <List.Content>Other Email 6: {otherEmail6}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="mail" size="large" />
                  <List.Content>Other Email 7: {otherEmail7}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="mail" size="large" />
                  <List.Content>Other Email 8: {otherEmail8}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="mail" size="large" />
                  <List.Content>Other Email 9: {otherEmail9}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="mail" size="large" />
                  <List.Content>Other Email 10: {otherEmail10}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="ban" size="large" />
                  <List.Content>Do Not Contact 1: {dnc1}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="ban" size="large" />
                  <List.Content>Do Not Contact 2: {dnc2}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="ban" size="large" />
                  <List.Content>Do Not Contact 3: {dnc3}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="ban" size="large" />
                  <List.Content>Do Not Contact 4: {dnc4}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="ban" size="large" />
                  <List.Content>Do Not Contact 5: {dnc5}</List.Content>
                </List.Item>

                <List.Item>
                  <List.Icon name="user outline" size="large" />
                  <List.Content>
                    f_accountNumber: {f_accountNumber}
                  </List.Content>
                </List.Item>
              </List>
            </Segment>
          </Grid.Column>

          <Segment textAlign="center">
            <Button onClick={this.back}>Back</Button>

            <Button onClick={this.saveAndContinue}>Confirm</Button>
          </Segment>
        </Grid>
      </Container>
    );
  }
}

export default Confirmation;
