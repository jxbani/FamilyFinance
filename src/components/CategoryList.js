import React from "react";
import { connect } from "react-redux";
import CategoryListItem from "./CategoryListItem";
import { startDeleteCategory, startAddCategory } from "../actions/categories";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
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

export class CategoryList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      page: 0,
      rowsPerPage: 10
    };
  }

  onDelete = id => {
    this.props.startDeleteCategory(id);
  };

  onCopy = id => {
    console.log(id);
    this.props.categories.map(category => {
      if (category.id === id) {
        return this.props.startAddCategory(category);
      } else {
        return console.log("no category with this ID found");
      }
    });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper} elevation={4}>
        {this.props.categories.lenght === 0 ||
        this.props.categories.hasOwnProperty(0) === false ? (
          <p>no categories</p>
        ) : (
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.categories
                .slice(
                  this.state.page * this.state.rowsPerPage,
                  this.state.page * this.state.rowsPerPage +
                    this.state.rowsPerPage
                )
                .map(category => {
                  return (
                    <CategoryListItem
                      key={category.id}
                      onDelete={this.onDelete}
                      onCopy={this.onCopy}
                      {...category}
                    />
                  );
                })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  count={this.props.categories.length}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  rowsPerPageOptions={[5, 10]}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </Paper>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    categories: state.categories,
    ...props
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  startAddCategory: category => dispatch(startAddCategory(category)),
  startDeleteCategory: data => dispatch(startDeleteCategory(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(CategoryList)
);
