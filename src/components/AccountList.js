import React from "react";
import { connect } from "react-redux";
import AccountListItem from "./AccountListItem";
import { startDeleteAccount, startAddAccount } from "../actions/accounts";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";

export const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 500
  },
  paper: theme.mixins.gutters({
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: theme.spacing.unit * 3,

    overflowX: "auto"
  })
});

export class AccountList extends React.Component {
  onDelete = name => {
    this.props.startDeleteAccount(name);
  };

  onCopy = name => {
    this.props.accounts.map(account => {
      if (account.name === name) {
        return this.props.startAddAccount({
          ...account,
          name: account.name + "-copy"
        });
      } else {
        return null;
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper} elevation={4}>
        {this.props.accounts.lenght === 0 ||
        this.props.accounts.hasOwnProperty(0) === false ? (
          <p>no accounts</p>
        ) : (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Account</TableCell>
                <TableCell numeric>Balance</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.accounts.map(account => {
                return (
                  <AccountListItem
                    key={account.name}
                    onDelete={this.onDelete}
                    onCopy={this.onCopy}
                    {...account}
                  />
                );
              })}
            </TableBody>
          </Table>
        )}
      </Paper>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    accounts: state.accounts,
    ...props
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startAddAccount: account => dispatch(startAddAccount(account)),
  startDeleteAccount: data => dispatch(startDeleteAccount(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(AccountList)
);
